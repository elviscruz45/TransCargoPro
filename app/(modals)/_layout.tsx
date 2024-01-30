import {
  View,
  Text,
  Pressable,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link, Tabs } from "expo-router";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
//   import { useAppDispatch } from "../../../reducers/hooks";
//   import { useAppSelector } from "../../../reducers/hooks";
//   import { setToFalse, setToTrue } from "../../../slices/slide";
import { useState } from "react";

//   function TabBarIcon(props: {
//     name: React.ComponentProps<typeof FontAwesome>["name"];
//     color: string;
//   }) {
//     return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
//   }

export default function _layout() {
  // const dispatch = useAppDispatch();
  // const modalState = useAppSelector((state) => state.modalSlice.value);
  // const colorScheme = useColorScheme();
  // const handleVisibleModalFalse = () => {
  //   dispatch(setToFalse());
  //   console.log(false);
  // };
  // const handleVisibleModalTrue = () => {
  //   dispatch(setToTrue());
  //   console.log(true);
  // };

  return (
    <Stack>
      {/*       <Stack.Screen
        name="index"
        options={{
          title: "aaaa",
          // headerRight: () => (
          //   //   <TouchableOpacity
          //   //     onPress={
          //   //       modalState ? handleVisibleModalFalse : handleVisibleModalTrue
          //   //     }
          //   //   >
          //   <Ionicons name="bar-chart-outline" />

          //   //   </TouchableOpacity>
          // ),
        }}
      />
     <Stack.Screen
        name="camera"
        options={{
          title: "foto",
          headerShown: false,

          // presentation: "modal",
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => console.log("save")}>
          //     <Text>Guardar</Text>
          //   </TouchableOpacity>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => console.log("cancel")}>
          //     <Text>Cancelar</Text>
          //   </TouchableOpacity>
          // ),
        }}
      /> */}
      {/* <Stack.Screen
        name="login"
        options={{
          title: "login",
          headerShown: false,
          presentation: "modal",
        }}
      /> */}
      <Stack.Screen
        name="tires"
        options={{
          title: "Llantas",
          headerShown: true,
          presentation: "modal",
        }}
      />

      {/* <Stack.Screen
        name="tires"
        options={{
          title: "tires",
          headerShown: false,

          presentation: "modal",
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => console.log("save")}>
          //     <Text>Guardar</Text>
          //   </TouchableOpacity>
          // ),
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => console.log("cancel")}>
          //     <Text>Cancelar</Text>
          //   </TouchableOpacity>
          // ),
        }}
      /> */}

      {/* <Stack.Screen
        name="[id]"
        options={{
          title: "Home details",
        }}

      /> */}
    </Stack>
  );
}
