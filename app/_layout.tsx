import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Href, Link, useRootNavigationState, useSegments } from "expo-router";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import SplashPic from "@/components/UI/SPLASH/SplashPic";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/motorStore";
import { getUserData } from "@/services/userService";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  //handle auth_management here and redirect to appropriate groups
  const router = useRouter();
  const segments = useSegments();
  const setAuth = useUserStore((state) => state.setAuth);
  const setUserData = useUserStore((state) => state.setUserData);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session_user", session?.user);

      const updateUserData = async(user: any) => {
        let res = await getUserData(user?.id);
        console.log("update user", res);
    
        if(res.success) {
         setUserData(res.data)
        }
      };
      
      const inAuthGroup = segments[0] === "(authenticated)";
      if (session?.user && !inAuthGroup) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        setAuth(null);
        router.replace("/");
      }
    });
  }, []);


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
    return (
      <SplashPic />
    );
  }
  // if (!loaded || !isLoaded) {
  //   return (
  //     <SplashPic />
  //   );
  // }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, title: "" }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, title: "" }}
      />

      <Stack.Screen
        name="help"
        options={{ title: "Help", presentation: "modal" }}
      />

      {/* auth group */}
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{headerShown: false }}
      />

      {/* auth-vehicle group */}
      <Stack.Screen
        name="(authenticated)/vehicle"
        options={{headerShown: false }}
      />
      \
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <InitialLayout />
      </GestureHandlerRootView>
  );
};

export default RootLayoutNav;
