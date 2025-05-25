import { registerRootComponent } from "expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./App";
import FireDetectedScreen from "./FireDetected";

export type RootStackParamList = {
  Home: undefined;
  FireDetected: undefined;
};

const Stack = createNativeStackNavigator();

function RootApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FireDetected" component={FireDetectedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(RootApp);
