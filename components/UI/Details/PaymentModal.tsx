import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useRentStore } from '@/store/rentStore'
import Colors from '@/constants/Colors'
import CustomSwitch from '../Custom/CustomSwitch'
import CustomRideButton from '../Custom/CustomRideButton'

interface PaymentModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function PaymentModal({ isVisible, onClose, onConfirm }: PaymentModalProps) {
  const handleConfirm = () => {
      onConfirm()
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
          <Text style={styles.modalTitle}>Successfully Paid</Text>
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