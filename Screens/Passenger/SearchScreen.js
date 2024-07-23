import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Pressable,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect, useContext, useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../../Contexts/UserContext";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const { ticket, setView, agencies } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = useMemo(() => {
    return ticket.filter((ticket) =>
      ticket.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ticket, searchQuery]);

  const handleView = (item) => {
    setView(item);
    navigation.navigate("View");
  };
  // function to find agency
  const getAgencyName = (agencyId) => {
    const matchingAgency = agencies.find((a) => a.id === agencyId);
    return matchingAgency ? matchingAgency.agencyName : "Unknown Agency";
  };
  const renderItem = ({ item }) => (
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
          <Text style={styles.ticketText}>From: {item.city}</Text>
          <Text style={styles.ticketText}>To: {item.destination}</Text>
          <Text style={styles.ticketText}>
            Date: {new Date(item.date).toDateString()}
          </Text>
          <Text style={styles.ticketText}>
            Time: {new Date(item.time).toLocaleTimeString()}
          </Text>
          <Text style={styles.ticketText}>
            Available: {item.available} Left
          </Text>
          <Text style={styles.ticketText}>Price: {item.price} XAF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    setLoading(false);
  }, [filteredTickets]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3498DB" />
        <Text>Loading tickets...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.searchbox}>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Enter your Destination"
          />

          <Feather name="search" size={24} color="#3498DB" />
        </View>
        <FlatList
          data={filteredTickets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={() => (
            <View style={styles.noTickets}>
              <Text>No tickets found. Try adjusting your search.</Text>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  searchbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 60,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#3498DB",
    borderRadius: 10,
    backgroundColor: "white",
  },
  input: {
    paddingLeft: 10,
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  ticketItem: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: "100%",
    height: 150,
    justifyContent: "space-between",
  },
  ticketText: {
    marginTop: -5,
    marginBottom: 5,
  },
  noTickets: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
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
