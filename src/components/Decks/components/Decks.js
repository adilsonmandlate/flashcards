import React, { useState, useEffect, useCallback, useContext } from "react";
import { FlatList, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DeckItem from "./DeckItem";
import { getDecks } from "../../../utils/helper";
import { useFocusEffect } from "@react-navigation/native";
import { navigate } from "../../../utils/RootNavigation";

const DecksList = ({ navigation }) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDecksData();
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
    }, [])
  );

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
    <FlatList
      data={decks}
      style={{ backgroundColor: "white" }}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <DeckItem onPress={onPress} deck={item} />}
    />
  );
};

export const RenderActions = () => {
  /** This component uses navigate from RootNavigator, coming from utils, not react-navigation */
  return (
    <Ionicons
      name="ios-add-circle-outline"
      size={24}
      color={"green"}
      onPress={() => navigate("Add Deck")}
    />
  );
};

export default DecksList;
