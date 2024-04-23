import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthStackParams, Routes } from '~/navigation/routes';
import CodeScreen from '~/screens/Auth/screens/CodeScreen';
import NewPasswordScreen from '~/screens/Auth/screens/NewPasswordScreen';
import NewPasswordSuccessScreen from '~/screens/Auth/screens/NewPasswordSuccessScreen';
import PhoneScreen from '~/screens/Auth/screens/PhoneScreen';
import SignInScreen from '~/screens/Auth/screens/SignInScreen';
import SignUpScreen from '~/screens/Auth/screens/SignUpScreen';

const Stack = createNativeStackNavigator<AuthStackParams>();
const {
  SIGN_IN_SCREEN,
  SIGN_UP_SCREEN,
  PHONE_SCREEN,
  CODE_SCREEN,
  NEW_PASSWORD_SCREEN,
  NEW_PASSWORD_SUCCESS_SCREEN,
} = Routes;

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SIGN_IN_SCREEN} component={SignInScreen} />
      <Stack.Screen name={SIGN_UP_SCREEN} component={SignUpScreen} />
      <Stack.Screen name={PHONE_SCREEN} component={PhoneScreen} />
      <Stack.Screen name={CODE_SCREEN} component={CodeScreen} />
      <Stack.Screen name={NEW_PASSWORD_SCREEN} component={NewPasswordScreen} />
      <Stack.Screen name={NEW_PASSWORD_SUCCESS_SCREEN} component={NewPasswordSuccessScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
