import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { FriendsContextProvider } from './context/FriendsContext';
import { theme } from "./materialTheme";
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FriendsContextProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </FriendsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


/**
 * axios
 * sass
 * react-router-dom
 * material-ui icons
 * imagekitio-react
 * formik   --form handling
 * yup      --form validating
 * date-fns
 * emoji-picker-react
 */