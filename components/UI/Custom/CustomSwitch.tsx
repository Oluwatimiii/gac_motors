import React from 'react'
import { TouchableOpacity, StyleSheet, Animated } from 'react-native'
import Colors from '@/constants/Colors'

interface CustomSwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onValueChange }) => {
  const switchAnimation = React.useRef(new Animated.Value(value ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(switchAnimation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [value])

  const handlePress = () => {
    onValueChange(!value)
  }

  const backgroundColor = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D1D5DB', Colors.primary]
  })

  const circleTranslate = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20]
  })

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <Animated.View style={[styles.switch, { backgroundColor }]}>
        <Animated.View 
          style={[
            styles.circle,
            { transform: [{ translateX: circleTranslate }] }
          ]} 
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
})

export default CustomSwitch