import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainText from "../Custom/MainText";
import CarouselComponent from "./CarouselComponent";
import { details } from "@/data/data";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
  

const Carousel = () => {
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffledArray = [...array]; // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          // Swap elements in the array
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
      
  
  return (
    <View style={{ paddingHorizontal: responsiveWidth(5), marginBottom: responsiveHeight(7) }}>
      <View>
        <MainText text="Find Your Ideal Ride" />

        <CarouselComponent data={details} />
      </View>

      <View>
        <MainText text="Top Deals" />

        <CarouselComponent data={shuffleArray(details)} />
      </View>

      <View>
        <MainText text="Latest Fleets" />

        <CarouselComponent data={shuffleArray(details)} />
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({

});
