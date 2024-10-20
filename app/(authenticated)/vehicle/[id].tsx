import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, StatusBar } from "react-native";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsiveWidth } from "react-native-responsive-dimensions";
import CustomDetailsHeader from "@/components/UI/Custom/CustomDetailsHeader";
import DetailsBox from "@/components/UI/Details/DetailsBox";
import { useRentStore } from "@/store/rentStore";
import RentModal from "@/components/UI/Details/RentModal";
import { drivers } from "@/data/data";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { setVehicleId, setDriverId, isAppointedDriver } = useRentStore();

  const handleRentNow = () => {
    setVehicleId(id);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleRentConfirm = () => {
    setIsModalVisible(false);

    if (isAppointedDriver) {
      const getRandomDriver = () => {
        if (drivers.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * drivers.length);
        return drivers[randomIndex];
      };

      const randomDriver = getRandomDriver();
      setDriverId(randomDriver?.id ?? "");
    } else {
      setDriverId("");
    }

    router.push("/(authenticated)/vehicle/order-confirmation");
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop }}>
      <StatusBar barStyle="dark-content" />
      <CustomDetailsHeader id={id} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingHorizontal: responsiveWidth(5),
        }}
      >
        <DetailsBox id={id} onRentNow={handleRentNow} />
      </ScrollView>

      <RentModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onConfirm={handleRentConfirm}
      />
    </SafeAreaView>
  );
};

export default Page;
