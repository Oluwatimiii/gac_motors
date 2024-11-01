import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Alert } from "react-native";
import Colors from "@/constants/Colors";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/motorStore";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import * as Location from 'expo-location';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { updateUserData } from "@/services/userService";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState('');

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
        setNewAddress(formattedAddress);
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not get location');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressUpdate = async () => {
    setLoading(true);
    try {
      const res = await updateUserData(user?.id, { address: newAddress });
      
      if (res.success) {
        setUserData({ ...user, address: newAddress });
        setModalVisible(false);
        Alert.alert('Success', 'Address updated successfully');
      } else {
        Alert.alert('Error', typeof res.msg === 'string' ? res.msg : 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update address');
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Address</Text>
            <Text style={styles.modalAddress}>{newAddress}</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddressUpdate}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Updating...' : 'Use This Address'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalAddress: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.darkGray,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.primary,
  },
  confirmButton: {
    backgroundColor: "green",
  },
});
