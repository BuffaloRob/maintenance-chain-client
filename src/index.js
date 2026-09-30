import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import App from "./components/App";
import { store, persistor } from './store';
import theme from './ui/theme';

// TODO: 
  // 1) If there are faults on server have them displayed on client instead of breaking app
  // 2) Create more robust authorization w/ OAuth
  // 3) Create predictive Due dates based on monthly mileage input
  // 4) Make due dates capable of create calendar events in google calendars
  // 5) Make a PWA

// uncomment to clear store, for dev purposes only
// persistor.purge();

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme} >
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
