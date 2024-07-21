import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ASearchResults = ({ data, input, setInput }) => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(item) => {
          if (item.place.toLowerCase().includes(input.toLowerCase())) {
            if (input === "") {
              return null;
            }
            return (
              <Pressable
                onPress={() => {
                  setInput(item.destination);
                  navigation.navigate("View", { ticket: item });
                }}
                style={styles.itembox}
              >
                <View>
                  //enter ticket image
                  <Image
                    style={styles.image}
                    source={{ url: "../assets/ticket1.png" }}
                  />
                </View>
                <View style={styles.items}>
                  <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    Agency:{" "}
                  </Text>
                  <Text style={styles.text}>
                    From : {item.city} at {item.time}
                  </Text>
                  <Text>Destination: {item.destination} </Text>
                  <Text>Amount: {item.available} left</Text>
                  <Text>Price: {item.price} FCFA</Text>
                </View>
              </Pressable>
            );
          }
        }}
      />
    </View>
  );
};

export default ASearchResults;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  itembox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  items: {
    marginLeft: 10,
  },
  text: {
    marginBottom: 2,
  },
});
