// src/store/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // You can add more UI state here like:
  // modals, loading states, filters, etc.
  filters: {
    category: null,
    dateRange: null,
    status: "all",
  },
  modals: {
    createItem: false,
    editItem: false,
    createCategory: false,
    createLog: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Filters
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Modals
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modal) => {
        state.modals[modal] = false;
      });
    },
  },
});

export const {
  setFilter,
  clearFilters,
  openModal,
  closeModal,
  closeAllModals,
} = uiSlice.actions;

// Selectors
export const selectFilters = (state) => state.ui.filters;
export const selectModals = (state) => state.ui.modals;
export const selectIsModalOpen = (state, modalName) =>
  state.ui.modals[modalName];

export default uiSlice;
