import { app, database } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton.js";
import { showMessage } from "react-native-flash-message";

const Add = (props) => {
  const ticketsRef = collection("tickets");
  // const collectionRef = collection(database, "tickets");
  // const [agencyName, setAgencyName] = useState("");
  const [arrcity, setArrcity] = useState("");
  const [deptime, setDeptime] = useState("");
  const [est_arrtime, setEst_arrtime] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(70);
  const [city, setCity] = useState("");

  const handleAddTicket = () => {
    //add data to firestore
    // addDoc(collectionRef, {
    //   authorID: props.extraData.id,
    //   agencyName: props.extraData.agencyName,
    //   city: city,
    //   arrival_city: arrcity,
    //   departure_time: deptime,
    //   est_arrival_time: est_arrtime,
    //   date: date,
    //   price: price,
    //   available: available,
    //   createdAt: Timestamp
    // })
    //   .then(() => {
    //     alert("Ticket Added");
    //     navigation.navigate("AHome");
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
    const data = {
      authorID: props.extraData.id,
      agencyName: props.extraData.agencyName,
      city: city,
      arrival_city: arrcity,
      departure_time: deptime,
      est_arrival_time: est_arrtime,
      date: date,
      price: price,
      available: available,
      createdAt: Timestamp,
    };
    ticketsRef
      .add(data)
      .then((_doc) => {
        showMessage({
          message: "Ticket Added",
          type: "success",
          duration: 2000,
        });
      })
      .catch((error) => {
        showMessage({
          message: "Ticket not added" + error.message,
          type: "danger",
          duration: 4000,
        });
      });
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.nameinput}
        placeholder="agency Name"
        placeholderTextColor="gray"
        value={agencyName}
        onChangeText={setAgencyName}
        autoCapitalize="words"
      /> */}
      <View style={styles.container1}>
        <TextInput
          style={styles.style1}
          placeholder="city"
          placeholderTextColor="gray"
          value={city}
          onChangeText={setCity}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.style2}
          placeholder="arrival city"
          placeholderTextColor="gray"
          value={arrcity}
          onChangeText={setArrcity}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.container1}>
        <TextInput
          style={styles.style1}
          placeholder="departure time"
          placeholderTextColor="gray"
          value={deptime}
          onChangeText={setDeptime}
        />
        <TextInput
          style={styles.style2}
          placeholder="arrival time"
          placeholderTextColor="gray"
          value={est_arrtime}
          onChangeText={setEst_arrtime}
        />
      </View>
      <View>
        <TextInput
          style={styles.style1}
          placeholder="date"
          placeholderTextColor="gray"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.style2}
          placeholder={available}
          placeholderTextColor="gray"
          value={available}
          onChangeText={setAvailable}
        />
      </View>
      <TextInput
        style={styles.nameinput}
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
  container1: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  text: {
    fontSize: 25,
    color: "3498DB",
    marginTop: -50,
    marginBottom: 50,
  },
  nameinput: {
    borderWidth: 2,
    borderColor: "gray",
    width: 300,
    padding: 5,
    borderRadius: 30,
    marginBottom: 10,
  },
  style1: {
    width: 135,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "gray",
    paddingLeft: 10,
    marginRight: 30,
  },
  style2: {
    width: 135,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "gray",
    paddingLeft: 10,
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
});
