import { colors } from './themeConstants';

export type Theme = 'dark';

export type ThemeStylesType = {
  colors: typeof colors;
  screenPadding: number;
  windowWidth: number;
  windowHeight: number;
};

export type StyleConfigType = Record<Theme, ThemeStylesType>;
