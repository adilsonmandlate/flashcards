import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import DecksList from "./Decks";
import DeckDetails from "../../DeckDetails/components/DeckDetails";
import AddCard from "../../AddCard/component/AddCard";
import Quiz from "../../Quiz/component/Quiz";
import AddDeck from "../../AddDeck/components/AddDeck";

const Stack = createStackNavigator();

const DecksListNavigator = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={() => ({
        cardOverlayEnabled: true,
        gestureEnabled: true,
      })}
    >
      <Stack.Screen
        name="Decks"
        component={DecksList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="New Card"
        component={AddCard}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen name="Deck Details" component={DeckDetails} />
    </Stack.Navigator>
  );
};

export default DecksListNavigator;
