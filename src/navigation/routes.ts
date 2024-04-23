import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigatorScreenParams} from '@react-navigation/native';

export enum Routes {

  AUTH = 'AUTH',
  SIGN_IN_SCREEN = 'SIGN_IN_SCREEN',
  SIGN_UP_SCREEN = 'SIGN_UP_SCREEN',
  PHONE_SCREEN = 'PHONE_SCREEN',
  CODE_SCREEN = 'CODE_SCREEN',
  NEW_PASSWORD_SCREEN = 'NEW_PASSWORD_SCREEN',
  NEW_PASSWORD_SUCCESS_SCREEN = 'NEW_PASSWORD_SUCCESS_SCREEN',

}

export type RootStackParams = ModalsStackParams & {
  [Routes.AUTH]: NavigatorScreenParams<AuthStackParams>;
};


export type AuthStackParams = {
  [Routes.SIGN_IN_SCREEN]: undefined;
  [Routes.SIGN_UP_SCREEN]: undefined;
  [Routes.NEW_PASSWORD_SCREEN]: undefined;
  [Routes.NEW_PASSWORD_SUCCESS_SCREEN]: undefined;
  [Routes.PHONE_SCREEN]: undefined | { resetPassword: boolean };
  [Routes.CODE_SCREEN]: {
    phone: string;
    verificationId?: string;
    res?: FirebaseAuthTypes.ConfirmationResult;
    resetPassword?: boolean;
  };
};

export type ModalsStackParams = {
  [Routes.WEB_VIEW_MODAL]: { uri: string } | { html: string };
}


export type StackParams = RootStackParams &
  AuthStackParams

