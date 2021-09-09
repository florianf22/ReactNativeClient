import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import ArticlesListScreen from '../screens/ArticlesListScreen';
import ArticleDetailsScreen from '../screens/ArticleDetailsScreen';

const Stack = createNativeStackNavigator();

const ArticleNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ArticlesList" component={ArticlesListScreen} />
      <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ArticleNavigator;
