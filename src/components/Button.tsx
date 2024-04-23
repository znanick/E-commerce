import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from '~/components/Text';
import Loader from './Loader';

import { hexToRgb } from '~/utils/helpers/styleHelpers';
import useTheme from '~/utils/hooks/useTheme';
import createStyles from '~/utils/styles/createStyles';

export type ButtonProps = {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  style?: object;
  theme?: 'dark' | 'light' | 'medium' | 'error';
  onPress?: () => any;
  LeftComponent?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  label,
  style,
  theme = 'light',
  onPress,
  disabled,
  loading,
  LeftComponent,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        theme === 'dark' && styles.containerDark,
        theme === 'medium' && styles.containerMedium,
        theme === 'error' && styles.containerError,
        disabled && theme === 'light' && styles.containerDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader color={theme === 'dark' ? undefined : colors.loaderDark} />
      ) : (
        <View style={styles.contentWrapper}>
          {LeftComponent && <View style={styles.leftComponentWrapper}>{LeftComponent}</View>}

          <Text
            style={[
              styles.label,
              theme === 'dark' && styles.darkLabel,
              theme === 'medium' && styles.mediumLabel,
              theme === 'error' && styles.errorLabel,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = createStyles(({ colors }) => ({
  container: {
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.btnPrimaryBackground,
  },
  containerDark: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
  },
  containerMedium: {
    backgroundColor: colors.secondary,
    borderColor: hexToRgb(colors.text, 0.1),
    borderWidth: 1,
  },
  containerError: {
    backgroundColor: 'transparent',
    borderColor: hexToRgb(colors.error, 0.45),
    borderWidth: 1,
  },
  containerDisabled: {
    backgroundColor: colors.btnPrimaryDisabledBackground,
  },

  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftComponentWrapper: { marginRight: 5 },
  darkLoader: {
    color: colors.background,
  },
  label: {
    color: colors.background,
    fontWeight: '600',
  },
  darkLabel: {
    color: colors.text,
  },
  mediumLabel: {
    color: colors.text,
  },
  errorLabel: {
    color: colors.error,
  },
}));

export default memo(Button);
