import { StyleSheet } from 'react-native';

import { ThemeStylesType } from './types';
import { themeController } from './themeController';

const createStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styleCreator: (arg: ThemeStylesType) => T | StyleSheet.NamedStyles<T>,
) => {
  return StyleSheet.create(styleCreator(themeController.getStyleConfig()));
};

export default createStyles;
