import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Button from '~/components/Button';
import Logo from '~/components/Logo';
import Text from '~/components/Text';
import Toast from '~/components/ToastMessage';
import TopBarModal from '~/components/TopBarModal';

import { AuthStackParams, Routes } from '~/navigation/routes';
import { setPswResetting } from '~/store/profile/profileReducer';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import { useAppDispatch } from '~/utils/hooks/store';
import useNavigation from '~/utils/hooks/useNavigation';
import useInputValue from '~/utils/hooks/useValue';
import createStyles from '~/utils/styles/createStyles';
import { useValidateSmsCode2FA, useValidateSmsCodeSignIn } from '../utils/mutations';
import { AuthErrorMessageType } from '../utils/types';

const CODE_LENGTH = 6;

const CodeScreen: React.FC<NativeStackScreenProps<AuthStackParams, Routes.CODE_SCREEN>> = ({
  route,
}) => {
  const { t } = useTranslation();
  const { goBack, navigate, reset } = useNavigation();
  const dispatch = useAppDispatch();
  const { verificationId, resetPassword, res, phone } = route.params;

  const [code, setCode, codeError, setCodeError] = useInputValue('');

  const ref = useBlurOnFulfill({ value: code, cellCount: CODE_LENGTH });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (resetPassword) dispatch(setPswResetting(true));
  }, []);

  const onError = (err: AuthErrorMessageType) => {
    Toast.show({ type: 'error', message: err.codeError });

    setCodeError(err.codeError);
  };

  const { mutate: validateCode, isPending: isCodeValidatePending } = useValidateSmsCode2FA({
    phoneNumber: phone,
    onSuccess: () => {
      Toast.show({ type: 'success', message: t('authMessages.codeSuccess') });

      reset(Routes.BOTTOM_TAB);
    },
    onError,
  });

  const { mutate: validateCodeSignIn, isPending: isCodeValidateSignInPending } =
    useValidateSmsCodeSignIn({
      onSuccess: () => {
        Toast.show({ type: 'success', message: t('authMessages.codeSuccess') });

        setTimeout(() => {
          navigate(Routes.NEW_PASSWORD_SCREEN);
        }, 1000);
      },
      onError,
    });

  const isPending = useMemo(
    () => isCodeValidatePending || isCodeValidateSignInPending,
    [isCodeValidatePending, isCodeValidateSignInPending],
  );

  const handleValidateCode = () => {
    if (resetPassword) {
      validateCodeSignIn({ fun: res!, code });
    } else {
      validateCode({ verificationId: verificationId!, code });
    }
  };

  const handleClose = () => {
    if (resetPassword) {
      dispatch(setPswResetting(false));
    }

    goBack();
  };

  return (
    <>
      <TopBarModal onClose={handleClose} />

      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.centerContainer}>
          <View style={styles.logo}>
            <Logo />
          </View>

          <Text style={styles.title}>{t('authCode.title')}</Text>

          <Text style={styles.text}>{t('authCode.text')}</Text>

          <Text style={styles.phoneText}>{phone}</Text>

          <CodeField
            ref={ref}
            {...props}
            autoFocus
            value={code}
            onChangeText={setCode}
            cellCount={CODE_LENGTH}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={[
                  styles.cell,
                  (!!symbol || isFocused) && styles.focusCell,
                  !!codeError && styles.errorCell,
                ]}
              >
                <Text
                  key={index}
                  style={[styles.cellText, !!codeError && styles.errorCellText]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : '')}
                </Text>
              </View>
            )}
          />

          <Button
            label={t('confirm')}
            style={styles.loginBtn}
            onPress={handleValidateCode}
            loading={isPending}
          />

          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.resendText}>{t('authCode.resend')}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = createStyles(({ colors, screenPadding }) => ({
  container: {
    flex: 1,
    paddingHorizontal: screenPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    position: 'absolute',
    top: '10%',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneText: {
    fontSize: 20,
    fontWeight: '500',
  },

  codeFieldRoot: {
    width: '100%',
    marginVertical: 30,
  },
  cell: {
    borderBottomWidth: 2,
    borderBottomColor: colors.textMinor,
    flex: 1,
    height: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderBottomColor: colors.text,
  },
  errorCell: {
    borderBottomColor: colors.error,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
  },
  errorCellText: {
    color: colors.error,
  },

  loginBtn: {
    width: '100%',
    marginVertical: 20,
  },

  resendText: {
    fontSize: 16,
    color: colors.active,
    marginTop: 10,
  },
  resendTextDisabled: {
    opacity: 0.6,
  },
}));

export default withScreenWrapper(CodeScreen);
