import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Href, useRouter } from "expo-router";


interface SplashProps {
  url: string;
}

export default function Splash({ url }: SplashProps) {
  const [onboard, setOnboard] = useState(null);
  const router = useRouter()
   
  //Get users details and check if user has clicked on onboarded

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(url as Href);
    }, 2000);

    return () => clearTimeout(timer);
  }, [url, router]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoBox}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/images/gaclogo.png")}
        />

        <View>
          <Text style={styles.splashText2}>Gac Motors...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
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
    height: 65,
    width: 65,
  },
  splashText2: {
    fontSize: 20,
    color: "red",
    letterSpacing: 4,
  },
});