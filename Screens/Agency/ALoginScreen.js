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
import { database } from "../../firebase/config.js";
import { getDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../Contexts/UserContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ActivityIndicator } from "react-native";

const ALoginScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser, userId, setUserId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  //..
  useEffect(() => {
    console.log("Saving user data in context.......");
    console.log("........................");
    console.log("Updated user:", user);
    console.log("Updated userId:", userId);
  }, [user]);

  const handleLogin = async () => {
    if (Email === "" || password === "") {
      showMessage({
        message: "Fields cannnot be empty",
        type: "danger",
        duration: 4000,
      });
      return;
    }
    setLoading(true);
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
          setUserId(userCredentials.user.uid);
          setUser(documents.data());
          // {
          //   user.agencyName
          //     ? navigation.replace("Amain")
          //     : navigation.navigate("main");
          // }
          navigation.navigate("Amain");
        });
      })
      .catch((e) => {
        showMessage({
          message: "Invalid email or password " + e.message,
          type: "danger",
          duration: 4000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate("ARegistration");
  };
  const handleForgottenPassword = () => {
    if (Email === "") {
      showMessage({
        message: "Please enter your email address",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    sendPasswordResetEmail(auth, Email)
      .then(() => {
        showMessage({
          message: "Password reset email sent. Check your inbox.",
          type: "success",
          duration: 4000,
        });
      })
      .catch((error) => {
        showMessage({
          message: "Error: " + error.message,
          type: "danger",
          duration: 4000,
        });
      });
  };
  return (
    <View style={styles.container}>
      {/* header image */}
      <ImageBackground
        source={require("../../assets/ideal_logo.jpeg")}
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
          title={
            loading ? (
              <ActivityIndicator color="white" style={{ marginLeft: 10 }} />
            ) : (
              "Login"
            )
          }
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  loginButtonstyle: {
    marginTop: 40,
    backgroundColor: "#3498DB", //"#788eec",
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  Image: {
    marginTop: 130,
    marginBottom: 100,
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#3498DB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
