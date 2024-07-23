import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";

const MoMoPaymentScreen = () => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const { view, userId } = useContext(UserContext);
  const initiatePayment = async () => {
    setLoading(true);
    setPaymentStatus("");

    try {
      // Replace with your actual API endpoint and credentials
      const response = await axios.post(
        "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
        {
          amount: view.price,
          currency: "XAF",
          externalId: view.id,
          payer: {
            partyIdType: "MSISDN",
            partyId: phoneNumber,
          },
          payerMessage: "Payment for services",
          payeeNote: "Thank you for your payment",
        },
        {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            "X-Reference-Id": userId,
            "X-Target-Environment": "sandbox",
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": "f96c8e119e9b4ffe9b5b1aeba609d404",
          },
        }
      );

      if (response.status === 202) {
        setPaymentStatus(
          "Payment initiated. Please check your phone to authorize."
        );
        // You should implement a way to check the payment status here
        // as the API doesn't immediately return the final status
      } else {
        setPaymentStatus("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      setPaymentStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MTN MoMo Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button
        title={loading ? "Processing..." : "Pay Now"}
        onPress={initiatePayment}
        disabled={loading}
      />
      {paymentStatus ? (
        <Text style={styles.status}>{paymentStatus}</Text>
      ) : null}
    </View>
  );
};
export default MoMoPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "white",
    marginBottom: 30,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  status: {
    marginTop: 20,
    textAlign: "center",
  },
});
