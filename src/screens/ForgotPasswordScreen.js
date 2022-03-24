import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import InputField from '../components/InputField';
import SimpleButton from '../components/SimpleButton';
import {AuthContext} from '../navigaion/AuthProvider';

const ForgotPasswordScreen = props => {
  const [email, setEmail] = useState('');

  const {forgotPswd} = useContext(AuthContext);

  const resetHandler = () => {
    forgotPswd(email);
    Alert.alert('Password Reset', 'Password Reset link has been sent!', [
      {
        text: 'OK',
        onPress: () => {
          props.navigation.navigate('SignIn');
        },
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <InputField
        iconName={'envelope-o'}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={data => setEmail(data)}
        inputValue={email}
      />

      <SimpleButton btnTitle={'Send'} onPress={resetHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;
