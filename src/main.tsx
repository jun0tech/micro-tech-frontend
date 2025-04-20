import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';

import './index.css';
import App from './App.tsx';
import { Provider } from '#components/ui/provider.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

const GRAPHQL_ENDPOINT = import.meta.env.APP_GRAPHQL_ENDPOINT as string;

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider>
          <App />
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
