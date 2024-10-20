import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/motorStore";
import Colors from "@/constants/Colors";
import LottieView from "lottie-react-native";
import { format } from "date-fns";
import { TouchableOpacity } from "react-native";
import { Href, useRouter } from "expo-router";
import { cars } from "@/data/data";
import { useFocusEffect } from "@react-navigation/native";
import { formatNumber } from "@/utils/formatNumber";
import { responsiveWidth } from "react-native-responsive-dimensions";

interface Rental {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  driverId: string | null;
}

const RentalItem = ({
  rental,
  onPress,
}: {
  rental: Rental;
  onPress: () => void;
}) => {
  const vehicle = cars.find((v) => v.id === rental.vehicleId);

  // Convert the image to a string if it's a number
  const imageUri = vehicle?.image ? vehicle.image : undefined;

  return (
    <TouchableOpacity style={styles.rentalItem} onPress={onPress}>
      <View style={styles.rentalContent}>
        {imageUri && (
          <View style={styles.imageBox}>
            <Image
              source={imageUri}
              style={styles.carImage}
              resizeMode="contain"
            />
          </View>
        )}
        <View style={styles.rentalInfo}>
          <Text style={styles.rentalTitle}>
            {vehicle ? vehicle.name : "Unknown Vehicle"}
          </Text>
          <Text style={styles.rentalTitleText}>Start Date: {format(new Date(rental.startDate), "PPP")}</Text>
          <Text style={styles.rentalTitleText}>End Date: {format(new Date(rental.endDate), "PPP")}</Text>
          <Text style={styles.rentalTitleText}>Total Amount: ₦{formatNumber(rental.totalAmount)}</Text>
          <Text style={styles.rentalTitleText}>Driver: {rental.driverId ? "Appointed" : "Self"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HistoryScreen() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchRentals();
    }, [])
  );

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("rentals")
        .select("*")
        .eq("userId", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRentals(data || []);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRentalPress = (rentalId: string) => {
    router.push(`/(authenticated)/history/${rentalId}` as Href);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (rentals.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <LottieView
            source={require("@/assets/animations/empty-box.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          <Text style={styles.noRentalsText}>No rentals yet</Text>
          <TouchableOpacity
            onPress={() => router.push("/(authenticated)/(tabs)/details")}
          >
            <Text style={styles.subText}>
              Book your first rental and start your adventure!
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rental History</Text>
      <FlatList
        data={rentals}
        renderItem={({ item }) => (
          <RentalItem
            rental={item}
            onPress={() => handleRentalPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  rentalItem: {
    backgroundColor: Colors.gray,
    borderRadius: 8,
    borderColor: Colors.primarySec,
    borderWidth: 0.3,
    padding: 16,
    marginBottom: 16,
  },
  rentalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.primary,
  },
  rentalTitleText: {
    fontSize: 16,
    paddingBottom: 5,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  noRentalsText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: Colors.primary,
  },
  subText: {
    fontSize: 16,
    color: "blue",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  rentalContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vehicleImage: {
    width: 40,
    height: "auto",
    borderRadius: 20,
    marginRight: 16,
  },
  rentalInfo: {
    flex: 1,
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  imageBox: {
    width: responsiveWidth(23),
    maxHeight: 85,
  },
});
