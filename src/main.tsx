import axios from 'axios';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from 'src/app';
import { store, persistor } from 'src/store';

import { BASE_URL } from './utils/environments';
import addAuthTokenInterceptor from './lib/addAuthTokenInterceptor';

// Create a client
const queryClient = new QueryClient();

addAuthTokenInterceptor(store);

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
axios.defaults.baseURL = BASE_URL;

root.render(
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense>
              <App />
              <Toaster />
            </Suspense>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </PersistGate>
  </StoreProvider>
);
