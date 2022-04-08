import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
// import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
      '1051065742352-p07ennfm0bn22925s7qmij414m89ak91.apps.googleusercontent.com',
      webClientId:
        '1051065742352-ov5q8231cn349a7qnhnc4fqmqasbngeo.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SigninScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
