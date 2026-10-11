// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { maintenanceApi } from "../api/maintenanceApi";

// Single source of truth for auth. Persisted by redux-persist (see store/index.js).
const initialState = {
  token: null,
  currentUser: {},
  isAuthenticated: false,
};

const clearAuth = (state) => {
  state.token = null;
  state.currentUser = {};
  state.isAuthenticated = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload || null;
    },
    // Dispatching this resets the whole store (see rootReducer in store/index.js)
    loggedOut: clearAuth,
  },
  extraReducers: (builder) => {
    const { login, signup, googleLogin, resetPassword, getUser } = maintenanceApi.endpoints;
    builder
      .addMatcher(
        (action) =>
          login.matchFulfilled(action) ||
          signup.matchFulfilled(action) ||
          googleLogin.matchFulfilled(action) ||
          resetPassword.matchFulfilled(action),
        (state, { payload }) => {
          // A 200 response carrying `message` is a failure (legacy behavior)
          if (payload && payload.jwt && !payload.message) {
            state.token = payload.jwt;
            state.currentUser = payload.user || {};
            state.isAuthenticated = true;
          }
        }
      )
      .addMatcher(getUser.matchFulfilled, (state, { payload }) => {
        if (payload && payload.user && !payload.message) {
          state.currentUser = payload.user;
          state.isAuthenticated = true;
        } else {
          clearAuth(state);
        }
      })
      .addMatcher(getUser.matchRejected, (state, { payload }) => {
        // Token rejected by the server: drop the session
        if (payload && payload.status === 401) clearAuth(state);
      });
  },
});

export const { setToken, loggedOut } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice;
