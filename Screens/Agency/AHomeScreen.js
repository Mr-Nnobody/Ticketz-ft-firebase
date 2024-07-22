import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { database } from "../../firebase/config";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  useEffect,
  useContext,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import CustomButton from "../../components/CustomButton";
import { showMessage } from "react-native-flash-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { UserContext } from "../../Contexts/UserContext";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(dayjs());
  const [agency, setAgency] = useState("");
  const { auser, setAuser, auserId, setAuserId, setTicket, view, setView } =
    useContext(UserContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: auser.agencyName,
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
        <Pressable onPress={() => navigation.navigate("ASearch")}>
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

  // fetch user tickets function based on user id.

  const fetchTickets = (userId, callback) => {
    const ticketsRef = collection(database, "tickets");
    const q = query(ticketsRef, where("agencyID", "==", userId));
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

  useEffect(() => {
    let unsubscribe;
    if (auserId) {
      unsubscribe = fetchTickets(auserId, (ticketsList) => {
        setTickets(ticketsList);
        setTicket(ticketsList);
        setLoading(false);
      });
    }
    console.log(tickets);
    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auserId]); // Dependency on user to refetch if user changes

  const handleView = (item) => {
    setView(item);
    navigation.navigate("AView");
    console.log(view);
  };

  //
  const renderItem = useMemo(() => {
    return ({ item }) => (
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleView(item)}>
        <View style={styles.ticketItem}>
          <Image
            style={styles.image}
            source={require("../../assets/ticket1.png")}
          />
          <View>
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
            <Text style={styles.ticketText}>Price: {item.price} XAF</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading tickets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View> */}
      {/* <View
          style={{
            margin: 20,
            borderColor: "#3498DB",
            borderWidth: 3,
            borderRadius: 6,
          }}
        >
          Destination */}
      {/* <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#3498DB",
              borderWidth: 2,
              paddingVertical: 15,
            }} */}
      {/* > */}
      {/* <Feather name="search" size={24} color="black" />
            <TextInput
              placeholderTextColor="black"
              placeholder={"Enter Your Destination"}
            /> */}
      {/* </Pressable> */}

      {/*Date*/}
      {/* <Pressable
            onPress={() => setShowDatePicker(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#3498DB",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          > */}
      {/* <Feather name="calendar" size={24} color="black" />
            <Text>{dayjs(date).format("MMMM D, YYYY")}</Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              mode="single"
              date={date}
              onChange={(params) => {
                setDate(params.date);
                setShowDatePicker(false);
              }}
              onClose={() => setShowDatePicker(false)}
              selectedItemColor="#3498DB"
            />
          )} */}

      {/*Search */}
      {/* <Pressable
            onPress={() => navigation.navigate("ASearch")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#3498DB",
              borderWidth: 2,
              paddingVertical: 15,
              backgroundColor: "#3498DB",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "500",
                color: "white",
              }}
            >
              Search
            </Text>
          </Pressable>
        </View> */}

      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
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
    marginTop: -3,
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
});
