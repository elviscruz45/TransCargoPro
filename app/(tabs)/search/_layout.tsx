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
import Colors from "../../../constants/Colors";

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
      <Stack.Screen
        name="index"
        options={{
          title: "Unidades",
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
        name="item"
        options={{
          title: "Informacion",
          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="moreDetail"
        options={{
          title: "Information",
          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="files"
        options={{
          title: "files",
          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="addFiles"
        options={{
          title: "addFiles",
          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editasset"
        options={{
          title: "editasset",
          // headerShown: false,
          // presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editFiles"
        options={{
          title: "editFiles",
          // headerShown: false,
          // presentation: "modal",
        }}
      />
      {/*  <Stack.Screen
        name="item"
        options={{
          title: "Creacion Gasto Manual",
          // presentation: "modal",
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("save")}>
              <Text>Guardar</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => console.log("cancel")}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CameraScreen"
        options={{
          title: "",
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Home details",
        }}
      />*/}
    </Stack>
  );
}
