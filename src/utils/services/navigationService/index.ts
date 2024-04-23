import { NavigationContainerRef } from '@react-navigation/native';
import { Routes, StackParams } from '~/navigation/routes';

export class NavigationService {
  private navigationRef: NavigationContainerRef<StackParams> | null = null;

  setNavigationRef = (ref: NavigationContainerRef<any>) => {
    this.navigationRef = ref;
  };

  navigate = <RouteName extends Routes>(
    ...args: RouteName extends unknown
      ? undefined extends StackParams[RouteName]
        ? [screen: RouteName] | [screen: RouteName, params: StackParams[RouteName]]
        : [screen: RouteName, params: StackParams[RouteName]]
      : never
  ) => {
    this?.navigationRef?.navigate(...args);
  };

  goBack = () => {
    this?.navigationRef?.goBack();
  };

  reset = (screen: Routes) => {
    this?.navigationRef?.reset({
      routes: [
        {
          key: screen,
          name: screen,
        },
      ],
    });
  };
}

export const navigationService = new NavigationService();
