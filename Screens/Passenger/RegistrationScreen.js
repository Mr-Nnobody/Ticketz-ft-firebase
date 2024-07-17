import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { database } from "../../firebase/config";

const RegistrationScreen = ({ navigation }) => {
  const auth = getAuth();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
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
          fullName,
          city,
        };
        const usersRef = collection(database, "users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            showMessage({
              message: "Account Created Successfully",
              type: "success",
              duration: 2000,
            });
            navigation.navigate("Home", { user: data });
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
          duration: 4000,
        });
      });
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
export default RegistrationScreen;

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

// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Image } from "react-native";
// import CustomButton from "../../components/CustomButton";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { showMessage } from "react-native-flash-message";

// const RegistrationScreen = ({ navigation }) => {
//   const auth = getAuth();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [code, setCode] = useState("");
//   const appVerifier = window.recaptchaVerifier;
//   const [conResult, setConResult] = useState("");

//   window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
//     size: "invisible",
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       onSignInSubmit();
//     },
//   });

//   const GetCode = () => {
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign in with confirmationResult.confirm(confirmationResult.code).
//         showMessage({
//           message: "Code Sent",
//           type: "success",
//           duration: 2000,
//         });
//         setConResult(confirmationResult);

//         window.confirmationResult = confirmationResult;
//       })
//       .catch((error) => {
//         showMessage({
//           message: error.message + " Code Not Sent",
//           type: "warning",
//           duration: 2000,
//         });
//       });
//   };

//   const handleSignup = () => {
//     // registration logic here
//     conResult
//       .confirm(code)
//       .then((result) => {
//         // User signed in successfully.
//         const user = result.user;
//         navigation.navigate("Home", { user });
//         showMessage({
//           message: "Welcome " + user,
//           type: "success",
//           duration: 2000,
//         });
//       })
//       .catch((error) => {
//         // User couldn't sign in (bad verification code?)
//         showMessage({
//           message: error.message + " bad Verification code",
//           type: "warning",
//           duration: 2000,
//         });
//       });
//   };

//   const handleLogIn = () => {
//     navigation.navigate("LoginScreen");
//   };

//   return (
//     <KeyboardAwareScrollView>
//       <View style={styles.container}>
//         <Image
//           style={styles.image}
//           source={require("../../assets/ideal_logo.png")}
//         />

//         <View style={styles.number}>
//           {/* <Text>Phone Number:</Text> */}
//           <TextInput
//             placeholder="Phone Numbe (e.g +237xxxxxxxxx)"
//             placeholderTextColor="gray"
//             value={phoneNumber}
//             maxLvierength={13}
//             onChangeText={setPhoneNumber}
//             keyboardType="phone-pad"
//             style={styles.inputcontainer}
//             underlineColorAndroid="transparent"
//           />
//           <CustomButton
//             style={styles.getcode}
//             title="Get Code"
//             onPress={GetCode}
//           />
//         </View>
//         <View>
//           <TextInput
//             placeholder="Enter Code"
//             placeholderTextColor="gray"
//             value={code}
//             onChangeText={setCode}
//             style={styles.inputcontainer}
//             underlineColorAndroid="transparent"
//           />
//         </View>
//         {/* Signup button */}
//         <View>
//           <CustomButton
//             style={styles.signupButtonstyle}
//             title="Sign Up"
//             onPress={handleSignup}
//           />
//         </View>
//         <View style={styles.footer}>
//           <View>
//             <Text style={{ padding: 5, fontSize: 18, marginTop: 20 }}>
//               {" "}
//               Already have an account?
//             </Text>
//           </View>
//           <View>
//             <TouchableOpacity activeOpacity={0.4} onPress={handleLogIn}>
//               <View>
//                 <Text style={styles.loginbutton}>Log In</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };
// export default RegistrationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     marginTop: 20,
//     marginBottom: 50,
//     width: 90,
//     height: 90,
//     resizeMode: "contains",
//   },
//   inputcontainer: {
//     borderColor: "gray",
//     marginBottom: 20,
//     backgroundColor: "white",
//     borderWidth: 2,
//     padding: 10,
//     paddingLeft: 20,
//     width: 300,
//     borderRadius: 10,
//   },
//   signupButtonstyle: {
//     backgroundColor: "#3498DB",
//     marginTop: 30,
//     width: 300,
//     color: "white",
//     padding: 10,
//     borderRadius: 10,
//   },
//   loginbutton: {
//     fontSize: 18,
//     marginTop: 20,
//     fontWeight: "bold",
//     color: "#17ff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#17ff",
//   },
//   footer: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignContent: "space-between",
//   },
//   getcode: {
//     backgroundColor: "#3498DB",
//     width: 50,
//     color: "white",
//     padding: 10,
//     borderRadius: 10,
//   },
//   number: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });
