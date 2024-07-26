import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import CustomButton from "../../components/CustomButton";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../../firebase/config.js";

const PaymentSceen = () => {
  const navigation = useNavigation();
  const { view, userId } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");

  //
  const handlePay = () => {
    if (phoneNumber === "") {
      showMessage({
        message: "Please enter phone number",
        type: "warning",
      });
      return;
    }
    // Store transactions data in Firestore
    const transactionsRef = collection(database, "transactions");
    setDoc(doc(transactionsRef), {
      userID: userId,
      ticket: view,

      createdAt: serverTimestamp(),
    });
    showMessage({
      message: "Transaction Successful, Generating QR Code........",
      type: "success",
      duration: 4000,
    });

    navigation.navigate("QRcode");

    //
  };
  return (
    <View style={styles.container}>
      {/* header image */}
      <Image source={require("../../assets/momo.png")} style={styles.Image} />
      <View style={styles.text}>
        <Text>Phone-Numebr: </Text>
        <TextInput
          placeholder="Phone-Number(682101458)"
          value={phoneNumber}
          maxLength={9}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={{ textAlign: "right" }}
        />
      </View>

      <View>
        <View style={styles.text}>
          <Text>Price: </Text>
          <Text>{view.price}</Text>
        </View>
      </View>
      <CustomButton title="Pay Now" onPress={handlePay} style={styles.button} />
    </View>
  );
};

export default PaymentSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#3498DB",
    width: "90%",
    color: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  text: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  Image: {
    marginTop: -130,
    marginBottom: 90,
    width: 270,
    height: 200,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
