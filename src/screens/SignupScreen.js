import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input } from 'react-native-elements';

import Wrapper from '../components/Wrapper';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import useValidation from '../hooks/useValidation';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { signup, signinGoogle } = useContext(AuthContext);

  const [validateValues, renderErrorConditionally] = useValidation(
    {
      name,
      email,
      password,
      passwordConfirm,
    },
    signup
  );

  return (
    <Wrapper>
      <Text style={styles.heading}>Sign up Today</Text>
      <Spacer />
      <Input placeholder="Name" value={name} onChangeText={setName} />
      {renderErrorConditionally('name')}

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      {renderErrorConditionally('email')}

      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {renderErrorConditionally('password')}

      <Input
        placeholder="Confirm Password"
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />
      {renderErrorConditionally('passwordConfirm')}

      <Button title="Sign up" onPress={validateValues} />
      <Button provider="google" onPress={signinGoogle} />

      <Spacer />
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.buttonText}>
          If you've got an account, click here to sign in
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
  },
});

export default SignupScreen;
