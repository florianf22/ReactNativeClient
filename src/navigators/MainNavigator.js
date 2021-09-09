import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//
import AccountInfoScreen from '../screens/AccountInfoScreen';
import ArticleNavigator from './ArticleNavigator';
import PaymentNavigator from './PaymentNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Article" component={ArticleNavigator} />
      <Tab.Screen name="ArticlePayment" component={PaymentNavigator} />
      <Tab.Screen name="AccountInfo" component={AccountInfoScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
