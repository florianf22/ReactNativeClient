import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import CreateArticleScreen from '../screens/CreateArticleScreen';
import StripeScreen from '../screens/StripeScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateArticle" component={CreateArticleScreen} />
      <Stack.Screen name="Stripe" component={StripeScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
