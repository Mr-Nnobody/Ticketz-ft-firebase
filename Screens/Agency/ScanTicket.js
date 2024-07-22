import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ScanTicket = () => {
  return (
    <View style={styles.container}>
      <Text>ScanTicket</Text>
    </View>
  );
};

export default ScanTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
