import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

const Page = () => {
  const { top } = useSafeAreaInsets()
  const paddingTop = top > 0 ? top + 5 : 30

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert('Logout error')
    }
  }


  return (
    <View style={{ flex: 1, paddingTop }}>
      <View style={styles.container}>
        <Text>Profile Page</Text>
      </View>

      <Button title="logout" onPress={onLogout} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
  container: {
    paddingHorizontal: responsiveScreenWidth(5),
  }
});
