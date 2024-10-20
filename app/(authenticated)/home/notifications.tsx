import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const Discount = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: responsiveWidth(6),
          justifyContent: "center",
          paddingVertical: responsiveHeight(18),
          backgroundColor: Colors.primary,
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            alignItems: "center",
            paddingHorizontal: responsiveWidth(6),
            justifyContent: "flex-end",
            paddingVertical: responsiveHeight(3),
            position: "absolute",
            top:  responsiveHeight(6),
            right: 0,
          }}
        >
          <MaterialIcons name="cancel" size={38} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.centerContainer}>
          <LottieView
            source={require("@/assets/animations/empty-box.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>
        <View
          style={{
            marginBottom: responsiveHeight(5),
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 30,
              textAlign: "center",
              color: Colors.gray,
            }}
          >
            Oops, you currently have no notifications!
          </Text>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: "white",
              width: "100%",
              paddingVertical: responsiveHeight(2),
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontWeight: "bold",
                fontSize: 21,
                textAlign: "center",
              }}
            >
              Continue renting
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Discount;

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 200,
    height: responsiveHeight(33),
  },
});
