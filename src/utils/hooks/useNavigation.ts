import { StackActions, useNavigation as useNavigationDefault } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Routes, StackParams } from '~/navigation/routes';

const useNavigation = () => {
  const {
    navigate,
    goBack: goBackDefault,
    reset: resetDefault,
    dispatch,
    canGoBack,
  } = useNavigationDefault<NativeStackNavigationProp<StackParams>>();

  const popToTop = () => {
    if (canGoBack()) dispatch(StackActions.popToTop());
  };

  const goBack = () => {
    goBackDefault();
  };

  const reset = <T extends Routes>(screen: T, params?: StackParams[T]) => {
    resetDefault({
      routes: [
        params
          ? {
              name: screen,
              params,
            }
          : { name: screen },
      ],
    });
  };

  return { navigate, goBack, reset, popToTop };
};

export default useNavigation;
