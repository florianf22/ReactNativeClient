import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
//
import Button from './Button';
import useGoogleAuth from '../hooks/useGoogleAuth';
import { Context as AuthContext } from '../context/AuthContext';
import ErrorText from './ErrorText';

const GoogleAuth = () => {
  const { signinGoogle } = useContext(AuthContext);
  const [result, touched, signInWithGoogleAsync] = useGoogleAuth(signinGoogle);

  return (
    <View>
      <Button provider="google" onPress={signInWithGoogleAsync} />
      <ErrorText
        error={touched && 'Something went with google auth, try again please'}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default GoogleAuth;
