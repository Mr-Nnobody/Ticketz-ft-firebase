import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; //import the eye icon
import CustomButton from "../../components/CustomButton";
import { showMessage } from "react-native-flash-message";
import { database } from "../../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../Contexts/UserContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const ALoginScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auser, setAuser, auserId, setAuserId } = useContext(UserContext);

  //..
  useEffect(() => {
    console.log("Saving user data in context.......");
    console.log("........................");
    console.log("Updated auser:", auser);
    console.log("Updated auserId:", auserId);
  }, [auser]);

  const handleLogin = async () => {
    if (Email === "" || password === "") {
      showMessage({
        message: "Fields cannnot be empty",
        type: "danger",
        duration: 4000,
      });
      return;
    }

    //ensuring that when signing in, user data is read from db.
    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        getDoc(doc(database, "agencies", uid)).then((documents) => {
          if (uid !== documents.id) {
            showMessage({
              message: "User does not exist",
              type: "warning",
              duration: 6000,
            });
            return;
          }
          showMessage({
            message: "Log in Successful",
            type: "success",
            duration: 4000,
          });
          setAuserId(userCredentials.user.uid);
          setAuser(documents.data());
          // console.log(uid, documents.data());
          // console.log(auser);
          navigation.replace("Amain");
        });
      })
      .catch((e) => {
        showMessage({
          message: "Invalid email or password " + e.message,
          type: "danger",
          duration: 4000,
        });
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
    backgroundColor: "#EEEEEE",
  },
  inputcontainer: {
    borderColor: "white",
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
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#3498DB",
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
