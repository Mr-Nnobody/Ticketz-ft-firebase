import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import ASearchResults from "./ASearchResults";

const ASearchScreen = () => {
  const [input, setInput] = useState("");
  const data = [];

  return (
    <SafeAreaView>
      <View style={styles.searchbox}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter your Destination"
        />
        <Feather name="search" size={24} color="black" />
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
    margin: 10,
    borderWidth: 4,
    borderColor: "#3498DB",
    borderRadius: 10,
  },
});
