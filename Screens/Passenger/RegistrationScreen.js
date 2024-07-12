import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { app } from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegistrationScreen = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // registration logic here
    createUserWithEmailAndPassword(auth, Em);
    navigation.navigate("Home");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/ideal_logo.png")}
        />

        <View style>
          <View>
            <Text>Name</Text>
            <TextInput
              style={styles.inputcontainer}
              placeholder="John Doe"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
        </View>
        <View>
          <Text>City:</Text>
          <TextInput
            placeholder="city"
            placeholderTextColor="gray"
            value={city}
            onChangeText={setCity}
            style={styles.inputcontainer}
          />
        </View>
        <View>
          <Text>Phone Number:</Text>
          <TextInput
            placeholder="+237xxxxxxxxx"
            placeholderTextColor="gray"
            value={phoneNumber}
            maxLength={13}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.inputcontainer}
          />
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput
            placeholder="Enter Password"
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
            style={{ position: "absolute", right: 10, top: 27 }}
          />
        </View>
        <View>
          <Text>Confirm Password:</Text>
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
            title="Sign Up"
            onPress={handleSignup}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 20,
    marginBottom: 50,
    width: 90,
    height: 90,
    resizeMode: "contains",
  },
  inputcontainer: {
    borderColor: "gray",
    marginBottom: 10,
    borderWidth: 2,
    padding: 5,
    paddingLeft: 20,
    width: 300,
    borderRadius: 10,
  },
  signupButtonstyle: {
    backgroundColor: "#3498DB",
    marginTop: 70,
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
});
