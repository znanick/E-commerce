import { Dimensions } from 'react-native';
import { StyleConfigType } from './types';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const colors = {
  background: '#000000',
  primary: '#212121',
  secondary: '#424242',
  text: '#FFFFFF',
  textMinor: '#9E9E9E',
  textSecondary: '#E0E0E0',
  active: '#6B9DFE',
  activeBold: '#4785fe',
  border: '#616161',
  btnPrimaryBackground: '#FFFFFF',
  btnPrimaryDisabledBackground: '#9E9E9E',
  error: '#F14336',
  success: '#2E7D32',
  green: '#119D18',
  loader: '#FFFFFF',
  loaderDark: '#000000',
};

export const screenPadding = 10;

const styleConfig: StyleConfigType = { dark: { colors, windowWidth, windowHeight, screenPadding } };

export default styleConfig;
