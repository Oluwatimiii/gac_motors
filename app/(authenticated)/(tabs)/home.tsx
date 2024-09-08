import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomHeader from "@/components/UI/Custom/CustomHeader";
import Carousel from "@/components/UI/Home/Carousel";
import { StatusBar } from "react-native";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={{ flex: 1, paddingTop }}>
      {/* Home header with notifications page */}
      <StatusBar barStyle="dark-content" />
      <CustomHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {/* Text and location */}
        <View style={styles.container}>
          <Text style={styles.greeting}>Hello, Moyinoluwa</Text>

          <View style={styles.locationBox}>
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.primary}
            />
            <Text>Plot 3, uncle sege - yaba, Lagos.</Text>
          </View>
        </View>

        {/* RIDES & CAROUSEL */}
        <Carousel />
      </ScrollView>
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
    marginBottom: 20
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingVertical: 8,
  },
});
