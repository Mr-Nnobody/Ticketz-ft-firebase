import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { setDoc, doc } from "firebase/firestore";
import { database } from "../../firebase/config";
import { UserContext } from "../../Contexts/UserContext";
import { ActivityIndicator } from "react-native";

const ARegistrationScreen = ({ navigation }) => {
  const auth = getAuth();
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, userId, setUser, setUserId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  //..
  useEffect(() => {
    console.log("Saving user data in context.......");
    console.log("........................");
    console.log("Updated user:", user);
    console.log("Updated userId:", userId);
  }, [user]);

  const handleSignup = () => {
    // registration logic here
    if (email === "" || password === "" || agencyName === "") {
      showMessage({
        message: "Please Enter all Fields",
        type: "danger",
        duration: 4000,
      });
      return;
    }
    if (password !== confirmPassword) {
      showMessage({
        message: "Passwords don't match ",
        type: "danger",
        duration: 2000,
      });
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;
        //const agencyRef = collection(database, "agencies", uid);

        // Send verification email
        sendEmailVerification(userCredentials.user)
          .then(() => {
            showMessage({
              message: "Verification email sent. Please check your inbox.",
              type: "success",
              duration: 4000,
            });
          })
          .catch((error) => {
            showMessage({
              message: "Error sending verification email: " + error.message,
              type: "danger",
              duration: 4000,
            });
          });

        //
        const data = {
          email: user,
          agencyName: agencyName,
        };
        setDoc(doc(database, "agencies", uid), data)
          .then((documents) => {
            showMessage({
              message: "Account Created Successfully",
              type: "success",
              duration: 4000,
            });
            setUserId(uid);
            setUser(documents.data());
            navigation.replace("Amain");
          })
          .catch((error) => {
            showMessage({
              message: "Error creating db account: " + error.message,
              type: "danger",
              duration: 6000,
            });
          });
      })
      .catch((error) => {
        showMessage({
          message: "Error creating account: " + error.message,
          type: "danger",
          duration: 6000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogIn = () => {
    navigation.navigate("ALoginScreen");
  };

  return (
    <SafeAreaView
      style={{ alignItems: "center", backgroundColor: "#EEEEEE", padding: 10 }}
    >
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/ideal_logo.png")}
          />

          <View>
            <View>
              {/* <Text>Agency Name:</Text> */}
              <TextInput
                style={styles.inputcontainer}
                placeholder="Agency Name"
                placeholderTextColor="gray"
                value={agencyName}
                onChangeText={setAgencyName}
                autoCapitalize="words"
              />
            </View>
          </View>
          <View>
            {/* <Text>Email:</Text> */}
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.inputcontainer}
            />
          </View>
          <View>
            {/* <Text>Password:</Text> */}
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
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
              style={{ position: "absolute", right: 10, top: 15 }}
            />
          </View>
          <View>
            {/* <Text>Confirm Password:</Text> */}
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true} //toggle secure entry based on showpassword state
              style={styles.inputcontainer}
            />
          </View>
          {/* Signup button */}
          <View>
            <CustomButton
              style={styles.signupButtonstyle}
              title={
                loading ? (
                  <ActivityIndicator color="white" style={{ marginLeft: 10 }} />
                ) : (
                  "Create Account"
                )
              }
              onPress={handleSignup}
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
              <TouchableOpacity activeOpacity={0.4} onPress={handleLogIn}>
                <View>
                  <Text style={styles.loginbutton}>Log In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default ARegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginTop: 110,
    marginBottom: 70,
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
  inputcontainer: {
    borderColor: "white",
    marginBottom: 20,
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
  signupButtonstyle: {
    backgroundColor: "#3498DB",
    marginTop: 30,
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  loginbutton: {
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
