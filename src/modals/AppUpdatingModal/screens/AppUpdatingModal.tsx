import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Button from '~/components/Button';
import Text from '~/components/Text';

import { RootStackParams, Routes } from '~/navigation/routes';
import useNavigation from '~/utils/hooks/useNavigation';
import createStyles from '~/utils/styles/createStyles';

const AppUpdatingModal: React.FC<
  NativeStackScreenProps<RootStackParams, Routes.APP_UPDATING_MODAL>
> = ({ route }) => {
  const { ver, required, onClose } = route.params;
  const { t } = useTranslation();
  const { goBack } = useNavigation();

  const handleConfirm = () => {};

  const handleClose = () => {
    goBack();
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.windowWrapper}>
        <Text style={styles.title}>{t('appUpdating.title')}</Text>

        <Text style={styles.text}>{t('appUpdating.text', { ver })}</Text>

        <Button
          style={styles.btn}
          onPress={handleConfirm}
          label={t('appUpdating.update')}
          theme={!required ? 'light' : 'medium'}
        />

        {!required && (
          <Button style={styles.btn} onPress={handleClose} label={t('close')} theme="medium" />
        )}
      </View>
    </View>
  );
};

const styles = createStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  windowWrapper: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 200,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  btn: {
    width: '100%',
    marginTop: 10,
  },
}));

export default AppUpdatingModal;
