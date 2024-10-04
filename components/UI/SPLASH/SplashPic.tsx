import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function SplashPic() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(authenticated)/(tabs)/home");
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoBox}>
        <Image
          style={styles.logoImage}
          source={require("../../../assets/images/gaclogo.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  logoBox: {
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  logoImage: {
  },
});