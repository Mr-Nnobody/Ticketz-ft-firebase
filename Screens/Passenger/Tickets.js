import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useContext,
} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../firebase/config";
import QRCode from "react-native-qrcode-svg";
import { ActivityIndicator } from "react-native";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, view, setView, agencies } = useContext(UserContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Tickets",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginLeft: 100,
      },
      headerStyle: {
        backgroundColor: "#3498DB",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (userId) {
      unsubscribe = fetchTickets(userId, (ticketsList) => {
        setTickets(ticketsList);
        setLoading(false);
      });
    }
    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  // function to find agency
  const getAgencyName = (agencyId) => {
    const matchingAgency = agencies.find((a) => a.id === agencyId);
    return matchingAgency ? matchingAgency.agencyName : "Unknown Agency";
  };

  const fetchTickets = (userId, callback) => {
    const ticketsRef = collection(database, "transactions");
    const q = query(
      ticketsRef,
      where("userID", "==", userId),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ticketsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(ticketsList);
    });

    // Return the unsubscribe function to allow cleanup
    return unsubscribe;
  };

  const handleView = (item) => {
    setView(item);
    console.log(tickets);
    navigation.navigate("TicketCode");
  };
  // function to serve tickets
  const renderItem = useMemo(() => {
    return ({ item }) => (
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleView(item)}>
        <View style={styles.ticketItem}>
          <Image
            style={styles.image}
            source={require("../../assets/ticket1.png")}
          />
          <View style={{ marginTop: 5 }}>
            <Text style={styles.ticketText}>
              Agency: {"  "}
              {getAgencyName(item.ticket.agencyID)}
            </Text>
            <Text style={styles.ticketText}>
              From: {"  "}
              {item.ticket.city}
            </Text>
            <Text style={styles.ticketText}>
              To: {"  "}
              {item.ticket.destination}
            </Text>
            <Text style={styles.ticketText}>
              Date: {"  "}
              {new Date(item.ticket.date).toDateString()}
            </Text>
            <Text style={styles.ticketText}>
              Time:{"  "} {new Date(item.ticket.time).toLocaleTimeString()}
            </Text>
            <Text style={styles.ticketText}>
              Price: {"  "}
              {item.ticket.price} XAF
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3498DB" />
        <Text>Loading My tickets...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.noTickets}>
            <Text>No tickets found. Purchase Tickets</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  listContainer: {
    padding: 10,
  },
  ticketItem: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    padding: 15,
    marginVertical: 8,
    // marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: 340,
    height: 150,
    justifyContent: "space-between",
    marginTop: 10,
  },
  ticketText: {
    marginBottom: 5,
    marginTop: -5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 130,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white",
    marginLeft: -10,
    marginTop: -5,
  },
  noTickets: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100%",
  },
});

export default MyTickets;
