import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import DeckItem from "./DeckItem";
import { getDecks } from "../../../utils/helper";

const Container = styled.View`
  flex: 1;
  margin: 0;
  background-color: #fff;
`;

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
    <Container>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <DeckItem onPress={onPress} deck={item} />}
      />
    </Container>
  );
};

export default DecksList;
