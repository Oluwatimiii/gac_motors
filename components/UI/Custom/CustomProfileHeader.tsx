import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { details, Details } from "@/data/data";
import { responsiveWidth } from "react-native-responsive-dimensions";

interface CustomProfileHeaderProps {
  text: string;
}

const CustomProfileHeader: React.FC<CustomProfileHeaderProps> = ({ text }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text}</Text>
      </View>
    </View>
  );
};

export default CustomProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  backButton: {
    position: "absolute",
    left: responsiveWidth(5),
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    color: Colors.primary
  },
  
});
