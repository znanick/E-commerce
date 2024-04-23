import Toast from 'react-native-toast-message';
import { toastConfig } from '~/components/ToastMessage';

const withToast = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    return (
      <>
        <WrappedComponent {...props} />

        <Toast config={toastConfig} />
      </>
    );
  };
};

export default withToast;
