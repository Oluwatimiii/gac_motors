import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "@/constants/Colors";
import {
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/motorStore";
import { Avatar } from "@/components/UI/Profile/Avatar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Href } from "expo-router";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const router = useRouter();
  const { user, setUserData } = useUserStore();
  const [loadings, setLoadings] = useState(false);
  const [displayLogoutModal, setDisplayLogoutModal] = useState(false);

  const handleLogout = async () => {
    setLoadings(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setLoadings(false);
        Alert.alert("Logout error");
      }
      setLoadings(false);
    } catch (error) {
      setLoadings(false);
      console.log("Logout error", error);
    }
  };

  const handleDeactivate = async () => {
    // Implement account deactivation here
    console.log("Deactivate account");
  };

  return (
    <View style={{ flex: 1, paddingTop }}>
      <CustomProfileHeader text="Profile" />
      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={displayLogoutModal}
        onRequestClose={() => setDisplayLogoutModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.modalText,
                { fontWeight: "bold", paddingHorizontal: responsiveWidth(13) },
              ]}
            >
              Are you sure you want to logout?.
            </Text>

            {loadings ? (
              <View style={{ alignSelf: "center" }}>
                <ActivityIndicator color={Colors.primary} />
              </View>
            ) : (
              <View style={styles.viewss}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setDisplayLogoutModal(false)}
                >
                  <Text style={styles.textStyle}>CANCEL</Text>
                </Pressable>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleLogout}
                >
                  <Text style={styles.textStyle}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80,
        }}
        style={styles.container}
      >
        {/* profile image and name */}
        <View style={styles.header}>
          <Avatar size="xl" uri={user?.image} alt="Profile Image" />
          <Text style={styles.name}>{user?.name || "User Name"}</Text>
        </View>

        {/* links to embedded pages */}
        <View style={styles.linksContainer}>
          {/* info link */}
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => router.push("/(authenticated)/profile/info" as Href)}
          >
            <FontAwesome5 name="user-circle" size={18} color="black" />
            <View style={styles.linkTextBox}>
              <Text style={styles.linkText}>Person Information</Text>
              <Text style={styles.linkText1}>Click to edit</Text>
            </View>
          </TouchableOpacity>

          {/* email link */}
          <View style={styles.linkItem}>
            <FontAwesome name="envelope-o" size={18} color="black" />
            <View style={styles.linkTextBox}>
              <Text style={styles.linkText}>Email</Text>
              <Text style={styles.linkText1}>{user?.email}</Text>
            </View>
          </View>

          {/* Set address link */}
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() =>
              router.push("/(authenticated)/profile/address" as Href)
            }
          >
            <FontAwesome name="address-book-o" size={18} color="black" />
            <View style={styles.linkTextBox}>
              <Text style={styles.linkText}>Address</Text>
              <Text style={styles.linkText1}>
                {user?.address
                  ? user?.address
                  : "No address set yet. Click to set address"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* History link */}
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() =>
              router.push("/(authenticated)/profile/history" as Href)
            }
          >
            <MaterialIcons name="history" size={18} color="black" />
            <View>
              <Text style={styles.linkText}>History</Text>
            </View>
          </TouchableOpacity>

          {/* Payment link */}
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() =>
              router.push("/(authenticated)/profile/payment" as Href)
            }
          >
            <FontAwesome name="credit-card" size={18} color="black" />
            <View>
              <Text style={styles.linkText}>Payment method</Text>
            </View>
          </TouchableOpacity>

          {/* T&C link */}
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() =>
              router.push("/(authenticated)/profile/terms" as Href)
            }
          >
            <SimpleLineIcons name="book-open" size={18} color="black" />
            <View>
              <Text style={styles.linkText}>Terms and Conditions</Text>
            </View>
          </TouchableOpacity>

          {/* FAQ link */}
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => router.push("/(authenticated)/profile/faq" as Href)}
          >
            <AntDesign name="questioncircleo" size={18} color="black" />
            <View>
              <Text style={styles.linkText}>FAQs</Text>
            </View>
          </TouchableOpacity>

          {/* Logout link */}
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => setDisplayLogoutModal(true)}
          >
            <AntDesign name="logout" size={18} color="red" />
            <View>
              <Text style={styles.linkText}>Logout</Text>
            </View>
          </TouchableOpacity>

          {/* Deactivate link */}
          <TouchableOpacity style={styles.linkItem}>
            <MaterialCommunityIcons name="cancel" size={18} color="red" />
            <View>
              <Text style={styles.linkText}>Deactivate account</Text>
            </View>
          </TouchableOpacity>
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
  roundImage: {
    borderRadius: 30,
    borderColor: Colors.primary,
    borderWidth: 1,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 6,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  linksContainer: {
    marginVertical: 10,
    columnGap: 5,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 15,
    height: 55,
    borderColor: Colors.primary,
    borderWidth: 0.3,
    borderRadius: 10,
    marginBottom: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
  },
  linkText1: {
    fontSize: 12,
    fontWeight: "medium",
  },
  linkTextBox: {
    gap: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: responsiveWidth(85),
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.primary,
  },
  buttonClose: {
    backgroundColor: "green",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 16,
  },
  viewss: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
    paddingVertical: 10
  },
});
