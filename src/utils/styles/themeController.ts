import styleConfig from './themeConstants';
import { Theme } from './types';

export class ThemeController {
  private _theme: Theme = 'dark';

  public set theme(theme: Theme) {
    this._theme = theme;
  }

  public getStyleConfig = () => {
    return styleConfig[this._theme];
  };
}

export const themeController = new ThemeController();
