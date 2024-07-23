import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { UserContext } from "../../Contexts/UserContext";
import ViewShot from "react-native-view-shot";
// import RNFS from "react-native-fs";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { database } from "../../firebase/config";

const TicketCode = () => {
  const { user, userId, view } = useContext(UserContext);
  const [qrCode, setQrCode] = useState([]);
  const [qrCodeRef, setQrCodeRef] = useState();
  const navigation = useNavigation();
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    getQRCodesForUser(userId);
    console.log(qrCode);
  }, []);

  const getQRCodesForUser = (userId) => {
    try {
      const qrCodesRef = collection(database, "qrcodes");
      const q = query(qrCodesRef, where("ticketId", "==", view.ticket.id));

      const qrCodeData = JSON.stringify({
        agencyId: view.ticket.agencyID,
        ticketId: view.ticket.id,
        date: view.ticket.date,
        time: view.ticket.time,
      });
      setQrCode(qrCodeData);
      onSnapshot(q, (querySnapshot) => {
        const qrCodeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQrData(qrCodeList.qrCodeData);
      });
    } catch (error) {
      showMessage({
        message: "Failed to fetch QR codes" + error.message,
        type: "danger",
        duration: 6000,
      });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ticket QR Code</Text>
      {qrCode ? (
        <ViewShot
          ref={(ref) => setQrCodeRef(ref)}
          options={{ format: "png", quality: 0.9 }}
        >
          <QRCode value={qrCode} size={200} />
        </ViewShot>
      ) : (
        <Text>Loading QR Code...</Text>
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Download QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("main")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498DB",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TicketCode;
