import { database } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState, useLayoutEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import CustomButton from "../../components/CustomButton.js";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserContext } from "../../Contexts/UserContext.js";

const AddTicket = () => {
  const navigation = useNavigation();
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(70);
  const [city, setCity] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { auserId } = useContext(UserContext);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Add Ticket",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginLeft: 90,
      },
      headerStyle: {
        backgroundColor: "#3498DB",
        height: 80,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, [navigation]);

  const handleAddTicket = async () => {
    if (city === "" || destination === "" || price === "") {
      showMessage({
        message: "Enter all fields!",
        type: "danger",
        duration: 4000,
      });
      return;
    }

    try {
      // Create a new ticket object
      const newTicket = {
        agencyID: auserId,
        city,
        destination,
        date: date.toISOString(),
        time: time.toISOString(),
        available: parseInt(available),
        price: parseFloat(price),
      };

      // Add the ticket to the Firestore database
      const ticketsRef = collection(database, "tickets");
      await setDoc(doc(ticketsRef), newTicket);

      // Show a success message
      showMessage({
        message: "Ticket added successfully!",
        type: "success",
        duration: 4000,
      });

      // Reset fields to initial values
      setPrice("");
      setAvailable(70);
      setCity("");
      setDestination("");
      setDate(new Date());
      setTime(new Date());

      // Optionally, navigate back to the previous page
      navigation.goBack();
    } catch (error) {
      // Show an error message if something goes wrong
      showMessage({
        message: "Failed to add ticket. Please try again." + error.message,
        type: "danger",
        duration: 4000,
      });
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/ticket1.png")}
          />

          <View style={{ marginTop: 20 }}>
            <View style={styles.text}>
              <Text>Time: </Text>
              <Pressable onPress={() => setShowTimePicker(true)}>
                <TextInput
                  style={{ textAlign: "center" }}
                  placeholder="Select Time"
                  value={time ? time.toLocaleTimeString("en-US") : ""}
                  editable={false}
                />
              </Pressable>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={onChangeTime}
                />
              )}
            </View>
            <View style={styles.text}>
              <Text>Departure: </Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder={"Enter Departure city"}
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
                style={{ textAlign: "center" }}
              />
            </View>
            <View style={styles.text}>
              <Text>Destination: </Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder={"Enter Destination"}
                value={destination}
                onChangeText={setDestination}
                autoCapitalize="words"
                style={{ textAlign: "center" }}
              />
            </View>
            <View style={styles.text}>
              <Text>Available: </Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder={"Enter Amount Available"}
                value={available.toString()}
                onChangeText={setAvailable}
                keyboardType="number-pad"
                style={{ textAlign: "center" }}
              />
            </View>
            <View style={styles.text}>
              <Text>Date: </Text>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={{ textAlign: "center", color: "gray" }}
                  placeholder="Select Date"
                  value={date.toDateString()}
                  editable={false}
                />
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>

            <View style={styles.text}>
              <Text>Price: </Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder={"Enter Price"}
                value={price}
                onChangeText={setPrice}
                keyboardType="number-pad"
                style={{ textAlign: "center" }}
              />
            </View>
            <View>
              <CustomButton
                style={styles.Button}
                title="Add Ticket"
                onPress={handleAddTicket}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  image: {
    marginTop: 20,
    width: 270,
    height: 200,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  text: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  Button: {
    backgroundColor: "#3498DB",
    marginTop: 20,
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
