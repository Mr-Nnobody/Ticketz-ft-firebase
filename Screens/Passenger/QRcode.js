import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../Contexts/UserContext";
import ViewShot from "react-native-view-shot";
// import RNFS from "react-native-fs";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { database } from "../../firebase/config";

const QRCodeGenerator = () => {
  const { user, userId, view } = useContext(UserContext);
  const [qrData, setQrData] = useState("");
  const [qrCodeRef, setQrCodeRef] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = () => {
    const ticketData = view;

    const qrCodeData = JSON.stringify({
      agencyId: ticketData.agencyID,
      ticketId: view.id,
      date: ticketData.date,
      time: ticketData.time,
    });
    setQrData(qrCodeData);

    // Store QR code data in Firestore
    const qrCodeRef = collection(database, "qrcodes");
    setDoc(doc(qrCodeRef), {
      ticketId: view.id,
      userID: userId,
      qrCodeData: qrCodeData,
      createdAt: serverTimestamp(),
    });
  };

  // const downloadQRCode = async () => {
  //   try {
  //     const uri = await qrCodeRef.capture();
  //     const filePath = `${RNFS.DocumentDirectoryPath}/qrcode.png`;
  //     await RNFS.copyFile(uri, filePath);
  //     console.log("QR Code saved to:", filePath);
  //     // You can add a notification here to inform the user
  //     showMessage({
  //       message: "QR Code saved successfully to " + filePath,
  //       type: "success",
  //       duration: 3000,
  //     });
  //   } catch (error) {
  //     console.error("Failed to save QR Code:", error);
  //     showMessage({
  //       message: "failed to save QR code" + error.message,
  //       type: "danger",
  //       duration: 3000,
  //     });
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ticket QR Code</Text>
      {qrData ? (
        <ViewShot
          ref={(ref) => setQrCodeRef(ref)}
          options={{ format: "png", quality: 0.9 }}
        >
          <QRCode value={qrData} size={200} />
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

export default QRCodeGenerator;
