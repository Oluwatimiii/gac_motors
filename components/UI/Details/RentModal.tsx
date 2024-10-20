import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useRentStore } from '@/store/rentStore'
import Colors from '@/constants/Colors'
import CustomSwitch from '../Custom/CustomSwitch'
import CustomRideButton from '../Custom/CustomRideButton'

interface RentModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function RentModal({ isVisible, onClose, onConfirm }: RentModalProps) {
  const { startDate, endDate, isAppointedDriver, setStartDate, setEndDate, setIsAppointedDriver, } = useRentStore()

  const handleDayPress = (day: { dateString: string }) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(new Date(day.dateString))
      setEndDate(null)
    } else {
      setEndDate(new Date(day.dateString))
    }
  }

  const handleConfirm = () => {
    if (startDate && endDate) {
      onConfirm() 
    } else {
      alert('Please select both start and end dates to proceed.')
    }
  }

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <TouchableOpacity 
        style={styles.modalContainer} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          style={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Select Rental Dates</Text>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [startDate?.toISOString().split('T')[0] ?? '']: { selected: true, startingDay: true, color: Colors.primary },
              [endDate?.toISOString().split('T')[0] ?? '']: { selected: true, endingDay: true, color: Colors.primary },
            }}
            markingType={'period'}
          />
          <View style={styles.driverOption}>
            <Text>Appointed Driver (7% extra)</Text>
            <CustomSwitch
              value={isAppointedDriver}
              onValueChange={setIsAppointedDriver}
            />
          </View>
          <CustomRideButton title="Continue" onPress={handleConfirm} />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  driverOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  closeButton: {
    marginTop: 15,
    marginBottom: 9,
    alignItems: 'center',
  },
})
