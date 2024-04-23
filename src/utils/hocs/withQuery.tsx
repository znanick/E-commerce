import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const withQuery = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    );
  };
};

export default withQuery;
