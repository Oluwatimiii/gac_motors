import React from "react"
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { details, Details } from "@/data/data"
import { responsiveHeight } from "react-native-responsive-dimensions"
import { LinearGradient } from "expo-linear-gradient"
import MainText from "../Custom/MainText"
import Colors from "@/constants/Colors"

interface CustomDetailsBoxProps {
  id: string
  onRentNow: () => void
}

const DetailsBox: React.FC<CustomDetailsBoxProps> = ({ id, onRentNow }) => {
  const vehicleDetails: Details | undefined = details.find(
    (item) => item.id === id
  )

  return (
    <View>
      <View style={styles.imageBox}>
        <Image
          source={vehicleDetails?.image}
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>

      <LinearGradient
        colors={["#CC2936", "#66151B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.specsContainer}>
          <View style={styles.specColumn}>
            <Text style={styles.specText}>{vehicleDetails?.specs.spec1}</Text>
            <Text style={styles.specText}>{vehicleDetails?.specs.spec2}</Text>
          </View>
          <View style={[styles.specColumn, styles.borderLeft]}>
            <Text style={styles.specText}>{vehicleDetails?.specs.spec3}</Text>
            <Text style={styles.specText}>{vehicleDetails?.specs.spec4}</Text>
          </View>
          <View style={[styles.specColumn, styles.borderLeft]}>
            <Text style={styles.specText}>{vehicleDetails?.specs.spec5}</Text>
            <Text style={styles.specText}>{vehicleDetails?.specs.spec6}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ marginTop: 20 }}>
        <MainText text="Car Info" />

        <View style={styles.rentBox}>
          <Text style={styles.priceText}>
            ₦{vehicleDetails ? Math.floor(vehicleDetails.price / 7).toLocaleString() : 0}/day
          </Text>
          
          <View style={styles.specGrid}>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>{vehicleDetails?.moreSpecs.spec1}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>{vehicleDetails?.moreSpecs.spec2}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>{vehicleDetails?.moreSpecs.spec3}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>{vehicleDetails?.moreSpecs.spec4}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.rentButton} onPress={onRentNow}>
            <Text style={styles.rentButtonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>
      </View>   
    </View>
  )
}

export default DetailsBox

const styles = StyleSheet.create({
  carImage: {
    width: "100%",
    height: "100%",
  },
  imageBox: {
    maxHeight: responsiveHeight(20),
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    borderRadius: 17,
    width: "100%",
    padding: 16,
    marginTop: 26
  },
  specsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  specColumn: {
    flex: 1,
    alignItems: "center",
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255, 255, 255, 0.3)",
  },
  specText: {
    color: "white",
    marginVertical: 4,
  },
  rentBox: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 26,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 25,
  },
  specItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.3,
    borderColor: Colors.primary,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specLabel: {
    fontSize: 12,
    color: '#666',
  },
  specValue: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
  rentButton: {
    backgroundColor: '#CC2936',
    borderRadius: 13,
    padding: 15,
    alignItems: 'center',
  },
  rentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
