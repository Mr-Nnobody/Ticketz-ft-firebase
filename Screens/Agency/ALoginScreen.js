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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { database } from "../../firebase/config";

const ALoginScreen = ({ navigation }) => {
  const auth = getAuth();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    // signInWithEmailAndPassword(auth, Email, password)
    //   .then((userCredentials) => {
    //     const user = userCredentials.user;
    //     navigation.navigate("AHome", { user });
    //     showMessage({
    //       message: "Welcome " + user.email,
    //       type: "success",
    //       duration: 2000,
    //     });
    //   })
    //   .catch((error) => {
    //     showMessage({
    //       message: error.message,
    //       type: "warning",
    //       duration: 2000,
    //     });
    //     //.....
    //   });

    //ensuring that when signing in, user data is read from db.
    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        const agencyRef = collection(database, "agencies");
        agencyRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              showMessage({
                message: "User does not exist",
                type: "danger",
                duration: 4000,
              });
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("AHome", { user });
          })
          .catch((error) => {
            showMessage({
              message: error.message,
              type: "danger",
              duration: 4000,
            });
          });
      })
      .catch((error) => {
        showMessage({
          message: "Invalid email or password ",
          type: "danger",
          duration: 4000,
        });
        //.....
      });
  };
  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate("ARegistration");
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
      <View>
        {/* Getting email from email field*/}
        {/* <Text>Email:</Text> */}
        <TextInput
          placeholder="E-mail"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.inputcontainer}
        />
      </View>
      {/*  Getting text from password field*/}
      <View>
        {/* <Text>Password:</Text> */}
        <TextInput
          placeholder="Password"
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
          style={{ position: "absolute", right: 10, top: 15 }}
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
            Already have an account?
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

export default ALoginScreen;

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
    backgroundColor: "#3498DB", //"#788eec",
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
  },
});
