import { app, database } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

const Add = () => {
  const collectionRef = collection(database, "tickets");
  const [agencyName, setAgencyName] = useState("");
  const [arrcity, setArrcity] = useState("");
  const [deptime, setDeptime] = useState("");
  const [est_arrtime, setEst_arrtime] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(70);

  const handleAdd = () => {
    //add data to firestore
    addDoc(collectionRef, {
      agencyName: agencyName,
      city: city,
      arrival_city: arrcity,
      departure_time: deptime,
      est_arrival_time: est_arrtime,
      date: date,
      price: price,
      available: available,
    })
      .then(() => {
        alert("Ticket Added");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nameinput}
        placeholder="First Name"
        placeholderTextColor="#5272ff"
        value={agencyName}
        onChangeText={setAgencyName}
        autoCapitalize="words"
      />
    </View>
  );
};
