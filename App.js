import React, { useEffect, Fragment } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { MainRoute } from "./src/components";
import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setLocalNotification } from "./src/utils/helper";
import { enableScreens } from "react-native-screens";
import { navigationRef } from "./src/utils/RootNavigation";

enableScreens();

export default App = () => {
  useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer ref={navigationRef}>
        <MainRoute />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
