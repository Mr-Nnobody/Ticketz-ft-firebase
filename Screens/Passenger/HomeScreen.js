import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { database } from "../../firebase/config";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import {
  useEffect,
  useContext,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../../Contexts/UserContext";
import { ActivityIndicator } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const {
    user,
    setUser,
    userId,
    setUserId,
    setTicket,
    view,
    setView,
    agencies,
  } = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: user.fullName,
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#3498DB",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Search")}>
          <Feather
            name="search"
            size={24}
            color="white"
            style={{ marginRight: 30 }}
          />
        </Pressable>
      ),
    });
  }, []);

  const fetchTickets = (callback) => {
    const ticketsRef = collection(database, "tickets");
    const q = query(ticketsRef);
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

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // update agencies and tickets data
  useEffect(() => {
    const unsubscribe = fetchTickets((ticketsList) => {
      setTickets(ticketsList);
      setTicket(ticketsList);
      setLoading(false);
    });

    console.log(tickets);
    console.log(agencies);
    return () => {
      unsubscribe();
      // unsubscribeAgencies();
    };
  }, []);

  // function to find agency
  const getAgencyName = (agencyId) => {
    const matchingAgency = agencies.find((a) => a.id === agencyId);
    return matchingAgency ? matchingAgency.agencyName : "Unknown Agency";
  };

  const handleView = (item) => {
    setView(item);
    navigation.navigate("View");
    console.log(view);
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
          <View style={{ marginTop: -3 }}>
            <Text style={styles.ticketText}>
              Agency: {"  "}
              {getAgencyName(item.agencyID)}
            </Text>
            <Text style={styles.ticketText}>
              From: {"  "}
              {item.city}
            </Text>
            <Text style={styles.ticketText}>
              To: {"  "}
              {item.destination}
            </Text>
            <Text style={styles.ticketText}>
              Date: {"  "}
              {new Date(item.date).toDateString()}
            </Text>
            <Text style={styles.ticketText}>
              Time:{"  "} {new Date(item.time).toLocaleTimeString()}
            </Text>
            <Text style={styles.ticketText}>
              Available: {"  "}
              {item.available} {"  "}Left
            </Text>
            <Text style={styles.ticketText}>
              Price: {"  "}
              {item.price} XAF
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
        <Text>Loading tickets...</Text>
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
            <Text>No tickets found. Try adjusting your search.</Text>
          </View>
        )}
      />
    </View>
    // </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
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
