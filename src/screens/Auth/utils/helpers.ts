import { AUTH_ERRORS } from './constants';
import { AuthErrorMessageType } from './types';

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

type ValidateType = { psw: string; email?: string; repPsw: string };

export function validateSignUpFields({ email, psw, repPsw }: ValidateType) {
  const isEmailValid = emailRegExp.test(email || '');
  const isPswValid = psw.length >= 6;
  const isRepPswValid = isPswValid ? psw === repPsw : true;

  return {
    email: !isEmailValid ? getErrorText('auth/invalid-email')?.emailError : '',
    psw: !isPswValid ? getErrorText('password-rules')?.pswError : '',
    repPsw: !isRepPswValid ? getErrorText('repeat-password')?.repPswError : '',
  };
}

export function getErrorText(error: keyof typeof AUTH_ERRORS): AuthErrorMessageType {
  const { email, psw, code, phone, repPsw } = AUTH_ERRORS[error] || {};

  return {
    emailError: email || '',
    pswError: psw || '',
    repPswError: repPsw || '',
    codeError: code || '',
    phoneError: phone || '',
  };
}
