import { useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useAppFocus = (onFocus: () => void) => {
  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        onFocus();
      }
    },
    [onFocus],
  );

  useEffect(() => {
    const sub = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      sub.remove();
    };
  }, [handleAppStateChange]);
};

export default useAppFocus;
