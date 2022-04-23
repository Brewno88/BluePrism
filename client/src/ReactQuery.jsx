import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

const ReactQuery = ({ children }) => {
  return (
    // Provide the client to children
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQuery;
