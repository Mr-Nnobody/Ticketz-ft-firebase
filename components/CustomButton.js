import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={props.style}
      onPress={props.onPress}
    >
      <View>
        <View>{props.children}</View>
        <View>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 5, // Shadow effect (Android)
    backgroundColor: "blue",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
    color: "white",
    fontSize: 18,
  },
});
