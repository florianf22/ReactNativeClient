import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
//
import Wrapper from '../components/Wrapper';
import Button from '../components/Button';
import GoogleAuth from '../components/GoogleAuth';
import { Context as AuthContext } from '../context/AuthContext';

const ChooseAuthorizeScreen = ({ navigation }) => {
  const { signinGoogle } = useContext(AuthContext);

  return (
    <Wrapper>
      <Text style={styles.heading}>Choose a method to authorize</Text>
      <GoogleAuth />
      <Button
        title="Log in with your credentials"
        onPress={() => navigation.navigate('Signup')}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default ChooseAuthorizeScreen;
