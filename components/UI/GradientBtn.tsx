import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientButtonProps {
  onPress?: () => void;
  title: string;
  disabled: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onPress,
  title,
  disabled,
}) => {
  return (
    disabled ? (
      <View style={[styles.button, styles.disabledButton]}>
        <Text style={[styles.text, styles.disabledText]}>{title}</Text>
      </View>
    ) : (
      <LinearGradient
        colors={["#CC2936", "#66151B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          style={styles.button}
        >
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    )
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 17,
    width: "100%",
  },
  button: {
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    overflow: "hidden", 
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  disabledText: {
    color: "#333", // Dark color for the text when disabled
  },
});

export default GradientButton;
