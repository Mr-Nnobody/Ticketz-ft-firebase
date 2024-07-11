import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <View style>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  full_container: {
    flex: 1,
    padding: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  header_container: {
    flex: 1,
    backgroundColor: "#5272ff",
  },
});
