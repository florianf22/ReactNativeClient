import React, { useState } from 'react';
import * as Google from 'expo-google-app-auth';

const useGoogleAuth = (callback) => {
  const [result, setResult] = useState(undefined);
  const [touched, setTouched] = useState(false);

  const signInWithGoogleAsync = async () => {
    try {
      setTouched(false);

      const response = await Google.logInAsync({
        androidClientId:
          '10618832347-s4afquj9l6esqtnpno5d9eddblafd4m0.apps.googleusercontent.com',
        iosClientId:
          '10618832347-1ch6jr6rntv55cjoffn4tiodfrv2jl78.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (response.type === 'success') {
        callback(
          response.accessToken,
          response.user.name,
          response.user.email,
          response.user.photoUrl
        );
        return setResult(response.accessToken);
      } else {
        setTouched(true);
        return setResult(undefined);
      }
    } catch (e) {
      setTouched(true);
      return setResult(undefined);
    }
  };

  return [result, touched, signInWithGoogleAsync];
};

export default useGoogleAuth;
