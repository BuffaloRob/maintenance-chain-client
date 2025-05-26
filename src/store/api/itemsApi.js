// src/store/api/itemsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/", // Adjust based on your API base URL
  }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "items",
      providesTags: ["Item"],
    }),
    getItem: builder.query({
      query: (id) => `items/${id}`,
      providesTags: (result, error, id) => [{ type: "Item", id }],
    }),
    createItem: builder.mutation({
      query: (newItem) => ({
        url: "items",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `items/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Item", id }],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi;
