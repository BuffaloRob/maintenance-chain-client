// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  LOGOUT,
} from "../../actions/types";

// Lazy initial state so a reset (CLEAR_DATA) re-reads localStorage, which
// legacy logout clears. The state shape keeps the legacy reducer's fields
// (currentUser, isAuthenticated) so unmigrated components keep working.
const getInitialState = () => {
  let token = null;
  try {
    token = localStorage.getItem("jwt");
  } catch (e) {
    // localStorage unavailable
  }
  return {
    token: token && token !== "undefined" ? token : null,
    currentUser: {},
    isAuthenticated: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState,
  reducers: {
    // Legacy thunks still write localStorage.jwt themselves; this mirrors the
    // token into state (used by RTK Query prepareHeaders).
    setToken: (state, action) => {
      state.token = action.payload || null;
    },
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = user;
      state.isAuthenticated = true;
      if (token) {
        state.token = token;
        try {
          localStorage.setItem("jwt", token);
        } catch (e) {}
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AUTHENTICATION_SUCCESS, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(AUTHENTICATION_FAILURE, (state) => {
        state.currentUser = {};
        state.isAuthenticated = false;
      })
      .addCase(LOGOUT, (state) => {
        state.currentUser = {};
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { setToken, setCredentials } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice;
