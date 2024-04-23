import React, { memo } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

import useTheme from '~/utils/hooks/useTheme';
import createStyles from '~/utils/styles/createStyles';

type Props = {
  size?: number | 'small' | 'large';
  style?: StyleProp<ViewStyle>;
  color?: string;
};

const Loader: React.FC<Props> = ({ style, size, color }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color || colors.loader} />
    </View>
  );
};

const styles = createStyles(() => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
}));

export default memo(Loader);
