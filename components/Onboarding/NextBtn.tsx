import React, { useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Text,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import Colors from "@/constants/Colors";

type btnProp = {
  percentage: any;
  scrollToButton: () => void;
  currentIndex: number;
};

const NextBtn = ({ percentage, scrollToButton, currentIndex }: btnProp) => {
  const size = 64;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Circle>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} strokeWidth={strokeWidth}>
        <G rotation="-90" origin={center} />
        {/* <Circle
          stroke="#fff"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        /> */}

        {/* <Circle
          ref={progressRef}
          stroke="#fff"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
        /> */}
      </Svg>
      <TouchableOpacity
        onPress={scrollToButton}
        style={styles.button}
        activeOpacity={0.6}
      >
        <FontAwesome5 name="long-arrow-alt-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default NextBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
