import { AxiosResponse } from 'axios';
import { AUTH_ERRORS } from './constants';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type SignUpType = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type FirebaseErrorType = {
  code: keyof typeof AUTH_ERRORS;
};

export type SignInResponseType = FirebaseAuthTypes.UserCredential & {
  user: FirebaseAuthTypes.User & {
    refreshToken: string;
  };
};
export type SignUpResponseType = {
  id: string;
  idToken: string;
};

export type AuthErrorMessageType = {
  emailError: string;
  pswError: string;
  repPswError: string;
  codeError: string;
  phoneError: string;
};

export type SignUpErrorType = AxiosResponse<{ error: keyof typeof AUTH_ERRORS }>;
