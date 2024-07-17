import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/Passenger/HomeScreen.js";
import RegistrationScreen from "./Screens/Passenger/RegistrationScreen.js";
import LoginScreen from "./Screens/Passenger/LoginScreen.js";
import Add from "./Screens/Agency/AddTicket.js";
import AHomeScreen from "./Screens/Agency/AHomeScreen.js";
import ALoginScreen from "./Screens/Agency/ALoginScreen.js";
import ARegistrationScreen from "./Screens/Agency/ARegistraionScreen.js";
import Update from "./Screens/Agency/AUpdateScreen.js";
import AViewTicket from "./Screens/Agency/AViewTicket.js";
import FlashMessage from "react-native-flash-message";
import { decode, encode } from "base-64";

// setting area on the top screen where icons above can be visible
import { StatusBar } from "expo-status-bar";
import { getAuth } from "@firebase/auth"; // Import Firebase authentication;
import Index from "./Screens/Index.js";
import { View } from "react-native";

// to ensure compatibility
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// Creating Navigation stack
const Stack = createStackNavigator();

export default function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user in state
    });

    return () => {
      unsubscribe(); // Clean up the listener
    };
  }, []);

  // const [loading, setLoading] = useState(true);

  // //enabling persistent log in
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Image
  //         source={require("./assets/ideal_logo.png")}
  //         style={{ width: 70, height: 70 }}
  //       />
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   // Listen for authentication state changes
  //   const usersRef = collection("users");
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data();
  //           setLoading(false);
  //           setUser(userData);
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          {user ? (
            // loggedUser.email ? (
            //   <Stack.Screen name="AHome">
            //     {(props) => <AHomeScreen {...props} extraData={loggedUser} />}
            //   </Stack.Screen>
            // ) : loggedUser.phoneNumber ? (
            <Stack.Screen name="Home">
              {(props) => <AHomeScreen {...props} extraData={user} />}
            </Stack.Screen>
          ) : (
            // ) : null
            <>
              <Stack.Screen
                name="Index"
                component={Index}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{
                  headerTitle: "Sign Up",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerTitle: "Home",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerTitle: "Login",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="ALoginScreen"
                component={ALoginScreen}
                options={{
                  headerTitle: "Login",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="AHome"
                component={AHomeScreen}
                options={{
                  headerTitle: "AHome",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="ARegistration"
                component={ARegistrationScreen}
                options={{
                  headerTitle: "Sign Up",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="AddTicket"
                component={Add}
                options={{
                  headerTitle: "Add Ticket",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="AView"
                component={AViewTicket}
                options={{
                  headerTitle: "Sign Up",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
              <Stack.Screen
                name="Update"
                component={Update}
                options={{
                  headerTitle: "Sign Up",
                  headerTitleStyle: { marginLeft: 85 },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="center" />
    </View>
  );
}
