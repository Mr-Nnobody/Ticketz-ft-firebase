import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { UserContext } from "../../Contexts/UserContext.js";

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { view } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const ticketData = JSON.parse(data);
      const { ticketId, agencyId, date, time } = ticketData;
      if (ticketId === view.id && agencyId === view.agencyID) {
        Alert.alert("Scanned Successfully", "Ticket is valid.", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      } else {
        Alert.alert(
          "Invalid Ticket",
          "The scanned ticket does not match the expected data.",
          [{ text: "OK", onPress: () => setScanned(false) }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Invalid QR Code data", [
        { text: "OK", onPress: () => setScanned(false) },
      ]);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanAgainContainer}>
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanAgainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanAgainButton: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 15,
    borderRadius: 10,
  },
  scanAgainText: {
    color: "white",
    fontSize: 16,
  },
});

export default QRCodeScanner;
