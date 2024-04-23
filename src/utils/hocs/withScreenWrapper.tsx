import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TopBar, { TopBarProps } from '~/components/TopBar';
import TopBarModal from '~/components/TopBarModal';
import createStyles from '../styles/createStyles';

type ConfigType = { withTopBar?: boolean; topBarProps?: TopBarProps; withModalTopBar?: boolean };

function withScreenWrapper<T>(WrappedComponent: React.ComponentType<T>, config?: ConfigType) {
  return (props: any) => {
    const insets = useSafeAreaInsets();
    const statusBarHeight = insets.top;

    return (
      <View style={styles.container}>
        <View style={[styles.statusBar, { height: statusBarHeight }]} />

        {config?.withTopBar && (
          <TopBar {...config?.topBarProps} style={[styles.topBar, config?.topBarProps?.style]} />
        )}

        {config?.withModalTopBar && <TopBarModal {...config?.topBarProps} style={styles.topBar} />}

        <View style={styles.componentWrapper}>
          <WrappedComponent {...props} />
        </View>
      </View>
    );
  };
}

const styles = createStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  statusBar: {
    backgroundColor: colors.background,
  },
  topBar: {
    zIndex: 10,
  },
  componentWrapper: {
    flex: 1,
    zIndex: 1,
  },
}));

export default withScreenWrapper;
