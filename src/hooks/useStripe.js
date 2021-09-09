import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { useConfirmPayment } from '@stripe/stripe-react-native';
//
import forumApi from '../api/forumApi';
import { Context as AuthContext } from '../context/AuthContext';

const PUBLISH_ARTICLE_FEE = 10; // 10 USD

const useStripe = (paymentError, paymentSuccess, navFunction) => {
  const [error, setError] = useState(null);
  const {
    state: { user },
  } = useContext(AuthContext);
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    const res = await forumApi.post('/api/v1/payments/createPaymentIntent', {
      payment_method_types: ['card'],
      currency: 'usd',
      amount: PUBLISH_ARTICLE_FEE,
    });

    const { clientSecret } = res.data;

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: { email: user.email },
    });

    if (error) {
      paymentError();
      setError(error.message);
    } else if (paymentIntent) {
      paymentSuccess();
      navFunction();
    }
  };

  return [handlePayPress, loading];
};

export default useStripe;
