import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "./Screens/FirstScreen.js";
import HomeScreen from "./Screens/Passenger/HomeScreen.js";
import RegistrationScreen from "./Screens/Passenger/RegistrationScreen.js";
import { decode, encode } from "base-64";

// setting area on the top screen where icons above can be visible
import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// to ensure compatibility
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

//creating Navigation stack
const Stack = createStackNavigator();

export default function App() {
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="FirstScreen"
              component={FirstScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
              options={{ headerTitle: "Sign Up" }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerTitle: "Home" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
