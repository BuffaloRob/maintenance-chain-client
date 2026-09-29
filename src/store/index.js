import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { maintenanceApi } from "./api/maintenanceApi";
import authSlice from "./slices/authSlice";
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
  // Legacy reducers for unmigrated domains (form)
  ...legacyReducers,
});

// Reset all state upon logout so persist doesn't keep data from a previous user
const rootReducer = (state, action) => {
  if (action.type === "CLEAR_DATA") {
    storage.removeItem("persist:root");
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

export const getRootState = () => store.getState();
export const getAppDispatch = () => store.dispatch;
