import React, { useContext, useState, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
//
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import AuthProvider, {
  Context as AuthContext,
} from './src/context/AuthContext';
import ArticleProvider from './src/context/ArticleContext';
import PaymentProvider from './src/context/PaymentContext';
import forumApi from './src/api/forumApi';

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');
  const {
    state: { token },
  } = useContext(AuthContext);

  const fetchPublishableKey = async () => {
    const { data } = await forumApi.get('/api/v1/payments/config');

    setPublishableKey(data.publishableKey);
  };

  useLayoutEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider publishableKey={publishableKey}>
      <NavigationContainer>
        {token && <MainNavigator />}
        {!token && <AuthNavigator />}
      </NavigationContainer>
    </StripeProvider>
  );
};

export default () => (
  <PaymentProvider>
    <AuthProvider>
      <ArticleProvider>
        <App />
      </ArticleProvider>
    </AuthProvider>
  </PaymentProvider>
);
