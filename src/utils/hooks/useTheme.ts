import { themeController } from '../styles/themeController';
import { ThemeStylesType } from '../styles/types';

const useTheme: () => ThemeStylesType = () => {
  return themeController.getStyleConfig();
};

export default useTheme;
