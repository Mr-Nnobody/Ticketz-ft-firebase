import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Platform } from "react-native";
import { RNCamera } from "react-native-camera";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const result = await request(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA
      );
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setHasPermission(false);
    }
  };

  const onBarCodeRead = (scanResult) => {
    if (scanResult.data != null) {
      try {
        const ticketData = JSON.parse(scanResult.data);
        Alert.alert(
          "Scanned Successfully",
          `Ticket Details:\n
          City: ${ticketData.city}\n
          Destination: ${ticketData.destination}\n
          Date: ${new Date(ticketData.date).toLocaleDateString()}\n
          Time: ${new Date(ticketData.time).toLocaleTimeString()}\n
          Price: $${ticketData.price}\n
          Available: ${ticketData.available}`,
          [{ text: "OK" }]
        );
      } catch (error) {
        Alert.alert("Error", "Invalid QR Code data");
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
      >
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: "#00FF00",
    backgroundColor: "transparent",
  },
});

export default QRCodeScanner;
