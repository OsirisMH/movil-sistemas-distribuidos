import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Main from './src/main';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Main />
    </QueryClientProvider>
  );
};

export default App;
