import Colors from "@/constants/Colors";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Href } from "expo-router";

const CustomHeader = () => {
  const router = useRouter()

  return (
      <View
        style={[
          styles.container,
          {
            height: 60,      
            paddingHorizontal: 20,
          },
        ]}
      >
        {/* HEADER */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO AND  */}
          <View style={styles.logoBox}>
            <Image
              style={styles.logoImage}
              source={require("@/assets/images/gaclogo.png")}
            />
          </View>

          {/* Link to notify pages on homescreen */}
          <TouchableOpacity onPress={() => router.push("/(authenticated)/home/notifications" as Href)}>
            <View style={styles.circle}>
              <Ionicons name="notifications-circle" size={26} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
  },
  logoImage: {
    height: 30,
    width: 40,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomHeader;
