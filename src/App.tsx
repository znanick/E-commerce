import '~/utils/localisation';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { toastConfig } from './components/ToastMessage';
import RootNavigator from './navigation/RootNavigator';
import { store } from './store/store';
import withQuery from './utils/hocs/withQuery';
import withStripe from './utils/hocs/withStripe';
import { navigationService } from './utils/services/navigationService';
import {LINKING_CONFIG} from "~/navigation/linking";

const gestureStyle = { flex: 1 };
function App() {
  return (
    <GestureHandlerRootView style={gestureStyle}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer linking={LINKING_CONFIG} ref={navigationService.setNavigationRef}>
            <StatusBar barStyle="light-content" />

            <RootNavigator />
          </NavigationContainer>

          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default withStripe(withQuery(App));
