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

const AgencyLoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
  };
  const handleSignup = () => {
    // Handle signup logic here
  };
  const handleForgottenPassword = () => {
    // Handle Forgotten password logic here
  };
  return (
    <View style={styles.container}>
      {/* header image */}
      <ImageBackground
        source={require("../../assets/bus.png")}
        style={styles.Image}
      />
      <View>
        {/* Getting email from email field*/}
        <Text>Email:</Text>
        <TextInput
          placeholder="Enter Email Address"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.inputcontainer}
        />
      </View>
      {/*  Getting text from password field*/}
      <View>
        <Text>Password:</Text>
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
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

export default AgencyLoginScreen;

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
    backgroundColor: "#17ff",
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
    marginTop: -150,
    marginBottom: 30,
    width: 360,
    height: 350,
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
});
