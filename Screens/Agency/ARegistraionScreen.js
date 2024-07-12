import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { app } from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const ARegistrationScreen = ({ navigation }) => {
  const auth = getAuth();
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // registration logic here
    createUserWithEmailAndPassword(auth, email, password, agencyName)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate("AHome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //.....
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/ideal_logo.png")}
      />

      <View>
        <View>
          <Text>Agency Name:</Text>
          <TextInput
            style={styles.nameinput}
            placeholder="Agency Name"
            placeholderTextColor="#5272ff"
            value={agencyName}
            onChangeText={setAgencyName}
            autoCapitalize="words"
          />
        </View>
      </View>
      <View>
        <Text>Email:</Text>
        <TextInput
          placeholder="Email address"
          placeholderTextColor="#5272ff"
          value={email}
          maxLength={9}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.inputcontainer}
        />
      </View>
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
      <View>
        <Text>Confirm Password:</Text>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#5272ff"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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

      {/* Signup button */}
      <View>
        <CustomButton
          style={styles.signupButtonstyle}
          title="Create Account"
          onPress={handleSignup}
        />
      </View>
    </View>
  );
};
export default ARegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  nameinput: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    padding: 5,
  },
  image: {
    marginTop: "-300%",
    marginBottom: 10,
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  inputcontainer: {
    borderColor: "gray",
    marginBottom: 20,
    borderWidth: 2,
    padding: 5,
    width: "300%",
    borderRadius: 10,
  },
  signupButtonstyle: {
    backgroundColor: "#5272ff",
    marginTop: 30,
    width: 200,
    color: "white",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
  },
});
