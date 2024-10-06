import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Details } from "@/data/data";
import CarouselComponentCard from "./CarouselComponentCard";

interface CarouselComponentProps {
  data: Details[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ data }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}
    >
      {data.map((item) => {
        return <CarouselComponentCard key={item.id} id={item.id} />;
      })}
    </ScrollView>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  carousel: {
    marginVertical: 10,
  },
});
