import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input } from 'react-native-elements';

import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import GoogleAuth from '../components/GoogleAuth';
import ErrorText from '../components/ErrorText';
import useValidation from '../hooks/useValidation';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { state, signin } = useContext(AuthContext);

  const [validateValues, renderErrorConditionally] = useValidation(
    {
      email,
      password,
    },
    () => signin({ email, password }, setError)
  );

  return (
    <Wrapper>
      <Text style={styles.heading}>Sign in</Text>
      <Spacer />

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      {renderErrorConditionally('email')}

      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {renderErrorConditionally('password')}

      <Button title="Sign in" onPress={validateValues} />
      <GoogleAuth />

      <ErrorText error={error} />

      <Spacer />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>
          If you've not got an account, click here to sign up
        </Text>
      </TouchableOpacity>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#1C4670',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default SigninScreen;
