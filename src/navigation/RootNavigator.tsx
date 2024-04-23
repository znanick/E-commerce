import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddressFormModal from '~/modals/GeolocationModals/screens/AddressFormModal';
import PreviewModal from '~/modals/PreviewModal/screens/PreviewModal';
import WebViewModal from '~/modals/WebViewModal/screens/WebViewModal';
import SplashScreen from '~/screens/SplashScreen/screens/SplashScreen';
import BottomTab from './BottomTab';
import {RootStackParams, Routes} from './routes';

const {
  SPLASH_SCREEN,
  BOTTOM_TAB,
  WEB_VIEW_MODAL,
  ADDRESS_FORM_MODAL,
  PREVIEW_MODAL,
} = Routes;

const Stack = createNativeStackNavigator<RootStackParams>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />

      <Stack.Screen name={BOTTOM_TAB} component={BottomTab} />

      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen name={WEB_VIEW_MODAL} component={WebViewModal} />
        <Stack.Screen name={PREVIEW_MODAL} component={PreviewModal} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      >
        <Stack.Screen name={ADDRESS_FORM_MODAL} component={AddressFormModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
