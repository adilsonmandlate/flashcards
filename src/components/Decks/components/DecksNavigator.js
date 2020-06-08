import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import DecksList, { RenderActions } from "./Decks";
import DeckDetails from "../../DeckDetails/components/DeckDetails";
import AddCard from "../../AddCard/component/AddCard";
import Quiz from "../../Quiz/component/Quiz";
import AddDeck from "../../AddDeck/components/AddDeck";

const Stack = createNativeStackNavigator();

const DecksListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Decks"
        component={DecksList}
        options={{
          headerLargeTitle: true,
          headerRight: () => <RenderActions />,
        }}
      />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          headerShown: false,
          stackPresentation: "modal",
        }}
      />
      <Stack.Screen
        name="New Card"
        component={AddCard}
        options={{
          headerShown: false,
          stackPresentation: "modal",
        }}
      />
      <Stack.Screen name="Deck Details" component={DeckDetails} />
    </Stack.Navigator>
  );
};

export default DecksListNavigator;
