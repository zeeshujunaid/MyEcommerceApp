import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Loginscreen";
import LoaderScreen from "../screens/Loaderscreen";
import HomeScreen from "../screens/Homescreen";
import Toast from "react-native-toast-message"; 
import Cart from "../screens/Cart";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Loader" component={LoaderScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>

      <Toast />
    </>
  );
}
