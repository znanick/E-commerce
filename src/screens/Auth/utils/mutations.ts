import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { patchProfileThunk } from '~/store/profile/profileThunks';
import { showDefaultError } from '~/utils/helpers/errorUtils';
import { useAppDispatch, useAppSelector } from '~/utils/hooks/store';
import { useMutation } from '~/utils/hooks/useQuery';
import { authAPI } from './authAPI';
import { getErrorText } from './helpers';
import {
  AuthErrorMessageType,
  FirebaseErrorType,
  SignInResponseType,
  SignInType,
  SignUpErrorType,
  SignUpType,
} from './types';
import { useAuth } from '~/utils/hooks/useAuth';

type SignInHookType = {
  onSuccess?: () => void;
  onError?: (data: AuthErrorMessageType) => void;
};

export const useSignIn = ({ onSuccess, onError }: SignInHookType) => {
  const { isLoading } = useAppSelector(state => state.profile);

  const { auth } = useAuth();

  const { mutate, isPending, isSuccess } = useMutation<
    SignInResponseType,
    FirebaseErrorType,
    SignInType
  >({
    mutationFn: authAPI.signIn,
    onSuccess: async () => {
      await auth();

      onSuccess?.();
    },
    onError: error => {
      console.warn(error);

      const res = getErrorText(error.code);

      if (!res.emailError && !res.pswError) showDefaultError();

      onError?.(res);
    },
  });

  return { mutate, isPending: isLoading || isPending, isSuccess };
};

type SignUpHookType = {
  onSuccess: () => void;
  onError: (data: AuthErrorMessageType) => void;
};

export const useSignUp = ({ onSuccess, onError }: SignUpHookType) => {
  const { mutate: mutateSignIn, isPending: isSignInPending } = useSignIn({ onSuccess });

  const { mutate, isPending } = useMutation<SignInType, SignUpErrorType, SignUpType>({
    mutationFn: authAPI.signUp,
    onSuccess: data => {
      mutateSignIn(data);
    },
    onError: error => {
      const res = getErrorText(error.data.error);

      if (!res.emailError && !res.pswError) showDefaultError();

      onError(res);
    },
  });

  return { mutate, isPending: isSignInPending || isPending };
};

type GetSms2FAHookType = {
  onSuccess?: (arg: FirebaseAuthTypes.PhoneAuthSnapshot) => void;
  onError?: (data: AuthErrorMessageType) => void;
};

export const useGetSmsCode2FA = ({ onSuccess, onError }: GetSms2FAHookType) => {
  const { mutate, isPending } = useMutation<
    FirebaseAuthTypes.PhoneAuthSnapshot,
    FirebaseErrorType,
    string
  >({
    mutationFn: authAPI.getSmsCode,
    onSuccess,
    onError: error => {
      console.warn(error);

      const res = getErrorText(error?.code);

      if (!res.phoneError) showDefaultError();

      onError?.(res);
    },
  });

  return { mutate, isPending };
};

type ValidateSmsCodeHookType2FA = {
  onSuccess: () => void;
  onError: (data: AuthErrorMessageType) => void;
  phoneNumber: string;
};

export const useValidateSmsCode2FA = ({
  onSuccess,
  onError,
  phoneNumber,
}: ValidateSmsCodeHookType2FA) => {
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation<
    FirebaseAuthTypes.AuthCredential,
    FirebaseErrorType,
    { verificationId: string; code: string }
  >({
    mutationFn: authAPI.verifyCode,
    onSuccess: async () => {
      await dispatch(patchProfileThunk({ phoneNumber }));
      onSuccess();
    },
    onError: error => {
      console.warn(error);

      const res = getErrorText(error.code);

      if (!res.codeError) showDefaultError();

      onError(res);
    },
  });

  return { mutate, isPending };
};

type GetSmsCodeSignInHookType = {
  onSuccess: (res: FirebaseAuthTypes.ConfirmationResult) => void;
  onError: (res: AuthErrorMessageType) => void;
};

export const useGetSmsCodeSignIn = ({ onSuccess, onError }: GetSmsCodeSignInHookType) => {
  const { mutate, isPending } = useMutation<
    FirebaseAuthTypes.ConfirmationResult,
    FirebaseErrorType,
    string
  >({
    mutationFn: authAPI.signInWithSms,
    onSuccess,
    onError: error => {
      console.warn(error);

      const res = getErrorText(error?.code);

      if (!res.phoneError) showDefaultError();

      onError?.(res);
    },
  });

  return { mutate, isPending };
};

type ValidateSmsCodeSignInHookType = {
  onSuccess: () => void;
  onError: (data: AuthErrorMessageType) => void;
};

export const useValidateSmsCodeSignIn = ({ onSuccess, onError }: ValidateSmsCodeSignInHookType) => {
  const { mutate, isPending } = useMutation<
    FirebaseAuthTypes.UserCredential | null,
    FirebaseErrorType,
    { fun: FirebaseAuthTypes.ConfirmationResult; code: string }
  >({
    mutationFn: ({ fun, code }) => {
      return fun.confirm(code);
    },
    onSuccess,
    onError: error => {
      console.warn(error);

      const res = getErrorText(error.code);

      if (!res.codeError) showDefaultError();

      onError(res);
    },
  });

  return { mutate, isPending };
};

type ChangePasswordHookType = {
  onSuccess: () => void;
  onError: (data: AuthErrorMessageType) => void;
};

export const useChangePassword = ({ onSuccess, onError }: ChangePasswordHookType) => {
  const { mutate, isPending } = useMutation<void, SignUpErrorType, string>({
    mutationFn: authAPI.changePassword,
    onSuccess,
    onError: error => {
      console.warn(error);

      const res = getErrorText(error?.data?.error);

      if (!res.pswError) showDefaultError();

      onError(res);
    },
  });

  return { mutate, isPending };
};
