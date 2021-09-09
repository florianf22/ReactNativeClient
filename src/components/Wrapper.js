import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

const Wrapper = ({ children }) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  return (
    <View style={styles.wrapper}>
      {children}
      {/* <Text
        // baseFontStyle={{ fontFamily: 'Roboto_400Regular' }}
        // ignoredStyles={['font-family', 'letter-spacing']}
        style={{ fontFamily: 'Roboto_400Regular', fontSize: 32 }}
      >
        Hello There, Friends
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    // justifyContent: 'center',
    // marginBottom: 200,
  },
});

export default Wrapper;
