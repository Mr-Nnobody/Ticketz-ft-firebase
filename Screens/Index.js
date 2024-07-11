import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Type = () => {
  const [isTextTyped, setIsTextTyped] = useState(false);
  const [typedText, setTypedText] = useState("");
  const originalText = "Welcome to Ticketz";
  const speed = 100;

  const handleNext = () => {
    //next logic goes here
  };

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < originalText.length) {
        setTypedText(originalText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed); // Adjust the typing speed (milliseconds per character)
    setTimeout(() => {
      setIsTextTyped(true);
    }, speed * originalText.length);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{typedText}</Text>

      {isTextTyped && (
        <TouchableOpacity activeOpacity={0.4} onPress={handleNext}>
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Type;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "normal",
    textAlign: "center",
    color: "#17ff",

    marginBottom: -50,
  },
  next: {
    color: "white",
    backgroundColor: "#17ff",
    padding: 8,
    borderRadius: 10,
    marginTop: 400,
    marginBottom: -300,
    marginLeft: 250,
  },
});
