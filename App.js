import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainRoute } from "./src/components";
import { SafeAreaView, StatusBar } from "react-native";
import { setLocalNotification } from "./src/utils/helper";

export default App = () => {
  useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <MainRoute />
      </NavigationContainer>
    </SafeAreaView>
  );
};
