import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/motorStore";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import * as Location from 'expo-location';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);

  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address[0]) {
        const formattedAddress = `${address[0].street}, ${address[0].city}, ${address[0].region} ${address[0].postalCode}`;
        setUserData({ ...user, address: formattedAddress });
      }
    } catch (error) {
      alert('Error getting location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop }}>
      <CustomProfileHeader text="Your Address" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80,
        }}
        style={styles.container}
      >
        <View style={styles.addressContainer}>
          <MaterialIcons name="location-on" size={24} color={Colors.primary} />
          <Text style={styles.addressText}>
            {user?.address || 'No address set'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <MaterialIcons name="my-location" size={20} color="white" />
          <Text style={styles.buttonText}>
            {loading ? 'Getting Location...' : 'Use Current Location'}
          </Text>
        </TouchableOpacity>
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
  addressContainer: {
    backgroundColor: Colors.gray,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: Colors.darkGray,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
