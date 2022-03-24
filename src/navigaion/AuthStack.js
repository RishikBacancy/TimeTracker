<<<<<<< HEAD
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
=======
import React, {useEffect} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
>>>>>>> 4f64a821e86b1d5801cf9e4274ff84897d40d8b0

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1051065742352-ov5q8231cn349a7qnhnc4fqmqasbngeo.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SigninScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
};

<<<<<<< HEAD
export default AuthStack;
=======
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SigninScreen}/>
            <Stack.Screen name="SignUp" component={SignupScreen}/>
            <Stack.Screen name="Forgot" component={ForgotPasswordScreen}/>
        </Stack.Navigator>
    );
}

export default AuthStack;
>>>>>>> 4f64a821e86b1d5801cf9e4274ff84897d40d8b0
