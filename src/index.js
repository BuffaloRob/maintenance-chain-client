import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import history from './history';
import { Router } from 'react-router-dom'
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./components/App";
import rootReducer from './reducers'
import theme from './ui/theme';
import { Auth0Provider } from './react-auth0-wrapper'
import config from "./auth_config.json";

// TODO: 
  // *** Update Allowed callbacks, web origins, & logout URL's in auth0 application settings
  //*** Update client ID in auth0 connections for social logins
  // 1) If there are faults on server have them displayed on client instead of breaking app
  // 2) Create more robust authorization w/ OAuth
  // 3) Create predictive Due dates based on monthly mileage input
  // 4) Make due dates capable of create calendar events in google calendars
  // 5) Make a PWA

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
export const persistor = persistStore(store);

// uncomment to clear store, for dev purposes only
// persistor.purge();

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <Router history={history}>
          <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
          >
            <App />
          </Auth0Provider>
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
