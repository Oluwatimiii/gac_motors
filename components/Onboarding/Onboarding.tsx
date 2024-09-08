import React, { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Animated,
  View,
  Text,
  Pressable,
  StatusBar,
} from "react-native";
import { Link, router } from "expo-router";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { onboarding, OnboardingType } from "@/data/data";
import Paginator from "./Paginator";
import OnboardingItem from "./OnboardingItem";
import NextBtn from "./NextBtn";
import SkipBtn from "./SkipBtn";
import { Ionicons } from "@expo/vector-icons";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<OnboardingType> | null>(null);


  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToButton = () => {
    if (currentIndex < onboarding.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.navigate("/login");
    }
  };

  const scrollToLogin = () => {
    router.navigate("/login");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"  />
      <View style={{ flex: 1 }}>
        <FlatList
          data={onboarding}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }], 
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
        <View style={styles.absoluteBox}>
          {currentIndex !== 3 ? (
            <>
              <Paginator data={onboarding} scrollX={scrollX} index={currentIndex} />
              <View style={styles.skipNxt}>
                <SkipBtn scrollToLogin={scrollToLogin} />
                <NextBtn
                  scrollToButton={scrollToButton}
                  percentage={(currentIndex + 1) * (100 / onboarding.length)}
                  currentIndex={currentIndex}
                />
              </View>
            </>
          ) : (
            <View style={{ width: responsiveWidth(80), marginBottom: 30 }}>
                <Pressable onPress={() => router.replace("/login")} style={styles.btnTxtBox}>
                  <View style={styles.btnContent}>
                    <Text style={styles.btnTxt}>Let's Go!</Text>
                    <View style={styles.iconContainer}>
                      <Ionicons name="chevron-forward" size={16} color="red" />
                      <Ionicons name="chevron-forward" size={16} color="red" />
                      <Ionicons name="chevron-forward" size={16} color="red" />
                    </View>
                  </View>
                </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxtBox: {
    backgroundColor: "white",
    paddingVertical: responsiveHeight(2),
    borderRadius: 10,
    width: "100%",
  },
  btnTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  absoluteBox: {
    position: "absolute",
    bottom: responsiveHeight(8),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  skipNxt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    gap: responsiveWidth(60),
    paddingHorizontal: responsiveWidth(10),
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
});
