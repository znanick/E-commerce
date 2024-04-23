import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import BottomSheet, { BottomSheetRef } from '~/components/BottomSheet';
import Button from '~/components/Button';
import Text from '~/components/Text';

import { RootStackParams, Routes } from '~/navigation/routes';
import useNavigation from '~/utils/hooks/useNavigation';
import createStyles from '~/utils/styles/createStyles';

const ConfirmationModal: React.FC<
  NativeStackScreenProps<RootStackParams, Routes.CONFIRMATION_MODAL>
> = ({ route }) => {
  const {
    cancelMessage,
    onCancel,
    confirmMessage,
    onConfirm,
    message,
    theme,
    withoutCancelBtn,
    withoutConfirmBtn,
  } = route.params;
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const { t } = useTranslation();

  const { goBack } = useNavigation();

  const snapPoints = useMemo(() => {
    const defaultHeight = 140;
    const additionalBtnHeight = withoutCancelBtn || withoutConfirmBtn ? 0 : 80;
    const messageHeight = message ? 40 : 0;

    return [defaultHeight + messageHeight + additionalBtnHeight];
  }, [withoutCancelBtn, message]);

  const handleConfirm = () => {
    goBack();
    onConfirm?.();
  };

  const handleCancel = () => {
    goBack();
    onCancel?.();
  };

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} style={styles.wrapper}>
      {!!message && <Text style={styles.message}>{message}</Text>}

      {!withoutConfirmBtn && (
        <Button
          style={[styles.btn, theme === 'remove' && styles.btnTransparent]}
          label={confirmMessage || t('confirm')}
          onPress={handleConfirm}
          theme={theme === 'remove' ? 'error' : 'light'}
        />
      )}

      {!withoutCancelBtn && (
        <Button
          style={[styles.btn, styles.btnTransparent]}
          label={cancelMessage || t('cancel')}
          onPress={handleCancel}
          theme="dark"
        />
      )}
    </BottomSheet>
  );
};

const styles = createStyles(({ screenPadding }) => ({
  wrapper: {
    paddingHorizontal: screenPadding,
    paddingBottom: 10,
    flex: 1,
  },
  message: {
    fontWeight: '400',
    lineHeight: 21,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },

  btn: {
    marginBottom: 15,
  },
  btnTransparent: {
    backgroundColor: 'transparent',
  },
}));

export default ConfirmationModal;
