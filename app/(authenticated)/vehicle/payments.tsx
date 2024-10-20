import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";
import { responsiveHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import { useRentStore } from "@/store/rentStore";
import CustomRideButton from "@/components/UI/Custom/CustomRideButton";
import { useUserStore } from "@/store/motorStore";
import { Paystack } from "react-native-paystack-webview";
import { supabase } from "@/lib/supabase";
import ConfettiCannon from 'react-native-confetti-cannon';
import { details, drivers } from "@/data/data";
import LottieView from "lottie-react-native";
import { formatNumber } from "@/utils/formatNumber";
import { BlurView } from "expo-blur";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const [pay, setPay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const router = useRouter();

  const { user } = useUserStore();
  const { vehicleId, startDate, endDate, totalAmount, isAppointedDriver, driverId, reset } =
    useRentStore();

  // Find the vehicle and driver details
  const vehicle = details.find(v => v.id === vehicleId);
  const driver = driverId ? drivers.find(d => d.id === driverId) : null;

  const handlePayment = () => {
    if (user?.email && totalAmount) {
      setPay(true);
    } else {
      Alert.alert("Error", "Unable to process payment. Please check your details.");
    }
  };

  const handleSuccess = async (res: any) => {
    const response = res["transactionRef"]["message"];
    if (response === "Approved") {
      setLoading(true)
      try {
        // Push to supabase rentals table
        const { error } = await supabase
          .from("rentals")
          .insert({
            userId: user?.id,
            vehicleId: vehicleId,
            startDate: startDate,
            endDate: endDate,
            totalAmount: totalAmount,
            driverId: driverId
          });

        if (error) throw error;

        // Reset the rent store
        reset();

        // Show confetti and success message
        setShowConfetti(true);
        setLoading(false)
        Alert.alert("Success", "Your payment was successful and your rental has been booked!", [
          { text: "OK", onPress: () => router.replace('/(authenticated)/(tabs)/history') }
        ]);
      } catch (error) {
        setLoading(false)
        console.error("Error saving rental:", error);
        Alert.alert("Error", "There was an error saving your rental. Please contact support.");
      }
    }
  };

  return (
    <View style={{ flex: 1, paddingTop }}>
      <CustomProfileHeader text="Payments" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80,
        }}
        style={styles.container}
      >
        <View style={styles.paymentDetails}>
          <Text style={styles.detailTitle}>Order Details</Text>
          <Text style={styles.detailText}>Vehicle: {vehicle ? vehicle.name : 'Unknown'}</Text>
          <Text style={styles.detailText}>Start Date: {startDate?.toDateString()}</Text>
          <Text style={styles.detailText}>End Date: {endDate?.toDateString()}</Text>
          <Text style={styles.detailText}>
            Driver: {isAppointedDriver ? (driver ? driver.name : 'Appointed') : 'Self'}
          </Text>
          {driver && (
            <Text style={styles.detailText}>Driver Phone: {driver.contact}</Text>
          )}
          <Text style={styles.totalAmount}>Total Amount: ₦{formatNumber(totalAmount)}</Text>
        </View>

        {pay && (
          <Paystack
            paystackKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLISHABLE_KEY!}
            phone={user?.phoneNumber}
            amount={totalAmount}
            billingEmail={user?.email!}
            billingName={user?.name}
            activityIndicatorColor={Colors.primary}
            onCancel={(res: any) => {
              setPay(false);
              Alert.alert("Payment Cancelled", "Your payment was cancelled.");
            }}
            onSuccess={handleSuccess}
            autoStart={pay}
          />
        )}

        <View style={styles.buttonContainer}>
          <CustomRideButton title="Conplete Payment" onPress={handlePayment} />
        </View>

        <View style={styles.centerContainer}>
          <LottieView
            source={require('@/assets/animations/car-box.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
        </View>
      </ScrollView>

      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{x: -10, y: 0}}
          autoStart={true}
          fadeOut={true}
        />
      )}

      {loading && (
        <BlurView intensity={85} style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </BlurView>
      )}
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
  paymentDetails: {
    backgroundColor: Colors.gray,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.primary,
  },
  buttonContainer: {
    marginTop: 20,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: responsiveWidth(70),
    height: responsiveHeight(35),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
