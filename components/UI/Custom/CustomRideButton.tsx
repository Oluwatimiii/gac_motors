import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import Colors from '@/constants/Colors'

interface CustomRideButtonProps {
  onPress: () => void
  title: string
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

const CustomRideButton: React.FC<CustomRideButtonProps> = ({ onPress, title, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  disabledText: {
    color: '#9CA3AF',
  },
})

export default CustomRideButton