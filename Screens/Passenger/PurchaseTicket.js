import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const PurchaseTicket = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Purchase",
      headerTitleStyle: {
        fontSize: 30,
        color: "white",
      },
      headerStyle: {
        alignItems: "center",
        backgroundColor: "#3498DB",
        height: 80,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  const handleMomo = () => {
    // navigation.navigate("Momo");
    navigation.navigate("PaymentScreen");
  };
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 30, marginTop: -200, margin: 20, color: "#3498DB" }}
      >
        Choose Payment Method
      </Text>
      <View style={styles.imagecontainer}>
        <View>
          <TouchableOpacity activeOpacity={0.2} onPress={handleMomo}>
            <Image
              style={styles.image}
              source={require("../../assets/momo.png")}
            />
            <Text style={styles.text}> MTN Mobile Money</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.2}>
            <Image
              style={styles.image}
              source={require("../../assets/om.png")}
            />
            <Text style={styles.text}>Orange Money</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PurchaseTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  imagecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    marginHorizontal: 10,
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 20,
    color: "#3498DB",
  },
});
