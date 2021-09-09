import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import ChooseAuthorizeScreen from '../screens/ChooseAuthorizeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseAuthorizeScreen"
        component={ChooseAuthorizeScreen}
      />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
