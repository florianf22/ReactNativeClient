import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//
import Spacer from './Spacer';

const InfoBox = ({ text }) => {
  return (
    <View>
      <Spacer />
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1DC690',
    padding: 10,
    borderRadius: 7,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default InfoBox;
