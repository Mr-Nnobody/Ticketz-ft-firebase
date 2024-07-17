import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { collection } from "firebase/firestore";
import { database } from "../../firebase/config";

const ARegistrationScreen = ({ navigation }) => {
  const auth = getAuth();
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // registration logic here
    if (password !== confirmPassword) {
      showMessage({
        message: "Passwords don't match ",
        type: "danger",
        duration: 2000,
      });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        const data = {
          id: uid,
          email,
          agencyName,
        };
        const agencyRef = collection(database, "agencies");
        agencyRef
          .doc(uid)
          .set(data)
          .then(() => {
            showMessage({
              message: "Account Created Successfully",
              type: "success",
              duration: 4000,
            });
            navigation.navigate("AHome", { data });
          })
          .catch((error) => {
            showMessage({
              message: "Error creating db account: " + error.message,
              type: "danger",
              duration: 4000,
            });
          });
      })
      .catch((error) => {
        showMessage({
          message: "Error creating account: " + error.message,
          type: "danger",
          duration: 6000,
        });
      });
  };

  const handleLogIn = () => {
    navigation.navigate("ALoginScreen");
  };

  return (
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
            secureTextEntry={!showPassword} //toggle secure entry based on showpassword state
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
export default ARegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  nameinput: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    padding: 5,
  },
  image: {
    marginTop: 30,
    marginBottom: 50,
    width: 100,
    height: 100,
    alignSelf: "center",
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
  signupButtonstyle: {
    backgroundColor: "#3498DB",
    marginTop: 30,
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
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
