import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const AViewTicket = () => {
  const navigation = useNavigation();
  const { view } = useContext(UserContext);

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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/ticket1.png")}
      />
      <View style={styles.text}>
        <Text>Time: </Text>
        <Text>{new Date(view.time).toLocaleTimeString()}</Text>
      </View>
      <View style={styles.text}>
        <Text>Date:</Text>
        <Text>{new Date(view.date).toDateString()}</Text>
      </View>
      <View style={styles.text}>
        <Text>From: </Text>
        <Text>{view.city}</Text>
      </View>
      <View style={styles.text}>
        <Text>Destination: </Text>
        <Text> {view.destination}</Text>
      </View>
      <View style={styles.text}>
        <Text>Available: </Text>
        <Text>
          {" "}
          {view.available} {"  "}left
        </Text>
      </View>
      <View style={styles.text}>
        <Text>Price: </Text>
        <Text> {view.price} FCFA</Text>
      </View>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
  image: {
    marginTop: -20,
    marginBottom: 40,
    width: 270,
    height: 200,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textstyle: {
    width: 300,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    marginTop: 50,
    backgroundColor: "#3498DB",
    width: 150,
    color: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  text: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
