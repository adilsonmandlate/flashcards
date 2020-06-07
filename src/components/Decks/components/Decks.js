import React, { useState, useEffect, useCallback } from "react";
import { FlatList, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import DeckItem from "./DeckItem";
import { HeaderScrollView } from "../../HeaderScrollView";
import { getDecks } from "../../../utils/helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

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

  const RenderActions = () => {
    return <Ionicons name="ios-add-circle-outline" size={24} color={"green"} />;
  };

  const onPress = (id) => {
    navigation.navigate("Deck Details", {
      id,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HeaderScrollView title="Decks" actions={<RenderActions />}>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <DeckItem onPress={onPress} deck={item} />}
        />
      </HeaderScrollView>
    </SafeAreaView>
  );
};

export default DecksList;
