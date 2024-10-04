import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";

export default function Splash() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoBox}>
        <Image
          style={styles.logoImage}
          source={require("../../../assets/images/gaclogo.png")}
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
