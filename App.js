import { useFonts } from "expo-font";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Login from "./src/Login";
import SignUp from "./src/SignUp";
import Dummy from "./src/Dummy";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import firebase from "firebase/app";
import "firebase/firestore";
import apiKeys from "./config";

export default function App(props) {
  const [loaded] = useFonts({
    CairoBlack: require("./assets/fonts/Cairo-Black.ttf"),
    CairoRegular: require("./assets/fonts/Cairo-Regular.ttf"),
    CairoBold: require("./assets/fonts/Cairo-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Log Outt"
          onPress={() => console.log("logged out")}
        />
      </DrawerContentScrollView>
    );
  }
  function Drawer2() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Sing Up" component={SignUp} />
        <Drawer.Screen name="Log Out" component={CustomDrawerContent} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Drawer2}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingUP"
          component={SignUp}
          options={{
            title: "",
            headerStyle: {
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="Dummy"
          component={Dummy}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
