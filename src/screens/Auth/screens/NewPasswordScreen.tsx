import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

import { Routes } from '~/navigation/routes';
import { logoutThunk } from '~/store/profile/profileThunks';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import { useAppDispatch } from '~/utils/hooks/store';
import useNavigation from '~/utils/hooks/useNavigation';
import useInputValue from '~/utils/hooks/useValue';
import createStyles from '~/utils/styles/createStyles';
import { validateSignUpFields } from '../utils/helpers';
import { useChangePassword } from '../utils/mutations';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Text from '~/components/Text';
import TopBarModal from '~/components/TopBarModal';

const NewPasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const [psw, setPsw, pswError, setPswError] = useInputValue('');
  const [repPsw, setRepPsw, repPswError, setRepPswError] = useInputValue('');

  const { mutate, isPending } = useChangePassword({
    onSuccess: () => {
      navigate(Routes.NEW_PASSWORD_SUCCESS_SCREEN);
    },
    onError: ({ pswError }) => {
      cleanSecuredField();
      setPswError(pswError);
    },
  });

  const handleSubmit = () => {
    const { psw: pswError, repPsw: repPswError } = validateSignUpFields({ psw, repPsw });

    if (pswError || repPswError) cleanSecuredField();

    if (pswError || repPswError) {
      setPswError(pswError);
      setRepPswError(repPswError);
    } else {
      mutate(psw);
    }
  };

  const cleanSecuredField = () => {
    setPsw('');
    setRepPsw('');
  };

  const handleClose = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      <TopBarModal onClose={handleClose} />

      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.centerContainer}>
          <ScrollView contentContainerStyle={styles.centerContentContainer}>
            <Text>{t('auth.newPassword')}</Text>

            <Input
              style={styles.input}
              placeholder={t('password')}
              value={psw}
              onChangeText={setPsw}
              error={pswError}
              autoComplete={'new-password'}
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
              autoComplete={'new-password'}
              secured
              autoCorrect={false}
              maxLength={20}
            />

            <Button
              label={t('auth.changePassword')}
              style={styles.registerBtn}
              onPress={handleSubmit}
              disabled={!repPsw || !psw}
              loading={isPending}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = createStyles(({ screenPadding }) => ({
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

  input: {
    marginBottom: 25,
  },

  registerBtn: {
    width: '100%',
    marginVertical: 20,
  },
}));

export default withScreenWrapper(NewPasswordScreen);
