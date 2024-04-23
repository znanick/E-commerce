import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LogoText from '~/assets/svg/LogoText';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Logo from '~/components/Logo';
import TouchableText from '~/components/TouchableText';
import { AuthStackParams, Routes } from '~/navigation/routes';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import { useStartGuide } from '~/utils/hooks/useGuide';
import useNavigation from '~/utils/hooks/useNavigation';
import useInputValue from '~/utils/hooks/useValue';
import createStyles from '~/utils/styles/createStyles';
import { useSignIn } from '../utils/mutations';

const SignInScreen: React.FC<
  NativeStackScreenProps<AuthStackParams, Routes.SIGN_IN_SCREEN>
> = () => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  const [email, setEmail, emailError, setEmailError] = useInputValue('');
  const [psw, setPsw, pswError, setPswError] = useInputValue('');

  const { mutate, isPending } = useSignIn({
    onError: ({ emailError, pswError }) => {
      setPsw('');
      setEmailError(emailError);
      setPswError(pswError);
    },
  });

  useStartGuide();

  const handleSubmit = () => {
    mutate({ email, password: psw });
  };

  const handleSignUp = () => {
    navigate(Routes.SIGN_UP_SCREEN);
  };

  const handleForgotPassword = () => {
    navigate(Routes.PHONE_SCREEN, { resetPassword: true });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView behavior="padding" style={styles.centerContainer}>
        <Logo />

        <Input
          style={styles.emailInput}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
          error={emailError}
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCorrect={false}
        />

        <Input
          placeholder={t('password')}
          value={psw}
          onChangeText={setPsw}
          error={pswError}
          autoComplete="password"
          textContentType="password"
          secured
          autoCorrect={false}
        />

        <Button
          label={t('login')}
          style={styles.loginBtn}
          onPress={handleSubmit}
          disabled={!email || !psw}
          loading={isPending}
        />

        <TouchableText textStyle={styles.activeText} onPress={handleForgotPassword}>
          {t('forgotPassword')}
        </TouchableText>
      </KeyboardAvoidingView>

      <View style={[styles.bottomContainer, { paddingBottom: bottom + 10 }]}>
        <Button
          label={t('createAccount')}
          style={styles.createBtn}
          theme="dark"
          onPress={handleSignUp}
        />

        <LogoText />
      </View>
    </ScrollView>
  );
};

const styles = createStyles(({ screenPadding }) => ({
  container: {
    flex: 1,
    paddingHorizontal: screenPadding,
  },

  centerContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  emailInput: {
    marginBottom: 25,
    marginTop: 30,
  },
  loginBtn: {
    width: '100%',
    marginVertical: 20,
  },
  activeText: {
    fontWeight: '400',
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

export default withScreenWrapper(SignInScreen);
