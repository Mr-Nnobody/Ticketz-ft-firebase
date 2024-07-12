import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; //import the eye icon
import CustomButton from "../../components/CustomButton";
import { app } from "../../firebase/config";

const PassengerLoginScreen = ({ navigation }) => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
  };
  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate("Registration");
  };
  const handleForgottenPassword = () => {
    // Handle Forgotten password logic here
  };
  return (
    <View style={styles.container}>
      {/* header image */}
      <ImageBackground
        source={require("../../assets/ideal_logo.png")}
        style={styles.Image}
      />
      <Text style={styles.bold}>Ticketz</Text>
      <View>
        {/* Getting Phone number from phone number field*/}
        <Text>Phone Number:</Text>
        <TextInput
          placeholder="Enter Phone Number"
          placeholderTextColor="#5272ff"
          value={PhoneNumber}
          maxLength={9}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={styles.inputcontainer}
        />
      </View>
      {/*  Getting text from password field*/}
      <View>
        <Text>Password:</Text>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#5272ff"
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={!showPassword} //toggle secure entry based on showpassword state
          style={styles.inputcontainer}
        />
        {/* eye button which Toggles Password visibility */}
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="gray"
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 10, top: 27 }}
        />
      </View>
      {/* Login button */}
      <View>
        <CustomButton
          title="Login"
          onPress={handleLogin}
          style={styles.loginButtonstyle}
        />
      </View>

      {/*forgotten password button */}
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleForgottenPassword}>
          <View>
            <View>
              <Text style={styles.text}>Forgotten password ?</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* line Divider */}
      <View style={styles.rowflex}>
        <View style={{ borderBottomWidth: 0.5, borderColor: "gray" }}>
          <Text style={{ width: 100 }}></Text>
        </View>
        <View>
          <Text style={{ color: "gray", marginTop: 15, padding: 5 }}>Or</Text>
        </View>
        <View style={{ borderBottomWidth: 0.5, borderColor: "gray" }}>
          <Text style={{ width: 100 }}></Text>
        </View>
      </View>

      {/* Signup button */}
      <View>
        <CustomButton
          style={styles.signupButtonstyle}
          title="Sign Up"
          onPress={handleSignup}
        />
      </View>
    </View>
  );
};

export default PassengerLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputcontainer: {
    borderColor: "gray",
    marginBottom: 20,
    borderWidth: 2,
    padding: 5,
    width: 300,
    borderRadius: 10,
  },
  loginButtonstyle: {
    marginTop: 20,
    backgroundColor: "#36454F",
    width: 200,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  signupButtonstyle: {
    backgroundColor: "green",
    marginTop: 30,
    width: 200,
    color: "white",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  Image: {
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    color: "red",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  rowflex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "normal",
    fontSize: 50,
    fontStyle: "italic",
    marginBottom: 70,
    color: "#36454F",
    letterSpacing: 10,
  },
});
