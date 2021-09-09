import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
//
import Wrapper from '../components/Wrapper';
import Button from '../components/Button';
import useStripe from '../hooks/useStripe';
import { Context as PaymentContext } from '../context/PaymentContext';

const StripeScreen = ({ navigation }) => {
  const { paymentSuccess, paymentError } = useContext(PaymentContext);
  const [handlePayPress, loading] = useStripe(
    paymentError,
    paymentSuccess,
    () => navigation.navigate('CreateArticle')
  );

  return (
    <Wrapper>
      <CardField
        style={styles.cardField}
        cardStyle={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 8,
        }}
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
      />

      <Button
        title="Pay and publish"
        iconName="pay-circle1"
        onPress={handlePayPress}
        disabled={loading}
      />
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
});

export default StripeScreen;
