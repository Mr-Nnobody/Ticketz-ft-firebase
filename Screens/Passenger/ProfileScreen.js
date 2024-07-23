import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../Contexts/UserContext";
import CustomButton from "../../components/CustomButton";
import { getAuth, signOut } from "firebase/auth";
import { showMessage } from "react-native-flash-message";

const ProfileScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const { user, setUser, setUserId } = useContext(UserContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Profile",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginLeft: 100,
      },
      headerStyle: {
        backgroundColor: "#3498DB",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);
  const handleLogOut = async () => {
    //...logic
    try {
      await signOut(auth);

      // Sign-out successful.
      showMessage({
        message: "Log Out Successful",
        type: "success",
        duration: 1000,
      });
      navigation.replace("LoginScreen");
      setUser([]);
      setUserId(null);
    } catch (error) {
      // An error happened.
      showMessage({
        message: "Failed to Log out " + error.message,
        type: "danger",
        duration: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <View style={styles.text}>
          <Text style={{ fontSize: 20 }}>Name: </Text>
          <Text style={{ fontSize: 20 }}>{user.fullName}</Text>
        </View>
        <View style={styles.text}>
          <Text style={{ fontSize: 20 }}>City: </Text>
          <Text style={{ fontSize: 20 }}>{user.city}</Text>
        </View>
        <View style={styles.text}>
          <Text style={{ fontSize: 20 }}>Email: </Text>
          <Text style={{ fontSize: 20 }}>{user.email}</Text>
        </View>
      </View>
      <CustomButton
        title="Log out"
        style={styles.logout}
        onPress={handleLogOut}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  text: {
    justifyContent: "space-between",
    flexDirection: "row",
    margineTop: 30,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  logout: {
    marginTop: 100,
    backgroundColor: "#3498DB",
    width: 300,
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
