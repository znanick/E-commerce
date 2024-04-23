import BottomSheetDefault, { BottomSheetProps, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import useNavigation from '~/utils/hooks/useNavigation';
import createStyles from '~/utils/styles/createStyles';

export type BottomSheetRef = {
  close(): void;
};

type Props = BottomSheetProps & {
  children: React.ReactNode;
  style?: any;
};

const BottomSheet = forwardRef<BottomSheetRef, Props>((props, propsRef) => {
  const { onChange, children, style } = props;

  const ref = useRef<BottomSheetDefault>(null);

  const { goBack } = useNavigation();

  const handleChangePosition = (index: number) => {
    if (index === -1) {
      goBack();
    }
    onChange?.(index);
  };

  useImperativeHandle(propsRef, () => ({
    close,
  }));

  const close = () => {
    ref.current?.close();
  };

  return (
    <View style={[StyleSheet.absoluteFill, styles.shadowContainer]}>
      <TouchableOpacity activeOpacity={1} style={styles.touchableBlock} onPress={close} />

      <BottomSheetDefault
        {...props}
        ref={ref}
        enablePanDownToClose
        onChange={handleChangePosition}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        backgroundStyle={styles.contentWrapper}
      >
        <BottomSheetView style={style}>{children}</BottomSheetView>
      </BottomSheetDefault>
    </View>
  );
});

const styles = createStyles(({ colors }) => ({
  shadowContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  touchableBlock: {
    flex: 1,
  },

  handleStyle: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 2,
    borderColor: colors.secondary,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.secondary,
    height: 4,
    width: 60,
    marginVertical: 5,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.primary,
  },
}));

export default memo(BottomSheet);
