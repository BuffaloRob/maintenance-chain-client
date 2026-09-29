import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { maintenanceApi } from "./api/maintenanceApi";
import authSlice, { loggedOut, setToken } from "./slices/authSlice";
import uiSlice from "./slices/uiSlice";
import legacyReducers from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  // Persist everything (auth, ui, legacy reducers) except the RTK Query cache
  blacklist: [maintenanceApi.reducerPath],
};

const appReducer = combineReducers({
  [maintenanceApi.reducerPath]: maintenanceApi.reducer,
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  // Legacy redux-form reducer
  ...legacyReducers,
});

// Reset all state upon logout so persist doesn't keep data from a previous user
const rootReducer = (state, action) => {
  if (action.type === loggedOut.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// getDefaultMiddleware includes redux-thunk, so legacy thunk actions still work
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(maintenanceApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Enable refetchOnFocus / refetchOnReconnect behavior
setupListeners(store.dispatch);

export const persistor = persistStore(store);

// One-time migration: users logged in before auth moved into redux-persist have
// their token only in localStorage.jwt. Adopt it once, then remove the key.
const unsubscribeMigration = persistor.subscribe(() => {
  if (!persistor.getState().bootstrapped) return;
  unsubscribeMigration();
  try {
    const legacyToken = localStorage.getItem("jwt");
    if (legacyToken && legacyToken !== "undefined" && legacyToken !== "null" && !store.getState().auth.token) {
      store.dispatch(setToken(legacyToken));
    }
    localStorage.removeItem("jwt");
  } catch (e) {
    // localStorage unavailable
  }
});

export const getRootState = () => store.getState();
export const getAppDispatch = () => store.dispatch;
