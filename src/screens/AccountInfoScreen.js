import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//
import { Context as AuthContext } from '../context/AuthContext';
import InfoBox from '../components/InfoBox';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';

const AccountInfoScreen = () => {
  const {
    state: { fullName },
    logout,
  } = useContext(AuthContext);

  return (
    <Wrapper>
      <View style={styles.container}>
        <View>
          <InfoBox text={`Hello, ${fullName}`} />
          <InfoBox text="You've got 15 USD" />
        </View>

        <Button title="Log out" onPress={logout} />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default AccountInfoScreen;
