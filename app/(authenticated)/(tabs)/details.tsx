import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DetailsCard from "@/components/UI/Details/DetailsCard";
import { details } from "@/data/data";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Background image */}
        <Image
          source={require("@/assets/images/boardBg.png")}
          style={styles.backgroundImage}
        />

        {/* main component */}
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5, 1]}
          style={styles.gradientOverlay}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 40,
              paddingTop: 20,
              paddingHorizontal: responsiveWidth(5),
            }}
          >
            {/* Text*/}
            <Text style={styles.headerText}>Choose Your location Today!</Text>

            {/* DETAILS CARD */}
            <ScrollView
              contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              {details.map((data) => {
                return <DetailsCard key={data.id} data={data} />;
              })}
            </ScrollView>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 1,
  },
  gradientOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    zIndex: 999,
  },
  headerText: {
    color: "white",
    fontSize: 22,
    paddingHorizontal: responsiveWidth(2),
    marginBottom: 20
  },
});
