import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Details } from "@/data/data";
import { Href, useRouter } from "expo-router";
import { responsiveWidth } from "react-native-responsive-dimensions";

interface DataProps {
  data: Details;
}

const DetailsCard: React.FC<DataProps> = ({ data }) => {
  const router = useRouter();
  const handlePress = (id: string) => {
    router.push(`(authenticated)/vehicle/${id}` as Href);
  };

  return (
    <TouchableWithoutFeedback onPress={() => handlePress(data.id)}>
      <View style={styles.card}>
        {/* Text Column */}
        <View>
          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.type}>{data.type}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              &#8358;{data.price.toLocaleString()} only
            </Text>
            <Text style={styles.discount}>10% Discount available</Text>
          </View>
        </View>

        {/* Image Box */}
        <View style={styles.imageBox}>
          <Image
            source={data.image}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 16,
    borderTopColor: "white",
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    marginTop: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 14,
    marginBottom: 6,
  },
  discount: {
    fontSize: 12,
    paddingBottom: 8,
    color: "#28a745",
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  imageBox: {
    width: responsiveWidth(40),
    maxHeight: 105,
  },
});
