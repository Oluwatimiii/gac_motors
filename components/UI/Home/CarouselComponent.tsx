import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Car } from "@/data/data";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface CarouselComponentProps {
  data: Car[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ data }) => {
  const handlePress = (name: string) => {
    console.log("card clicked", name);
  };

  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id], // Toggle the favorite status
    }));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}
    >
      {data.map((item) => {
        const isFavorite = favorites[item.id];
        return (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => handlePress(item.name)}
          >
            <View style={styles.cardContainer}>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
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
                <Text style={styles.carPrice}>&#8358;{item.price}m</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  carousel: {
    marginVertical: 10,
  },
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
