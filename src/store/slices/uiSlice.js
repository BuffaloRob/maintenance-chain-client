// src/store/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItemId: null,
  selectedCategoryId: null,
  selectedLogId: null,
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
    // Item selection
    selectItem: (state, action) => {
      state.selectedItemId = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItemId = null;
    },

    // Category selection
    selectCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategoryId = null;
    },

    // Log selection
    selectLog: (state, action) => {
      state.selectedLogId = action.payload;
    },
    clearSelectedLog: (state) => {
      state.selectedLogId = null;
    },

    // Clear all selections
    clearAllSelections: (state) => {
      state.selectedItemId = null;
      state.selectedCategoryId = null;
      state.selectedLogId = null;
    },

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
  selectItem,
  clearSelectedItem,
  selectCategory,
  clearSelectedCategory,
  selectLog,
  clearSelectedLog,
  clearAllSelections,
  setFilter,
  clearFilters,
  openModal,
  closeModal,
  closeAllModals,
} = uiSlice.actions;

// Selectors
export const selectSelectedItemId = (state) => state.ui.selectedItemId;
export const selectSelectedCategoryId = (state) => state.ui.selectedCategoryId;
export const selectSelectedLogId = (state) => state.ui.selectedLogId;
export const selectFilters = (state) => state.ui.filters;
export const selectModals = (state) => state.ui.modals;
export const selectIsModalOpen = (state, modalName) =>
  state.ui.modals[modalName];

export default uiSlice;
