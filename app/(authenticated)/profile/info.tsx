import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Colors from "@/constants/Colors";
import {
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/motorStore";
import * as ImagePicker from "expo-image-picker";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import {
  getUserImageSrc,
  updateUserData,
  uploadFile,
} from "@/services/userService";
import { TextInput } from "react-native";
import GradientButton from "@/components/UI/GradientBtn";
import { Image } from "expo-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface UserDetails {
  name: string;
  phoneNumber: string;
  image: any;
  address: string;
}

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);

  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phoneNumber: "",
    image: null,
    address: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        image: user.image || null,
        address: user.address || "",
      });
    }
  }, [user]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUserDetails({ ...userDetails, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    let userData = { ...userDetails };
    let { name, address, image, phoneNumber } = userData;

    if (!name || !address || !phoneNumber || !image) {
      Alert.alert("Please fill all fields before submitting");
      setLoading(false);
      return;
    }

    if (typeof image == "object") {
      // upload to supabase
      let imageRes = await uploadFile({
        folderName: "profiles",
        fileUri: image?.uri,
        isImage: true,
      });
      if (imageRes.success) {
        userData.image = imageRes.data;
      } else {
        userData.image = null;
        Alert.alert("Image Upload error");
      }
    }

    // update user
    const res = await updateUserData(user?.id, userData);
    console.log("result of profile update:", res);
    setLoading(false);

    if (res.success) {
      setUserData({ ...user, ...userData });
      router.back();
    }
  };

  let imageSrc =
    userDetails.image && typeof userDetails.image == "object"
      ? userDetails.image.uri
      : getUserImageSrc(userDetails?.image);

  return (
    <View style={{ flex: 1, paddingTop }}>
      <CustomProfileHeader text="Edit Profile" />
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
          <View style={{ position: "relative" }}>
            <Pressable onPress={handleImagePick} style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={imageSrc}
                accessibilityLabel="New Profile Image"
              />
            </Pressable>
            <Pressable
              onPress={handleImagePick}
              style={styles.editIconContainer}
            >
              <FontAwesome6 name="camera" size={17} color={Colors.primary} />
            </Pressable>
          </View>
          <Text style={styles.name}>{user?.name || "User Name"}</Text>
        </View>

        {/* Form fields to enable edit */}
        <View style={styles.formBox1}>
          <View>
            <Text style={styles.userNameText}>Name</Text>
            <TextInput
              style={styles.userNameInput}
              value={userDetails.name}
              onChangeText={(value) =>
                setUserDetails({ ...userDetails, name: value })
              }
              placeholder="Enter your full name"
              placeholderTextColor={Colors.gray}
              keyboardType="name-phone-pad"
            />
          </View>
          <View>
            <Text style={styles.userNameText}>Phone Number</Text>
            <TextInput
              style={styles.userNameInput}
              value={userDetails.phoneNumber}
              onChangeText={(value) =>
                setUserDetails({ ...userDetails, phoneNumber: value })
              }
              placeholder="Input phone no.."
              placeholderTextColor={Colors.gray}
              keyboardType="name-phone-pad"
            />
          </View>
          <View>
            <Text style={styles.userNameText}>Address</Text>
            <TextInput
              style={styles.userNameInput}
              placeholder="Enter your address"
              value={userDetails.address}
              onChangeText={(value) =>
                setUserDetails({ ...userDetails, address: value })
              }
              placeholderTextColor={Colors.gray}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.viewSpace}>
            <GradientButton
              disabled={loading}
              onPress={onSubmit}
              title="Update Profile"
            />
          </View>
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
  formBox1: {
    paddingTop: 15,
    paddingBottom: 60,
  },
  viewSpace: {
    paddingVertical: 20,
    width: "100%",
  },
  userNameText: {
    fontSize: 17,
    color: "#6A5ACD",
    fontWeight: "400",
    marginTop: 20,
  },
  userNameInput: {
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    paddingVertical: 7,
    width: "100%",
  },
  imgContainer: {
    height: 85,
    width: 85,
    borderRadius: 35,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
  },
});
