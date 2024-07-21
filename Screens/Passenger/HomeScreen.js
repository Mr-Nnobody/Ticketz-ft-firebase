import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { database } from "../../firebase/config";
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { showMessage } from "react-native-flash-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(dayjs());
  const [agency, setAgency] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Welcome", //route.params?.user.agencyName,
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
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  // const collectionRef = collection("tickets");
  const [tickets, setTickets] = useState([]);

  // //sample getting data from firebase
  // const getData = () => {
  //   getDocs(collectionRef).then((response) => {
  //     setData(response.docs);
  //     <Text>
  //       {response.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       })}
  //     </Text>;
  //   });
  // };
  // setData(
  //   getDocs(collectionRef).then((response) => {
  //     return response.docs.map(item);
  //   })
  // );
  //const route = useRoute();
  const ticketsRef = collection(database, "tickets");
  //const { user } = route.params;
  const userID = 4; //route.params?.data.id;
  const data = route.params?.agencyName;
  console.log(data);
  useEffect(() => {
    const queryRef = query(
      ticketsRef,
      where("authorID", "==", userID),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      queryRef,
      (querySnapshot) => {
        const newTickets = [];
        querySnapshot.forEach((doc) => {
          const ticket = doc.data();
          ticket.id = doc.id;
          newTickets.push(ticket);
        });
        setTickets(newTickets);
      },
      (error) => {
        showMessage({
          message: error.message,
          type: "danger",
          duration: 100000,
        });
      }
    );
    return () => {
      unsubscribe;
    };
  }, []);

  const handleAddTicket = () => {
    navigation.navigate("AddTicket");
  };

  const handleViewTicket = () => {
    navigation.navigate("AView");
  };

  const handleUpdateData = () => {
    navigation.navigate("AUpdate");
  };

  const renderTicket = ({ item, index }) => {
    return (
      <View style={styles.ticket}>
        <Text>
          {index}. (<Text>Departure City: {item.depCity}</Text>
          <Text>Arrival City: {item.arrCity}</Text>
          <Text>Departure Time: {item.deptime}</Text>
          <Text>Arrival Time: {item.est_arrtime}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Price: {item.price}</Text>)
        </Text>
        <CustomButton
          title="Update"
          onPress={() => handleUpdateData(item)}
          style={styles.updateButton}
        />
      </View>
    );
  };

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={data}
    //     renderItem={(item) => {
    //       return (
    //         <View style={StyleSheetList.dataItem}>
    //           <Text> {item.data()}</Text>
    //         </View>
    //       );
    //     }}
    //     alwaysBounceVertical={false}
    //   />
    //   <View>
    //     <CustomButton
    //       title="Add"
    //       onPress={handleAddTicket}
    //       style={styles.addbutton}
    //     />
    //   </View>
    // </View>
    <View style={styles.container}>
      <View>
        <ScrollView>
          <View
            style={{
              margin: 20,
              borderColor: "#3498DB",
              borderWidth: 3,
              borderRadius: 6,
            }}
          >
            {/*Destination*/}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#3498DB",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholderTextColor="black"
                placeholder={
                  route?.params ? route.params.input : "Enter Your Destination"
                }
              />
            </Pressable>

            {/*Date*/}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#3498DB",
                borderWidth: 2,
                paddingVertical: 15,
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

            {/*Agency */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#3498DB",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="bus-outline" size={24} color="black" />
              <TextInput placeholder="Enter Agency Name" />
            </Pressable>

            {/*Search */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#3498DB",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#3498DB",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={tickets}
        renderItem={renderTicket}
        keyExtractor={(item) => item.id}
      />
      <View>
        <CustomButton
          title="Add"
          onPress={handleAddTicket}
          style={styles.addbutton}
        />
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  addbutton: {
    position: "absolute",
    bottom: 80,
    left: 80,
    padding: 10,
    backgroundColor: "#3498DB",
    width: 60,
    borderRadius: 100,
  },
});
