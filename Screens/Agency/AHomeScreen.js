import { View, Text, StyleSheet, FlatList, Keyboard } from "react-native";
import { database } from "../../firebase/config";
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { showMessage } from "react-native-flash-message";
import { useRoute } from "@react-navigation/native";

const HomeScreen = ({ navigation, route }) => {
  // const collectionRef = collection("tickets");
  const [tickets, setTickets] = useState([]);

  // //sample getting data from firebase
  // const getData = () => {
  //   getDocs(collectionRef).then((response) => {
  //     setData(response.docs);
  //     <Text>
  //       {response.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       })}
  //     </Text>;
  //   });
  // };
  // setData(
  //   getDocs(collectionRef).then((response) => {
  //     return response.docs.map(item);
  //   })
  // );
  //const route = useRoute();
  const ticketsRef = collection(database, "tickets");
  //const { user } = route.params;
  const userID = 4; //route.params?.data.id;
  const data = route.params;
  console.log(data, userID);
  useEffect(() => {
    const queryRef = query(
      ticketsRef,
      where("authorID", "==", userID),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      queryRef,
      (querySnapshot) => {
        const newTickets = [];
        querySnapshot.forEach((doc) => {
          const ticket = doc.data();
          ticket.id = doc.id;
          newTickets.push(ticket);
        });
        setTickets(newTickets);
      },
      (error) => {
        showMessage({
          message: error.message,
          type: "danger",
          duration: 100000,
        });
      }
    );
    return () => {
      unsubscribe;
    };
  }, []);

  const handleAddTicket = () => {
    navigation.navigate("AddTicket", { data });
  };

  const handleViewTicket = () => {
    navigation.navigate("AView");
  };

  const handleUpdateData = () => {
    navigation.navigate("AUpdate");
  };

  const renderTicket = ({ item, index }) => {
    return (
      <View style={styles.ticket}>
        <Text>
          {index}. (<Text>Departure City: {item.depCity}</Text>
          <Text>Arrival City: {item.arrCity}</Text>
          <Text>Departure Time: {item.deptime}</Text>
          <Text>Arrival Time: {item.est_arrtime}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Price: {item.price}</Text>)
        </Text>
        <CustomButton
          title="Update"
          onPress={() => handleUpdateData(item)}
          style={styles.updateButton}
        />
      </View>
    );
  };

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={data}
    //     renderItem={(item) => {
    //       return (
    //         <View style={StyleSheetList.dataItem}>
    //           <Text> {item.data()}</Text>
    //         </View>
    //       );
    //     }}
    //     alwaysBounceVertical={false}
    //   />
    //   <View>
    //     <CustomButton
    //       title="Add"
    //       onPress={handleAddTicket}
    //       style={styles.addbutton}
    //     />
    //   </View>
    // </View>
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={renderTicket}
        keyExtractor={(item) => item.id}
      />
      <View>
        <CustomButton
          title="Add"
          onPress={handleAddTicket}
          style={styles.addbutton}
        />
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  addbutton: {
    position: "absolute",
    bottom: 80,
    left: 80,
    padding: 10,
    backgroundColor: "#3498DB",
    width: 60,
    borderRadius: 100,
  },
});
