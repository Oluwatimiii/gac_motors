import { OnboardingType } from "@/data/data";
import React from "react";
import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type PaginatorProps = {
  data: OnboardingType[];
  scrollX: Animated.Value;
  index: any
};

const Paginator = ({ data, scrollX, index }: PaginatorProps) => {
  const filteredData = data.filter((item) => index === item.id - 1);
  const { width } = useWindowDimensions();
  
  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((item, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const starSize = scrollX.interpolate({
          inputRange,
          outputRange: [30, 60, 30],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        const color = index === i ? filteredData[0]?.color : "#fff";

        return (
          <Animated.View
            style={[styles.starContainer, { opacity }]}
            key={i.toString()}
          >
            <Animated.Text style={{ fontSize: starSize }}>
              <FontAwesome name="star" size={20} color={color} />
            </Animated.Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

export default Paginator;

const styles = StyleSheet.create({
  starContainer: {
    marginHorizontal: 8,
  },
});
