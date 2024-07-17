import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

const Index = ({ navigation }) => {
  const handleAgency = () => {
    //next logic goes here
    navigation.navigate("ALoginScreen");
  };

  const handlePassenger = () => {
    //next logic goes here
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up or Login as:</Text>

      <CustomButton
        style={styles.button}
        title="AGENCY"
        onPress={handleAgency}
      />
      <CustomButton
        style={styles.button}
        title="PASSENGER"
        onPress={handlePassenger}
      />
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "normal",
    textAlign: "center",
    color: "#3498DB",
    marginTop: -100,
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#3498DB",
    padding: 10,
    width: 300,
    borderRadius: 100,
    margin: 30,
  },
});
