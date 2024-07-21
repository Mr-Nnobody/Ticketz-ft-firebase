import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const AViewTicket = () => {
  const navigation = useNavigation();

  const handleUpdate = () => {
    //next logic goes here
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Ticket Details",
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        alignItems: "center",
        backgroundColor: "#3498DB",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  return (
    <View>
      {/* <Image style={styles.image} source={{ url: "../assets/ticket1.png" }} />
      <Text style={styles.textstyle}>Time: {data.time}</Text>
      <Text style={styles.textstyle}>From: {data.city}</Text>
      <Text style={styles.textstyle}>Destination: {data.destination}</Text>
      <Text style={styles.textstyle}>Available: {data.avaialable} left</Text>
      <Text style={styles.textstyle}>Price: {data.price} FCFA</Text> */}
      <CustomButton
        title="Update"
        onPress={handleUpdate}
        style={styles.button}
      />
    </View>
  );
};
export default AViewTicket;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 40,
  },
  textstyle: {
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#3498DB",
    width: 150,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
});
