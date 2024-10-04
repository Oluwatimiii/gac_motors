import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/motorStore";
import { getUserData } from "@/services/userService";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const setAuth = useUserStore((state) => state.setAuth);
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const isHydrated = useUserStore((state) => state.isHydrated);
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  //Effect for font's error
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Perform any necessary setup here
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (appIsReady && fontsLoaded && isHydrated) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [appIsReady, fontsLoaded, isHydrated]);

  //handle session from supabase
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setAuth(session?.user);
          updateUserData(session?.user);
        } else {
          setAuth(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  //update User
  const updateUserData = async (user: any) => {
    let res = await getUserData(user.id);
    if (res.success) {
      setUserData(res.data);
    }
  };

  useEffect(() => {
    if (!isHydrated || !appIsReady || !fontsLoaded) {
      return;
    }

    const inAuthGroup = segments[0] === "(authenticated)";

    if (user && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [isHydrated, appIsReady, fontsLoaded, segments, user]);

  if (!isHydrated || !appIsReady || !fontsLoaded) {
    return null;
  }

  return <Slot />;
};

const RootLayoutNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InitialLayout />
    </GestureHandlerRootView>
  );
};

export default RootLayoutNav;
