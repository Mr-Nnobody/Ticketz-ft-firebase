import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

const ViewTicket = () => {
  const navigation = useNavigation();
  const { view, agencies } = useContext(UserContext);

  const handlePurchase = () => {
    //next logic goes here
    navigation.navigate("Purchase");
  };

  // function to find agency
  const getAgencyName = (agencyId) => {
    const matchingAgency = agencies.find((a) => a.id === agencyId);
    return matchingAgency ? matchingAgency.agencyName : "Unknown Agency";
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Ticket Details",
      headerTitleStyle: {
        fontSize: 30,
        color: "white",
      },
      headerStyle: {
        alignItems: "center",
        backgroundColor: "#3498DB",
        height: 80,
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
        <Text>Agency: </Text>
        <Text>{getAgencyName(view.agencyID)}</Text>
      </View>
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
        title="Purchase"
        onPress={handlePurchase}
        style={styles.button}
      />
    </View>
  );
};
export default ViewTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
  image: {
    marginTop: -10,
    marginBottom: 20,
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
  button: {
    marginTop: 30,
    backgroundColor: "#3498DB",
    width: "90%",
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
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
