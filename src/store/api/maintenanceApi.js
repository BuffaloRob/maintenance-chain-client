// src/store/api/maintenanceApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your API base URL
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const maintenanceApi = createApi({
  reducerPath: "maintenanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Include auth token in requests
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Item", "Category", "Log", "User"],
  endpoints: (builder) => ({
    // Authentication
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Items
    getItems: builder.query({
      query: () => "/items",
      providesTags: ["Item"],
    }),
    getItem: builder.query({
      query: (id) => `/items/${id}`,
      providesTags: (result, error, id) => [{ type: "Item", id }],
    }),
    createItem: builder.mutation({
      query: (newItem) => ({
        url: "/items",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Item", id }],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),

    // Categories
    getCategories: builder.query({
      query: (itemId) => `/items/${itemId}/categories`,
      providesTags: (result, error, itemId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Category", id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    createCategory: builder.mutation({
      query: ({ itemId, ...category }) => ({
        url: `/items/${itemId}/categories`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }, "Item"],
    }),
    updateCategory: builder.mutation({
      query: ({ itemId, id, ...patch }) => ({
        url: `/items/${itemId}/categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
        "Item",
      ],
    }),
    deleteCategory: builder.mutation({
      query: ({ itemId, id }) => ({
        url: `/items/${itemId}/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }, "Item"],
    }),

    // Logs
    getLogs: builder.query({
      query: (itemId) => `/items/${itemId}/logs`,
      providesTags: (result, error, itemId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Log", id })),
              { type: "Log", id: "LIST" },
            ]
          : [{ type: "Log", id: "LIST" }],
    }),
    createLog: builder.mutation({
      query: ({ itemId, ...log }) => ({
        url: `/items/${itemId}/logs`,
        method: "POST",
        body: log,
      }),
      invalidatesTags: [{ type: "Log", id: "LIST" }, "Item"],
    }),
    updateLog: builder.mutation({
      query: ({ itemId, id, ...patch }) => ({
        url: `/items/${itemId}/logs/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Log", id },
        { type: "Log", id: "LIST" },
        "Item",
      ],
    }),
    deleteLog: builder.mutation({
      query: ({ itemId, id }) => ({
        url: `/items/${itemId}/logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Log", id: "LIST" }, "Item"],
    }),

    // Dashboard queries
    getPastDueItems: builder.query({
      query: () => "/dashboard/past-due",
      providesTags: ["Item"],
    }),
    getUpcomingItems: builder.query({
      query: () => "/dashboard/upcoming",
      providesTags: ["Item"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Auth
  useLoginMutation,
  useRegisterMutation,

  // Items
  useGetItemsQuery,
  useGetItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,

  // Categories
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Logs
  useGetLogsQuery,
  useCreateLogMutation,
  useUpdateLogMutation,
  useDeleteLogMutation,

  // Dashboard
  useGetPastDueItemsQuery,
  useGetUpcomingItemsQuery,
} = maintenanceApi;
