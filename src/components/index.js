import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddDeck from "./AddDeck/components/AddDeck";
import DecksListNavigator from "./Decks/components/DecksNavigator";

const Tab = createBottomTabNavigator();

export const MainRoute = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Decks"
          component={DecksListNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-list" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add Deck"
          component={AddDeck}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-add" size={28} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
