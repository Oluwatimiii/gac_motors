import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Onboarding from "@/components/Onboarding/Onboarding";
import { useUserStore } from "@/store/motorStore";
import SplashPic from "@/components/UI/SPLASH/SplashPic";

const Page = () => {
  //displays onboarding or redirects to login screen
  const user = useUserStore((state) => state.user);
    
  return (
    <View style={styles.container}>
      {user ? (
        <SplashPic />
      ) : (
        <Onboarding />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
