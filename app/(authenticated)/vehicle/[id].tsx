import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import CustomDetailsHeader from '@/components/UI/Custom/CustomDetailsHeader'
import { useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DetailsBox from '@/components/UI/Details/DetailsBox'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { StatusBar } from 'react-native'

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  
  return (
    <SafeAreaView style={{ flex: 1, paddingTop }}>
      {/* Header with arrow back and vehicle details */}
      <StatusBar barStyle="dark-content" />
      <CustomDetailsHeader id={id} />

      {/*Vehicle Image and Specs*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingHorizontal: responsiveWidth(5)
        }}
      >
         <DetailsBox id={id} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({})