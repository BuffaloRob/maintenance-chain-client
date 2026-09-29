// src/store/api/maintenanceApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL comes from REACT_APP_API_URL (e.g. http://localhost:3000/api/v1)
export const maintenanceApi = createApi({
  reducerPath: "maintenanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Accept", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Item", "Category", "Log", "User"],
  endpoints: (builder) => ({
    // Authentication (mirrors src/actions/authActions.js)
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: { user },
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: { user },
      }),
    }),
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    }),

    // Items
    getItems: builder.query({
      query: () => "/items",
      providesTags: ["Item"],
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
        method: "PUT",
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
        method: "PUT",
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
    createLog: builder.mutation({
      query: ({ itemId, categoryId, ...log }) => ({
        url: `/items/${itemId}/categories/${categoryId}/logs`,
        method: "POST",
        body: log,
      }),
      invalidatesTags: [{ type: "Log", id: "LIST" }, "Item"],
    }),
    updateLog: builder.mutation({
      query: ({ itemId, categoryId, id, ...patch }) => ({
        url: `/items/${itemId}/categories/${categoryId}/logs/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Log", id },
        { type: "Log", id: "LIST" },
        "Item",
      ],
    }),
    deleteLog: builder.mutation({
      query: ({ itemId, categoryId, id }) => ({
        url: `/items/${itemId}/categories/${categoryId}/logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Log", id: "LIST" }, "Item"],
    }),

    // Dashboard queries
    getPastDueItems: builder.query({
      query: () => "/past_due",
      providesTags: ["Item"],
    }),
    getUpcomingItems: builder.query({
      query: () => "/upcoming",
      providesTags: ["Item"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  // Auth
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,

  // Items
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,

  // Categories
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Logs
  useCreateLogMutation,
  useUpdateLogMutation,
  useDeleteLogMutation,

  // Dashboard
  useGetPastDueItemsQuery,
  useGetUpcomingItemsQuery,
} = maintenanceApi;
