import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Onboarding from "@/components/Onboarding/Onboarding";

const Page = () => {
  //displays onboarding or redirects to login screen
  
  return (
    <View style={styles.container}>
      <Onboarding />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
