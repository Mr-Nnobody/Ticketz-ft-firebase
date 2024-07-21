import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useRoute } from "@react-navigation/native";

const AViewTicket = () => {
  const route = useRoute();

  const handlePurchase = () => {
    //next logic goes here
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Ticket Info",
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
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}>
        {" "}
        agencyName
      </Text>
      <Image style={styles.image} source={{ url: "../assets/ticket1.png" }} />
      <Text style={styles.textstyle}>Time: {route.params.time}</Text>
      <Text style={styles.textstyle}>From: {route.params.city}</Text>
      <Text style={styles.textstyle}>
        Destination: {route.params.destination}
      </Text>
      <Text style={styles.textstyle}>
        Available: {route.params.avaialable} left
      </Text>
      <Text style={styles.textstyle}>Price: {route.params.price} FCFA</Text>
      <CustomButton
        title="Purchase"
        onPress={handlePurchase}
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
