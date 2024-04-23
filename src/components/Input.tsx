import React, { memo, useRef, useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

import SecureTextOffIcon from '~/assets/svg/SecureTextOffIcon';
import SecureTextOnIcon from '~/assets/svg/SecureTextOnIcon';
import Text from '~/components/Text';
import useTheme from '~/utils/hooks/useTheme';
import createStyles from '~/utils/styles/createStyles';

export type InputProps = TextInputProps & {
  style?: object;
  error?: string;
  secured?: boolean;
  inputRef?: React.RefObject<TextInput>;
  LeftComponent?: React.FC;
  withoutLabel?: boolean;
  Icon?: React.FC;
  onPress?: () => void;
};

const Input: React.FC<InputProps> = props => {
  const {
    placeholder,
    style,
    onFocus,
    onBlur,
    error,
    value,
    secured = false,
    inputRef,
    LeftComponent,
    withoutLabel,
    onPress,
    Icon,
  } = props;

  const ref = inputRef || useRef<TextInput>(null);

  const { colors } = useTheme();

  const [focused, setFocused] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(secured);

  const isActive = focused || !!value?.length;

  const handleAreaPress = () => {
    onPress?.();
    ref.current?.focus();
  };

  const handleFocus = (e: any) => {
    setFocused(true);

    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setFocused(false);

    onBlur?.(e);
  };

  const handleOnSecureChange = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <TouchableOpacity onPress={handleAreaPress} activeOpacity={1} style={[styles.container, style]}>
      <Text
        style={[
          styles.label,
          (!value?.length || withoutLabel) && styles.labelHide,
          !!error && styles.labelError,
        ]}
      >
        {placeholder}
      </Text>

      <View
        style={[
          styles.inputWrapper,
          isActive && styles.inputWrapperActive,
          !!error && styles.inputWrapperError,
        ]}
      >
        {!!LeftComponent && <LeftComponent />}

        <TextInput
          {...props}
          pointerEvents={props.editable ? 'auto' : 'none'}
          ref={ref}
          placeholderTextColor={colors.textMinor}
          style={styles.input}
          selectionColor={colors.text}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {secured && (
          <TouchableOpacity onPress={handleOnSecureChange} hitSlop={5}>
            {!secureTextEntry ? <SecureTextOnIcon /> : <SecureTextOffIcon />}
          </TouchableOpacity>
        )}

        {Icon && <Icon />}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </TouchableOpacity>
  );
};

const styles = createStyles(({ colors }) => ({
  container: {
    width: '100%',
  },

  label: {
    color: colors.textMinor,
    marginBottom: 8,
  },
  labelHide: {
    opacity: 0,
  },
  labelError: {
    color: colors.error,
  },

  inputWrapper: {
    borderBottomColor: colors.textMinor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },
  inputWrapperActive: {
    borderBottomColor: colors.text,
  },
  inputWrapperError: {
    borderBottomColor: colors.error,
  },
  input: {
    color: colors.text,
    fontFamily: 'Switzer-Regular',
    fontWeight: '600',
    fontSize: 17.6,
    flex: 1,
  },

  error: {
    marginTop: 8,
    marginBottom: 5,
    color: colors.error,
    lineHeight: 15,
  },
}));

export default memo(Input);
