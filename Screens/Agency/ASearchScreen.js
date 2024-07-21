import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import ASearchResults from "./ASearchResults";
import { collection, getDocs } from "firebase/firestore";
import { database as db } from "../../firebase/config"; // Ensure you import your Firestore database configuration

const ASearchScreen = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const ticketsData = [];
        querySnapshot.forEach((doc) => {
          ticketsData.push({ id: doc.id, ...doc.data() });
        });
        setData(ticketsData);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        Alert.alert(
          "Error fetching documents: ",
          "Try Again?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ],
          { cancelable: false }
        );
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.searchbox}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter your Destination"
        />
        <Feather name="search" size={24} color="#3498DB" />
      </View>
      <View>
        <Pressable></Pressable>
        <Pressable></Pressable>
      </View>

      <ASearchResults data={data} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default ASearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 60,
    borderWidth: 2,
    borderColor: "#3498DB",
    borderRadius: 10,
  },
  input: {
    paddingLeft: 30,
    flex: 1,
  },
});
