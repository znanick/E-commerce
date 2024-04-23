import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Button from '~/components/Button';
import Text from '~/components/Text';

import ChangePasswordSuccessIcon from '~/assets/svg/ChangePasswordSuccessIcon';
import { setPswResetting } from '~/store/profile/profileReducer';
import { logoutThunk } from '~/store/profile/profileThunks';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import { useAppDispatch } from '~/utils/hooks/store';
import createStyles from '~/utils/styles/createStyles';

const NewPasswordSuccessScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setPswResetting(false));
    dispatch(logoutThunk());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.successTitle')}</Text>

      <ChangePasswordSuccessIcon />

      <Text style={styles.subtitle}>{t('auth.successSubtitle')}</Text>

      <Text style={styles.text}>{t('auth.successText')}</Text>

      <Button label={t('login')} style={styles.btn} onPress={handleSubmit} />
    </View>
  );
};

const styles = createStyles(({ screenPadding }) => ({
  container: {
    flex: 1,
    paddingHorizontal: screenPadding,
    alignItems: 'center',
  },

  title: {
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 40,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 28,
  },

  btn: {
    width: '100%',
  },
}));

export default withScreenWrapper(NewPasswordSuccessScreen);
