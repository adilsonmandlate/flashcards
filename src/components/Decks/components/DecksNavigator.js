import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DecksList from "./Decks";
import DeckDetails from "../../DeckDetails/components/DeckDetails";
import AddCard from "../../AddCard/component/AddCard";
import Quiz from "../../Quiz/component/Quiz";

const Stack = createStackNavigator();

const DecksListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={DecksList} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="New Card" component={AddCard} />
      <Stack.Screen name="Deck Details" component={DeckDetails} />
    </Stack.Navigator>
  );
};

export default DecksListNavigator;
