import React, { useState, useEffect, useCallback, useContext } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DeckItem from "./DeckItem";
import { getDecks } from "../../../utils/helper";
import { useFocusEffect } from "@react-navigation/native";
import { navigate } from "../../../utils/RootNavigation";
import { LinearGradient } from "expo-linear-gradient";

const DecksList = ({ navigation }) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDecksData();
    });

    return unsubscribe;
  }, [navigation]);

  const getDecksData = () => {
    getDecks()
      .then((newDecks) => {
        setDecks(Object.values(newDecks));
      })
      .catch((error) => {
        alert("Error: ", error);
      });
  };

  const onPress = (id) => {
    navigation.navigate("Deck Details", {
      id,
    });
  };

  return (
    <LinearGradient colors={["#16a085", "#27ae60"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 5, paddingRight: 0 }}>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <DeckItem onPress={onPress} deck={item} />}
        />
      </View>
    </LinearGradient>
  );
};

export const RenderActions = () => {
  /** This component uses navigate from RootNavigator, coming from utils, not react-navigation */
  return (
    <Ionicons
      name="ios-add-circle-outline"
      size={24}
      color={"#fff"}
      onPress={() => navigate("Add Deck")}
    />
  );
};

export default DecksList;
