import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface MainTextProps {
  text: string;
}

const MainText: React.FC<MainTextProps> = ({ text }) => {
  return (
    <View>
      <Text style={styles.boldText}>{text}</Text>
    </View>
  );
};

export default MainText;

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});
