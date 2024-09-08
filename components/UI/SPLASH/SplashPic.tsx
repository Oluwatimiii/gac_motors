import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";


export default function SplashPic() {
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