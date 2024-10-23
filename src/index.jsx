import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SnackbarProvider from './features/snackbarProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.roshoon';

if (import.meta.env.DEV) {
  const { enableMockApi } = await import('./mock/mockApi');
  await enableMockApi();
}
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <SnackbarProvider>
                <App />
              </SnackbarProvider>
            </GoogleOAuthProvider>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
