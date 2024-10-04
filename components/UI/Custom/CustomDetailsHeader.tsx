import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors';
import { details, Details } from '@/data/data';
import { responsiveWidth } from 'react-native-responsive-dimensions';

interface CustomDetailsHeaderProps {
  id: string;
}

const CustomDetailsHeader: React.FC<CustomDetailsHeaderProps> = ({ id }) => {
  const router = useRouter()
  const vehicleDetails: Details | undefined = details.find(item => item.id === parseInt(id))
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {vehicleDetails && (
          <>
            <Text style={styles.title}>{vehicleDetails.name}</Text>
            <Text style={styles.subtitle}>{vehicleDetails.tag}</Text>
          </>
        )}
      </View>
    </View>
  )
}

export default CustomDetailsHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  backButton: {
    position: 'absolute',
    left: responsiveWidth(4),
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: "uppercase"
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    textTransform: "capitalize",
    paddingTop: 4
  },
})