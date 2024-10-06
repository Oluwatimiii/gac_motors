import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { details } from "@/data/data";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useUserStore } from "@/store/motorStore";
import { supabase } from "@/lib/supabase";

const CarouselComponentCard = ({ id }: { id: string }) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const item = useMemo(() => {
    return details.find((detail) => detail.id === id);
  }, [id]);

  if (!item) {
    return null;
  }

  const handlePress = () => {
    router.push(`(authenticated)/vehicle/${id}` as Href);
  };

  const checkFavoriteStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("userId", user.id)
        .eq("vehicleId", id)
        .maybeSingle();

      if (error) {
        console.error("Error checking favorite status:", error);
      }

      setIsFavorite(!!data);
    } catch (err) {
      console.error("Error checking favorite status:", err);
    }
  };

  const toggleFavorite = async () => {
    if (!user) return;

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("userId", user.id)
          .eq("vehicleId", id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ userId: user.id, vehicleId: id });

        if (error) throw error;
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>

        <Image
          source={item.image}
          style={styles.carImage}
          resizeMode="contain"
        />

        <View style={styles.descriptionContainer}>
          <Text style={styles.carName}>{item.name}</Text>
          <Text style={styles.carPrice}>
            &#8358;{item.price.toLocaleString()} per wk
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CarouselComponentCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: responsiveHeight(25),
    width: responsiveWidth(55),
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 0.3,
  },
  favoriteButton: {
    alignSelf: "flex-end",
  },
  carImage: {
    width: "100%",
    height: "50%",
  },
  descriptionContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
  },
  carPrice: {
    fontSize: 14,
    color: Colors.dark,
    marginTop: 4,
  },
});
