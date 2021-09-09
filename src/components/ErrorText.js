import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorText = ({ error }) => {
  return <>{error && <Text style={styles.error}>{error}</Text>}</>;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 15,
    marginTop: 5,
  },
});

export default ErrorText;
