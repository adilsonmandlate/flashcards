import React, { useEffect, Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainRoute } from "./src/components";
import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setLocalNotification } from "./src/utils/helper";

export default App = () => {
  useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <MainRoute />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
