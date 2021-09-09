import React from 'react';
import { Text } from 'react-native-elements';
import { View, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
//
import Spacer from './Spacer';

const Button = (props) => {
  if (props.provider === 'google') {
    return (
      <>
        <Spacer />
        <Pressable {...props} style={styles.buttonGoogle}>
          <AntDesign
            name="google"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.button_text}>Log in with Google</Text>
        </Pressable>
      </>
    );
  }

  return (
    <>
      <Spacer />
      <Pressable {...props} style={styles.buttonCredentials}>
        <AntDesign
          name={props.iconName || 'user'}
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.button_text}>{props.title}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  buttonGoogle: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#1DC690',
    padding: 8,
    flexDirection: 'row',
  },
  buttonCredentials: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#1C4670',
    padding: 8,
    flexDirection: 'row',
  },
  button_text: {
    fontSize: 20,
    color: 'white',
  },
  icon: {
    marginRight: 10,
  },
});

export default Button;
