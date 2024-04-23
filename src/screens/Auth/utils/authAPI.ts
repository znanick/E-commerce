import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { baseApiClient, BaseClient } from '~/utils/API/baseClient';
import { SignInResponseType, SignInType, SignUpType } from './types';

interface AuthAPIInt {
  signIn(name: SignInType): Promise<SignInResponseType>;
  signUp(name: SignUpType): Promise<SignInType>;
  getSmsCode(number: string): Promise<FirebaseAuthTypes.PhoneAuthSnapshot>;
  verifyCode(arg: {
    verificationId: string | null;
    code: string;
  }): Promise<FirebaseAuthTypes.AuthCredential>;
}

export class AuthAPI implements AuthAPIInt {
  constructor(private api: BaseClient) {}

  signIn = async (data: SignInType) => {
    return (await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    )) as SignInResponseType;
  };

  signUp = async (data: SignUpType) => {
    await this.api.post(`/auth/sign-up`, data);

    return data;
  };

  changePassword = async (psw: string) => {
    if (auth().currentUser) await auth().currentUser?.updatePassword(psw);
    else throw new Error('No user');
  };

  getSmsCode = async (number: string) => {
    const result: FirebaseAuthTypes.PhoneAuthSnapshot = await auth().verifyPhoneNumber(number);

    return result;
  };

  signInWithSms = async (number: string) => {
    const result: FirebaseAuthTypes.ConfirmationResult = await auth().signInWithPhoneNumber(number);

    return result;
  };

  verifyCode = async ({
    verificationId,
    code,
  }: {
    verificationId: string | null;
    code: string;
  }) => {
    const result: FirebaseAuthTypes.AuthCredential = auth.PhoneAuthProvider.credential(
      verificationId,
      code,
    );

    await auth().currentUser?.linkWithCredential(result);

    return result;
  };
}

export const authAPI = new AuthAPI(baseApiClient);
