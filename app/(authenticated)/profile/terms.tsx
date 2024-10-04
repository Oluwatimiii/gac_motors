import { StyleSheet, Text, View, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/motorStore";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);

  return (
    <View style={{ flex: 1, paddingTop }}>
      <CustomProfileHeader text="Terms & Conditions" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80,
        }}
        style={styles.container}
      >
        <View>
          <Text>HELLO FROM T&C</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    backgroundColor: "white",
  },
});
