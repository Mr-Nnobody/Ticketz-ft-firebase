import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { database } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../Contexts/UserContext";
import { setDoc, doc } from "firebase/firestore";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, userId, setUser, setUserId } = useContext(UserContext);

  //..
  useEffect(() => {
    console.log("Saving user data in context.......");
    console.log("........................");
    console.log("Updated user:", user);
    console.log("Updated userId:", userId);
  }, [user]);

  const handleSignup = async () => {
    // registration logic here

    try {
      // Validation checks
      if (
        email === "" ||
        password === "" ||
        fullName === "" ||
        city === "" ||
        confirmPassword === ""
      ) {
        showMessage({
          message: "Please Enter all Fields",
          type: "danger",
          duration: 4000,
        });
        return;
      }
      if (password !== confirmPassword) {
        showMessage({
          message: "Passwords don't match",
          type: "danger",
          duration: 2000,
        });
        return;
      }

      const data = {
        fullName: fullName,
        city: city,
        email: email,
      };

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Create user document in Firestore
      await setDoc(doc(database, "users", uid), data);

      showMessage({
        message: "Account Created Successfully",
        type: "success",
        duration: 4000,
      });
      setUserId(uid);
      setUser(data);
      navigation.replace("main");
    } catch (error) {
      showMessage({
        message: "Error creating account: " + error.message,
        type: "danger",
        duration: 6000,
      });
    }
  };
  const handleLogIn = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/ideal_logo.png")}
        />
        <View>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="gray"
            value={fullName}
            onChangeText={setFullName}
            style={styles.inputcontainer}
            autoCapitalize="words"
          />
        </View>
        <View>
          <TextInput
            placeholder="city"
            placeholderTextColor="gray"
            value={city}
            onChangeText={setCity}
            style={styles.inputcontainer}
            autoCapitalize="words"
          />
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
            title="Create Account"
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
  );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  nameinput: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    padding: 5,
  },
  image: {
    marginTop: 100,
    marginBottom: 50,
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
    elevation: 2,
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
