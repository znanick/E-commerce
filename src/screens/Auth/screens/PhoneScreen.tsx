import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

import Button from '~/components/Button';
import Logo from '~/components/Logo';
import PhoneInput, { PhoneInputHandle } from '~/components/PhoneInput';
import Text from '~/components/Text';
import TopBar from '~/components/TopBar';
import TouchableText from '~/components/TouchableText';

import { AuthStackParams, Routes } from '~/navigation/routes';
import { logoutThunk } from '~/store/profile/profileThunks';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import { useAppDispatch } from '~/utils/hooks/store';
import useNavigation from '~/utils/hooks/useNavigation';
import useInputValue from '~/utils/hooks/useValue';
import createStyles from '~/utils/styles/createStyles';
import { getErrorText } from '../utils/helpers';
import { useGetSmsCode2FA, useGetSmsCodeSignIn } from '../utils/mutations';
import { AuthErrorMessageType } from '../utils/types';

const PhoneScreen: React.FC<NativeStackScreenProps<AuthStackParams, Routes.PHONE_SCREEN>> = ({
  route,
}) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

  const { resetPassword } = route.params || {};

  const [phone, setPhone, phoneError, setPhoneError, phoneRef] = useInputValue<PhoneInputHandle>(
   ''
  );

  const onError = (err: AuthErrorMessageType) => {
    setPhoneError(err.phoneError);
  };

  const { mutate: mutate2FA, isPending: is2FAPending } = useGetSmsCode2FA({
    onSuccess: ({ verificationId }) => {
      navigate(Routes.CODE_SCREEN, {
        verificationId,
        phone: phoneRef.current?.getInternationalNumber() || '',
        resetPassword,
      });
    },
    onError,
  });

  const { mutate: mutateSignIn, isPending: isSignInPending } = useGetSmsCodeSignIn({
    onSuccess: res => {
      navigate(Routes.CODE_SCREEN, {
        res,
        phone: phoneRef.current?.getInternationalNumber() || '',
        resetPassword,
      });
    },
    onError,
  });

  const handleSendCode = () => {
    if (phoneRef.current?.validate()) {
      getCode();
    } else {
      setPhoneError(getErrorText('auth/invalid-phone-number')?.phoneError || '');
    }
  };

  const getCode = () => {
    const formattedPhone = phoneRef.current?.getInternationalNumber().replaceAll(' ', '') || '';

    if (resetPassword) {
      mutateSignIn(formattedPhone);
    } else {
      mutate2FA(formattedPhone);
    }
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <View style={styles.container}>
      {resetPassword ? (
        <TopBar />
      ) : (
        <TouchableText onPress={handleLogout} style={styles.activeText}>
          {t('logout')}
        </TouchableText>
      )}

      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerStyle={styles.centerContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Logo />

          <Text style={styles.title}>
            {t(resetPassword ? 'authPhone.resetTitle' : 'authPhone.title')}
          </Text>

          <Text style={styles.text}>
            {t(resetPassword ? 'authPhone.resetText' : 'authPhone.text')}
          </Text>

          <PhoneInput
            ref={phoneRef}
            value={phone}
            onChangeText={setPhone}
            error={phoneError}
            autoCorrect={false}
            autoFocus
          />

          <Button
            label={t('verify')}
            style={styles.btn}
            onPress={handleSendCode}
            disabled={!phone}
            loading={is2FAPending || isSignInPending}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = createStyles(({ screenPadding }) => ({
  container: {
    flex: 1,
  },

  activeText: {
    marginLeft: screenPadding,
  },

  centerContainer: {
    width: '100%',
    paddingHorizontal: screenPadding,
    alignItems: 'center',
    paddingTop: '30%',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },

  emailInput: {
    marginBottom: 25,
    marginTop: 30,
  },
  btn: {
    width: '100%',
    marginTop: 30,
  },

  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
  createBtn: {
    width: '100%',
    marginBottom: 20,
  },
}));

export default withScreenWrapper(PhoneScreen);
