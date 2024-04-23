import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

import { RootStackParams, Routes } from '~/navigation/routes';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import createStyles from '~/utils/styles/createStyles';

import Loader from '~/components/Loader';

const WebViewModal: React.FC<NativeStackScreenProps<RootStackParams, Routes.WEB_VIEW_MODAL>> = ({
  route,
}) => {
  const source = useMemo(() => {
    return 'html' in route.params ? { html: route.params.html } : { uri: route.params.uri };
  }, []);

  return (
    <WebView
      style={styles.container}
      source={source}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.loaderWrapper}>
          <Loader size={200} />
        </View>
      )}
    />
  );
};

const styles = createStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderWrapper: { backgroundColor: colors.background, width: '100%', height: '100%' },
}));

export default withScreenWrapper(WebViewModal, {
  withModalTopBar: true,
});
