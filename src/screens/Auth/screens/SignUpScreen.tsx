import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Routes } from '~/navigation/routes';
import { PP_URL, TC_URL } from '~/utils/helpers/constants';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import useNavigation from '~/utils/hooks/useNavigation';
import useInputValue from '~/utils/hooks/useValue';
import createStyles from '~/utils/styles/createStyles';
import { validateSignUpFields } from '../utils/helpers';
import { useSignUp } from '../utils/mutations';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Logo from '~/components/Logo';
import Text from '~/components/Text';
import Toast from '~/components/ToastMessage';
import TouchableText from '~/components/TouchableText';

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  const [email, setEmail, emailError, setEmailError] = useInputValue('');
  const [name, setName, nameError] = useInputValue('');
  const [psw, setPsw, pswError, setPswError] = useInputValue('');
  const [repPsw, setRepPsw, repPswError, setRepPswError] = useInputValue('');

  const { mutate, isPending } = useSignUp({
    onSuccess: () => {
      Toast.show({ type: 'success', message: t('authMessages.success') });
    },
    onError: ({ emailError, pswError }) => {
      cleanSecuredField();
      setEmailError(emailError);
      setPswError(pswError);
    },
  });

  const handleSubmit = () => {
    const {
      psw: pswError,
      email: emailError,
      repPsw: repPswError,
    } = validateSignUpFields({ psw, email, repPsw });

    if (pswError || repPswError) cleanSecuredField();

    if (pswError || emailError || repPswError) {
      setEmailError(emailError);
      setPswError(pswError);
      setRepPswError(repPswError);
    } else {
      mutate({
        email: email,
        password: psw,
        fullName: name,
      });
    }
  };

  const cleanSecuredField = () => {
    setPsw('');
    setRepPsw('');
  };

  const handlePP = () => {
    navigate(Routes.WEB_VIEW_MODAL, { uri: PP_URL });
  };

  const handleTC = () => {
    navigate(Routes.WEB_VIEW_MODAL, { uri: TC_URL });
  };

  const handleSignIn = () => {
    navigate(Routes.SIGN_IN_SCREEN);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.centerContainer}>
        <ScrollView
          contentContainerStyle={styles.centerContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Logo style={styles.logo} />

          <Input
            style={styles.input}
            placeholder={t('email')}
            value={email}
            onChangeText={setEmail}
            error={emailError}
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <Input
            style={styles.input}
            placeholder={t('fullName')}
            value={name}
            onChangeText={setName}
            error={nameError}
            autoComplete="name"
            textContentType="name"
            maxLength={30}
          />

          <Input
            style={styles.input}
            placeholder={t('password')}
            value={psw}
            onChangeText={setPsw}
            error={pswError}
            autoComplete="new-password"
            textContentType="newPassword"
            secured
            autoCorrect={false}
            maxLength={20}
          />

          <Input
            style={styles.input}
            placeholder={t('repeatPassword')}
            value={repPsw}
            onChangeText={setRepPsw}
            error={repPswError}
            autoComplete="new-password"
            textContentType="newPassword"
            secured
            autoCorrect={false}
            maxLength={20}
          />

          <Button
            label={t('createAccount')}
            style={styles.registerBtn}
            onPress={handleSubmit}
            disabled={!email || !name || !psw}
            loading={isPending}
          />

          <Text style={styles.agreementTitle}>
            {t('agreementTitle1')}
            <Text style={[styles.agreementTitle, styles.agreementTitleLink]} onPress={handlePP}>
              {t('pp')}
            </Text>
            {t('agreementTitle2')}
            <Text style={[styles.agreementTitle, styles.agreementTitleLink]} onPress={handleTC}>
              {t('tc')}
            </Text>
            {t('agreementTitle3')}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.bottomContainer, { paddingBottom: bottom + 15 }]}>
        <Text>{t('alreadyHaveAccount')}</Text>

        <TouchableText onPress={handleSignIn}>{t('logIn')}</TouchableText>
      </View>
    </View>
  );
};

const styles = createStyles(({ colors, screenPadding }) => ({
  container: {
    flex: 1,
    paddingHorizontal: screenPadding,
  },

  centerContainer: {
    flex: 1,
  },
  centerContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 25,
  },
  textInput: {
    marginBottom: 20,
  },
  registerBtn: {
    width: '100%',
    marginVertical: 20,
  },
  agreementTitle: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
  agreementTitleLink: {
    color: colors.active,
  },

  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default withScreenWrapper(SignUpScreen, {
  withTopBar: true,
});
