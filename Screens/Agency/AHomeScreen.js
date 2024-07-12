import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { app, database } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = (props) => {
  const collectionRef = collection(database, "tickets");

  //sample getting data from firebase
  const getData = () => {
    getDocs(collectionRef).then((response) => {
      console.log(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const handleAddTicket = (navigation) => {
    navigation.navigate("AddTicket");
  };

  const handleViewTicket = (navigation) => {
    navigation.navigate("AView");
  };

  const handleUpdateData = ({ navigation }) => {
    navigation.navigate("AUpdate");
  };

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
