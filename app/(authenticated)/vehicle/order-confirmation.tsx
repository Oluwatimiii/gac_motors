import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useRentStore } from "@/store/rentStore";
import { details, Driver, drivers } from "@/data/data";
import Colors from "@/constants/Colors";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

const Page = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const [driver, setDriver] = useState<Driver | undefined>(undefined);

  const {
    startDate,
    endDate,
    isAppointedDriver,
    vehicleId,
    setTotalAmount,
    driverId,
  } = useRentStore();

  useEffect(() => {
    if (driverId !== null) {
      const selectedDriver = drivers.find((d) => d.id === driverId);
      if (selectedDriver) {
        setDriver(selectedDriver);
      }
    }
  }, [driverId]);

  const vehicle = details.find((item) => item.id === vehicleId);

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalAmount = () => {
    if (!vehicle) return 0;
    const days = calculateTotalDays();
    let total = days * (vehicle.price / 7);
    if (isAppointedDriver) {
      total *= 1.07;
    }
    return Math.floor(total).toLocaleString();
  };

  const handleConfirmOrder = () => {
    const rawTotal = calculateTotalAmount();
    const totalAmount =
      typeof rawTotal === "number"
        ? rawTotal
        : parseFloat(rawTotal.replace(/[^0-9.-]+/g, ""));
    setTotalAmount(totalAmount || 0);
    router.push("/(authenticated)/vehicle/payments");
  };

  if (!vehicle || !startDate || !endDate) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop }]}>
      <CustomProfileHeader text="Order Confirmation" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: Colors.background,
        }}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(10),
        }}
      >
        <LinearGradient
          colors={[Colors.background, Colors.background]}
          style={styles.gradientBackground}
        >
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationText}>
              Please confirm your ride details before proceeding. A confirmation
              email will be sent upon successful payment.
            </Text>
          </View>

          <View style={styles.vehicleInfoContainer}>
            <View style={styles.imageBox}>
              <Image
                source={vehicle.image}
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Start Date:</Text>
              <Text style={styles.detailValue}>{startDate.toDateString()}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>End Date:</Text>
              <Text style={styles.detailValue}>{endDate.toDateString()}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Total Days:</Text>
              <Text style={styles.detailValue}>{calculateTotalDays()}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Driver Option:</Text>
              <Text style={styles.detailValue}>
                {isAppointedDriver ? "Appointed Driver" : "Self Drive"}
              </Text>
            </View>
          </View>

          {isAppointedDriver && (
            <View style={styles.driverInfoContainer}>
              <Text style={styles.driverInfoTitle}>
                Appointed Driver Details
              </Text>
              <View style={styles.driverInfoContent}>
                <Image
                  source={driver?.image}
                  style={styles.driverImage}
                  resizeMode="contain"
                />
                <View style={styles.driverDetails}>
                  <Text style={styles.driverName}>{driver?.name}</Text>
                  <Text style={styles.driverContact}>
                    Contact: +{driver?.contact}
                  </Text>
                  <Text style={styles.driverGender}>Gender: {driver?.sex}</Text>
                </View>
              </View>
            </View>
          )}
        </LinearGradient>
      </ScrollView>

      <TouchableOpacity style={styles.footer} onPress={handleConfirmOrder}>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 18,
            color: "white",
            textAlign: "center",
            paddingVertical: 15,
          }}
        >
          Proceed to Pay - &#8358;{calculateTotalAmount()}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: responsiveWidth(5),
    paddingTop: 30,
    paddingBottom: 60,
  },
  confirmationBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    borderWidth: 0.3,
    borderColor: Colors.primary,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.text,
  },
  vehicleInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageBox: {
    width: responsiveWidth(80),
    height: responsiveHeight(25),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    borderWidth: 0.3,
    borderColor: Colors.primary,
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  detailsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    borderWidth: 0.3,
    borderColor: Colors.primary,
    marginBottom: 20,
  },
  detailBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: Colors.primary,
  },
  footer: {
    backgroundColor: Colors.primary,
    padding: 12,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(100),
    left: 0,
    bottom: 0,
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  driverContact: {
    fontSize: 14,
    color: Colors.text,
  },
  driverGender: {
    fontSize: 14,
    color: Colors.text,
  },
  driverInfoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    borderWidth: 0.3,
    borderColor: Colors.primary,
  },
  driverInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },
  driverInfoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
});
