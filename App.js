import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/Passenger/HomeScreen.js";
import RegistrationScreen from "./Screens/Passenger/RegistrationScreen.js";
import LoginScreen from "./Screens/Passenger/LoginScreen.js";
import Add from "./Screens/Agency/AddTicket.js";
import AHomeScreen from "./Screens/Agency/AHomeScreen.js";
import ALoginScreen from "./Screens/Agency/ALoginScreen.js";
import AProfileScreen from "./Screens/Agency/AProfileScreen.js";
import ARegistrationScreen from "./Screens/Agency/ARegistraionScreen.js";
import Update from "./Screens/Agency/AUpdateScreen.js";
import AViewTicket from "./Screens/Agency/AViewTicket.js";
import FlashMessage from "react-native-flash-message";
import { decode, encode } from "base-64";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddTicket from "./Screens/Agency/Add.js";

// setting area on the top screen where icons above can be visible
import { StatusBar } from "expo-status-bar";
import { getAuth } from "@firebase/auth"; // Import Firebase authentication;
import Index from "./Screens/Index.js";
import { View } from "react-native";
import ASearchScreen from "./Screens/Agency/ASearchScreen.js";
import ProfileScreen from "./Screens/Passenger/ProfileScreen.js";
import { UserProvider } from "./Contexts/UserContext.js";
import Tickets from "./Screens/Passenger/Tickets.js";
import ScanTicket from "./Screens/Agency/ScanTicket.js";
import SearchScreen from "./Screens/Passenger/SearchScreen.js";
import ViewTicket from "./Screens/Passenger/ViewTricket.js";
import PurchaseTicket from "./Screens/Passenger/PurchaseTicket.js";
import MoMoPaymentScreen from "./Screens/Passenger/Payment.js";
import PaymentSceen from "./Screens/Passenger/PaymentSceen.js";
import QRCodeGenerator from "./Screens/Passenger/QRcode.js";
import TicketCode from "./Screens/Passenger/TicketCode.js";
import QRCodeScanner from "./Screens/Agency/ScanCode.js";

// to ensure compatibility
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// Creating Navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  const auth = getAuth();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Listen for authentication state changes
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user); // Set the user in state
  //   });

  //   return () => {
  //     unsubscribe(); // Clean up the listener
  //   };
  // }, []);

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
  const Tab = createBottomTabNavigator();

  const BottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#3498DB" />
              ) : (
                <AntDesign name="home" size={24} color="#3498DB" />
              ),
          }}
        />

        <Tab.Screen
          name="MyTicket"
          component={Tickets}
          options={{
            tabBarLabel: "my tickets",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ticket" size={24} color="#3498DB" />
              ) : (
                <Ionicons name="ticket-outline" size={24} color="#3498DB" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person-sharp" size={24} color="#3498DB" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#3498DB" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const ABottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="AHome"
          component={AHomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#3498DB" />
              ) : (
                <AntDesign name="home" size={24} color="#3498DB" />
              ),
          }}
        />

        <Tab.Screen
          name="AddTicket"
          component={AddTicket}
          options={{
            tabBarLabel: "add",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="add-circle-sharp" size={24} color="#3498DB" />
              ) : (
                <Ionicons name="add-circle-outline" size={24} color="#3498DB" />
              ),
          }}
        />
        <Tab.Screen
          name="ScanCode"
          component={QRCodeScanner}
          options={{
            tabBarLabel: "Scan",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={24}
                  color="#3498DB"
                />
              ) : (
                <MaterialIcons
                  name="qr-code-scanner"
                  size={24}
                  color="#3498DB"
                />
              ),
          }}
        />
        <Tab.Screen
          name="AProfile"
          component={AProfileScreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person-sharp" size={24} color="#3498DB" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#3498DB" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator>
            <Stack.Screen
              name="Index"
              component={Index}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
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
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ALoginScreen"
              component={ALoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Amain"
              component={ABottomTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="main"
              component={BottomTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ASearch"
              component={ASearchScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ScanCode"
              component={QRCodeScanner}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Momo"
              component={MoMoPaymentScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentSceen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="QRcode"
              component={QRCodeGenerator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TicketCode"
              component={TicketCode}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ARegistration"
              component={ARegistrationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTicket"
              component={Add}
              options={{
                headerTitle: "Add Ticket",
                headerTitleStyle: { marginLeft: 85 },
              }}
            />
            <Stack.Screen name="Purchase" component={PurchaseTicket} />
            <Stack.Screen name="AView" component={AViewTicket} />
            <Stack.Screen name="View" component={ViewTicket} />
            <Stack.Screen
              name="Update"
              component={Update}
              options={{
                headerTitle: "Sign Up",
                headerTitleStyle: { marginLeft: 85 },
              }}
            />
            {/* </> */}
            {/* )} */}
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="center" />
      </View>
    </UserProvider>
  );
}
