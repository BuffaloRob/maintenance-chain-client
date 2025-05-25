import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";

import { maintenanceApi } from "./api/maintenanceApi";
import authSlice from "./slices/authSlice";
import uiSlice from "./slices/uiSlice";

const persistConfig = {
  key: "root",
  storage,
  // Only persist auth and UI state, not API data
  whitelist: ["auth", "ui"],
};

const rootReducer = combineReducers({
  [maintenanceApi.reducerPath]: maintenanceApi.reducer,
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(maintenanceApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
