import { StripeProvider } from '@stripe/stripe-react-native';
import { APPLE_MERCHANT_ID, STRIPE_KEY } from '../helpers/constants';

const withStripe = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    return (
      <StripeProvider
        publishableKey={STRIPE_KEY}
        merchantIdentifier={APPLE_MERCHANT_ID}
      >
        <WrappedComponent {...props} />
      </StripeProvider>
    );
  };
};

export default withStripe;
