import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { useRef } from "react";
// import {
//   RecaptchaVerifier,
//   FirebaseRecaptchaVerifierModal,
// } from "@react-native-recaptcha-v3";

const PassengerLoginScreen = ({ navigation }) => {
  const auth = getAuth();
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [conResult, setConResult] = useState("");
  const recaptchaContainerId = "Get Code";

  const GetCode = () => {
    const appVerifier = new RecaptchaVerifier(recaptchaContainerId, {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, PhoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign in with confirmationResult.confirm(confirmationResult.code).
            showMessage({
              message: "Code Sent",
              type: "success",
              duration: 2000,
            });
            setConResult(confirmationResult);

            window.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            showMessage({
              message: error.message + " Code Not Sent",
              type: "warning",
              duration: 2000,
            });
          });
      },
    });
  };
  // const GetCode = () => {
  //   const appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(auth, PhoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign in with confirmationResult.confirm(confirmationResult.code).
  //       showMessage({
  //         message: "Code Sent",
  //         type: "success",
  //         duration: 2000,
  //       });
  //       setConResult(confirmationResult);

  //       window.confirmationResult = confirmationResult;
  //     })
  //     .catch((error) => {
  //       showMessage({
  //         message: error.message + " Code Not Sent",
  //         type: "warning",
  //         duration: 2000,
  //       });
  //     });
  // };

  const handleLogin = () => {
    // registration logic here
    conResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        navigation.navigate("Home", { user });
        showMessage({
          message: "Welcome " + user,
          type: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        showMessage({
          message: error.message + " bad Verification code",
          type: "warning",
          duration: 2000,
        });
      });
  };
  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate("Registration");
  };

  return (
    <View style={styles.container}>
      {/* header image */}
      <Image
        source={require("../../assets/ideal_logo.png")}
        style={styles.Image}
      />

      <View style={styles.number}>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
          value={PhoneNumber}
          maxLength={14}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={styles.inputcontainer}
        />
        <CustomButton
          style={styles.getcode}
          title="Get Code"
          onPress={GetCode}
        />
      </View>
      {/*  Getting code field*/}
      <View>
        {/* <Text>Password:</Text> */}
        <TextInput
          placeholder="Enter Code"
          placeholderTextColor="gray"
          value={code}
          onChangeText={setCode}
          underlineColorAndroid="transparent"
          style={styles.inputcontainer}
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

      <View style={styles.footer}>
        <View>
          <Text style={{ padding: 5, fontSize: 18, marginTop: 20 }}>
            {" "}
            Don't have an account?
          </Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.4} onPress={handleSignup}>
            <View>
              <Text style={styles.signupbutton}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PassengerLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputcontainer: {
    borderColor: "gray",
    marginBottom: 30,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
  loginButtonstyle: {
    marginTop: 20,
    backgroundColor: "#3498DB",
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
  },

  Image: {
    marginTop: 70,
    marginBottom: 80,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  text: {
    color: "#17ff",
    fontWeight: "bold",
    marginTop: -10,
    marginLeft: 150,
    marginBottom: 15,
    fontSize: 16,
  },
  rowflex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },

  signupbutton: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    color: "#17ff",
    borderBottomWidth: 1,
    borderBottomColor: "#17ff",
  },
  getcode: {
    backgroundColor: "#3498DB",
    width: 50,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  number: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
