import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { OnboardingType } from "@/data/data";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type OnboardingItemProps = {
  item: OnboardingType;
};

const OnboardingItem = ({ item }: OnboardingItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <ImageBackground
        source={require("@/assets/images/boardBg.png")}
        style={styles.image}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1}}>
            <LinearGradient
              colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.5, 1]}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <View style={{ paddingHorizontal: responsiveWidth(5), gap: 15 }}>
                {/* GAC LOGO */}
                <View style={styles.logoBox}>
                  <Image
                    style={styles.logoImage}
                    source={require("@/assets/images/boardLogo.png")}
                  />
                </View>

                {/* description */}
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>

                {/* Vehicle Image */}
                <Image
                source={item.image}
                style={styles.onboardImage}
                resizeMode="contain"
              />

              </View>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
    fontSize: 45,
    maxWidth: responsiveWidth(70),
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  desc: {
    fontWeight: "300",
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 5
  },
  logoBox: {
    gap: 10,
    paddingVertical: 10,
  },
  logoImage: {
    height: 21,
    width: 141,
  },
  onboardImage: {
    width: "100%",
    height: "50%",
  },
});

export default OnboardingItem;
