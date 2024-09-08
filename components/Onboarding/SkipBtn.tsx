import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const SkipBtn = ({ scrollToLogin }: { scrollToLogin: () => void }) => {
  return (
    <Pressable onPress={scrollToLogin}>
      <Text style={styles.skipBtnText}>Skip</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  skipBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22
  },
});

export default SkipBtn;