import { database } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import CustomButton from "../../components/CustomButton.js";
import { showMessage } from "react-native-flash-message";
import { useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const Add = () => {
  const route = useRoute();
  // const ticketsRef = collection(database, "tickets");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(dayjs());
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(70);
  const [city, setCity] = useState("");
  const [destination, setDestination] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Ticket Info",
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        alignItems: "center",
        backgroundColor: "#3498DB",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  const handleAddTicket = () => {
    const data = {
      agencyID: route.params.id,
      city: city,
      destination: destination,
      time: time,
      date: date,
      available: available,
      price: price,
    };
    setDoc(doc(database, "tickets"), data)
      .then((_doc) => {
        showMessage({
          message: "Ticket Added",
          type: "success",
          duration: 4000,
        });
      })
      .catch((error) => {
        showMessage({
          message: "Could not add Ticket  " + error.message,
          type: "danger",
          duration: 4000,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ url: "../assets/ticket1.png" }} />
      </View>
      <View>
        <TextInput
          style={styles.style2}
          placeholder="city"
          placeholderTextColor="gray"
          value={city}
          onChangeText={setCity}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.style2}
          placeholder=" Enter Destination"
          placeholderTextColor="gray"
          value={destination}
          onChangeText={setDestination}
          autoCapitalize="words"
        />
      </View>
      <View>
        <TextInput
          style={styles.style2}
          placeholder="departure time"
          placeholderTextColor="gray"
          value={time}
          onChangeText={setTime}
        />
      </View>
      <View>
        {/*Date*/}
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 10,
            borderColor: "white",
            borderWidth: 2,
            paddingVertical: 15,
            backgroundColor: "white",
          }}
        >
          <Feather name="calendar" size={24} color="black" />
          <DateTimePicker
            mode="single"
            locale="en"
            date={date}
            onChange={(params) => setDate(params.date)}
            selectedItemColor="#3498DB"
          />
        </Pressable>
        <TextInput
          style={styles.style2}
          placeholder={available}
          placeholderTextColor="gray"
          value={available}
          onChangeText={setAvailable}
        />
      </View>
      <TextInput
        style={styles.style2}
        placeholder="price per ticket"
        placeholderTextColor="gray"
        value={price}
        onChangeText={setPrice}
      />

      <View>
        <CustomButton
          style={styles.add}
          title="Add ticket"
          onPress={handleAddTicket}
        />
      </View>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  style2: {
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    paddingLeft: 10,
    backgroundColor: "white",
  },
  add: {
    backgroundColor: "#3498DB",
    marginTop: 70,
    marginLeft: 70,
    width: 100,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 40,
  },
});
