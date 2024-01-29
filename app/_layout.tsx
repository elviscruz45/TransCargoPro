import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, Slot, useRouter, Redirect } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, Text } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";

import type { RootState } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
  Unmatched,
} from "expo-router";

// export default Unmatched;

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "(modals)",

  initialRouteName: "(tabs)",
  // initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor="white" />

        <RootLayoutNav />
      </Provider>
      <Toast />
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  //global state management for the user_uid
  const isLoading = useSelector((state: RootState) => state.userId.isLoading);
  const session = useSelector((state: RootState) => state.userId.session);

  // // Automatically open login if user is not authenticated
  // useEffect(() => {
  //   // router.push("/(tabs)/home");
  //   router.push("/(modals)/login");
  // }, []);

  // if (value) {
  //   console.log("value", value);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ headerShown: false }} />

      {/* <Stack.Screen
          name="(modals)"
          options={{ headerShown: false, presentation: "modal" }}
        /> */}

      {/* <Stack.Screen name="(modals)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
    </Stack>
  );
  // } else {
  //   return (
  //     <Stack>
  //       <Stack.Screen name="index" options={{ headerShown: false }} />
  //     </Stack>
  //   );
  // }
}
