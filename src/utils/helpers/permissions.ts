import { PERMISSIONS, check, request } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

export const checkGeolocationPermission = () => check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

export const requestGeolocationPermission = () => request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

export const requestNotificationPermission = () => messaging().requestPermission();

export const checkNotificationPermission = () => messaging().hasPermission();
