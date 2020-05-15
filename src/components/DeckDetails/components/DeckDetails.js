import React, { useEffect, useState } from "react";
import { Text, Button, View } from "react-native";
import styled from "styled-components";
import { removeDeck, getDeck } from "../../../utils/helper";

const Container = styled.View`
  background: #fff;
  padding: 20px;
  flex: 1;
`;

const DeckName = styled.Text`
  font-weight: 600;
  font-size: 36px;
  text-align: center;
`;

const ButtonContainers = styled.View`
  align-items: center;
`;

const ButtonTouchable = styled.TouchableOpacity`
  padding: 18px;
  background: #34495e;
  width: 100%;
  align-items: center;
  color: #fff;
  margin: 10px;
  border-radius: 12px;
`;

const DeckDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDeckData();
    });
    return unsubscribe;
  }, [navigation]);

  const getDeckData = () => {
    getDeck(id)
      .then((result) => {
        setDeck(result);
      })
      .catch((error) => alert("Error: ", error));
  };

  const handleDelete = (deckId) => {
    removeDeck(deckId).then(() => {
      navigation.goBack();
    });
  };

  const startQuiz = () => {
    if (deck && deck.questions.length > 0) {
      navigation.navigate("Quiz", {
        deckId: deck.title,
      });
    } else {
      alert("There are no cards in this deck");
    }
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <DeckName>{deck?.title}</DeckName>
        <Text style={{ textAlign: "center" }}>
          {`${deck?.questions?.length} ${
            deck?.questions?.length > 1 ? "decks" : "deck"
          }`}{" "}
        </Text>
      </View>
      <ButtonContainers>
        <ButtonTouchable
          onPress={() =>
            navigation.navigate("New Card", {
              deckId: deck?.title,
            })
          }
        >
          <Text style={{ color: "#fff" }}>Add Card</Text>
        </ButtonTouchable>
        <ButtonTouchable onPress={startQuiz}>
          <Text style={{ color: "#fff" }}>Start Quiz</Text>
        </ButtonTouchable>
        <Button
          onPress={() => handleDelete(deck?.title)}
          color="#e74c3c"
          title="Delete Deck"
        />
      </ButtonContainers>
    </Container>
  );
};

export default DeckDetails;
