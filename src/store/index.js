import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { maintenanceApi } from "./api/maintenanceApi";
import authSlice, { loggedOut, setToken } from "./slices/authSlice";
import uiSlice from "./slices/uiSlice";

const persistConfig = {
  key: "root",
  storage,
  // Persist everything (auth, ui) except the RTK Query cache
  blacklist: [maintenanceApi.reducerPath],
  // v0: drop the `form` key persisted by the removed redux-form reducer
  version: 0,
  migrate: createMigrate({
    0: ({ form, ...state }) => state,
  }),
};

const appReducer = combineReducers({
  [maintenanceApi.reducerPath]: maintenanceApi.reducer,
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
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
