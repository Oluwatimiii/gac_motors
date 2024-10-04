import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { getUserImageSrc } from "@/services/userService";
import Colors from "@/constants/Colors";

interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  uri: string;
  alt: string;
}

export function Avatar({ size = "md", uri, alt }: AvatarProps) {
  const styles = StyleSheet.create({
    container: {
      width: getSizeInPixels(size),
      height: getSizeInPixels(size),
      borderRadius: getSizeInPixels(size) / 2,
      borderColor: Colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 0.3,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={getUserImageSrc(uri)}
        transition={100}
        style={styles.image}
        accessibilityLabel={alt}
      />
    </View>
  );
}

function getSizeInPixels(size: "sm" | "md" | "lg" | "xl"): number {
  switch (size) {
    case "sm":
      return 32;
    case "md":
      return 48;
    case "lg":
      return 64;
    case "xl":
      return 96;
    default:
      return 48;
  }
}
