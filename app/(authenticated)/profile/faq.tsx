import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, LayoutAnimation,  } from "react-native";
import Colors from "@/constants/Colors";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, withTiming, Easing, useSharedValue, interpolate } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { UIManager } from "react-native";


// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How do I book a ride?",
    answer: "To book a ride, simply open the app, enter your destination, choose your preferred vehicle type, and confirm your booking. You'll receive a confirmation with your driver's details shortly after."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept various payment methods including credit/debit cards, PayPal, and in some regions, cash payments. You can manage your payment options in the app settings."
  },
  {
    question: "How can I contact my driver?",
    answer: "Once your ride is confirmed, you can contact your driver through the app. Just tap on the 'Contact Driver' button in your ride details to call or message them directly."
  },
  {
    question: "What if I need to cancel my ride?",
    answer: "You can cancel your ride anytime before the driver arrives. However, cancellation fees may apply depending on how close to the pickup time you cancel. Check our cancellation policy for more details."
  },
  {
    question: "Is it possible to schedule a ride in advance?",
    answer: "Yes, you can schedule a ride up to 7 days in advance. Just select the 'Schedule' option when booking your ride and choose your preferred date and time."
  },
  {
    question: "How do I report a lost item?",
    answer: "If you've lost an item during your ride, go to 'Your Trips' in the app, select the relevant trip, and choose 'Report lost item'. We'll help you get in touch with your driver to retrieve your belongings."
  }
]

const FAQItem: React.FC<{ item: FAQItem, isOpen: boolean, onToggle: () => void }> = ({ item, isOpen, onToggle }) => {
  const animationValue = useSharedValue(0)

  React.useEffect(() => {
    animationValue.value = withTiming(isOpen ? 1 : 0, { duration: 300 })
  }, [isOpen])

  const animatedStyles = useAnimatedStyle(() => {
    const maxHeight = interpolate(animationValue.value, [0, 1], [0, 1000])
    return {
      maxHeight,
      opacity: animationValue.value,
    }
  })

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${interpolate(animationValue.value, [0, 1], [0, 180])}deg` }],
    }
  })

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={onToggle} style={styles.questionContainer}>
        <Text style={styles.question}>{item.question}</Text>
        <Animated.View style={iconStyle}>
          <Ionicons name="chevron-down" size={24} color={Colors.primary} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.answerContainer, animatedStyles]}>
        <Text style={styles.answer}>{item.answer}</Text>
      </Animated.View>
    </View>
  )
}


const Page = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomProfileHeader text="FAQs" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80,
        }}
        style={styles.container}
      >
       <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={openItems[index] || false}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: Colors.gray,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: "black",
    flex: 1,
  },
  answerContainer: {
    overflow: 'hidden',
  },
  answer: {
    fontSize: 14,
    color: Colors.dark,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});
