import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getDeck } from "../../../utils/helper";

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

  const startQuiz = () => {
    if (deck && deck.questions.length > 0) {
      navigation.navigate("Quiz", {
        deckId: deck.title,
      });
    } else {
      alert("There are no cards in this deck");
    }
  };

  const renderCards = (item) => (
    <View style={styles.cardDetails}>
      <Text style={{ fontSize: 17, fontWeight: "500", textAlign: "center" }}>
        {item.question}
      </Text>

      <Text style={{ fontSize: 15, textAlign: "center", color: "#bdc3c7" }}>
        {item.answer}
      </Text>
    </View>
  );

  const { height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={[{ height: height * 0.4 }, styles.deckDetails]}>
        <LinearGradient
          colors={["#16a085", "#27ae60"]}
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          <Text style={styles.deckDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales
            sed felis ut posuere. Nulla sollicitudin, libero eu laoreet
            facilisis, metus turpis egestas orci, blandit posuere sem urna non
            urna. Cras placerat gravida pharetra. Nunc faucibus leo at dignissim
            suscipit.
          </Text>
          <Text style={styles.cardsNumber}>
            {`${deck?.questions?.length}`} cards
          </Text>
        </LinearGradient>
      </View>

      <FlatList
        style={styles.cardsContainer}
        contentContainerStyle={styles.cardsContentContainerStyle}
        horizontal
        data={deck?.questions}
        keyExtractor={(item) => item.question}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => renderCards(item)}
      />

      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={["#16a085", "#27ae60"]}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.buttonGradient}
        >
          <TouchableOpacity style={styles.buttonTouchable} onPress={startQuiz}>
            <Text style={{ color: "#fff" }}>Start Quiz</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  deckDetails: {
    overflow: "hidden",

    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  deckDescription: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    textAlign: "justify",
  },
  cardsNumber: {
    color: "#fff",
    fontSize: 19,
    marginBottom: 40,
    fontWeight: "500",
    textAlign: "right",
  },
  cardsContainer: {
    paddingLeft: 0,
    marginHorizontal: 1,
    transform: [{ translateY: -45 }],
  },
  cardsContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cardDetails: {
    backgroundColor: "#fff",
    width: 250,
    height: 150,
    padding: 7,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 20,
  },
  buttonGradient: {
    width: "100%",
    borderRadius: 12,
    padding: 18,
    margin: 10,
  },
  buttonTouchable: {
    alignItems: "center",
  },
});

export default DeckDetails;
