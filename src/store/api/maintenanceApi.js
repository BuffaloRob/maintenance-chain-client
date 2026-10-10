// src/store/api/maintenanceApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const receiptsUrl = ({ itemId, categoryId, logId }) =>
  `/items/${itemId}/categories/${categoryId}/logs/${logId}/receipts`;

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
  tagTypes: ["Item", "Category", "Log", "Receipt", "User"],
  endpoints: (builder) => ({
    // Authentication (credentials are stored by authSlice's extraReducers)
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
    // The ID token from Google's sign-in button (see components/GoogleSignIn.js)
    googleLogin: builder.mutation({
      query: (credential) => ({
        url: "/auth/google",
        method: "POST",
        body: { credential },
      }),
    }),
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({ url: "/logout", method: "POST" }),
    }),

    // Email verification: the token comes from the link in the email
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: "/verify_email",
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["User"],
    }),
    resendVerificationEmail: builder.mutation({
      query: () => ({ url: "/resend_verification_email", method: "POST" }),
    }),

    // Password reset: the token comes from the link in the email. Resetting
    // logs the user in (see authSlice)
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot_password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password, password_confirmation }) => ({
        url: "/reset_password",
        method: "POST",
        body: { token, password, password_confirmation },
      }),
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
      invalidatesTags: ["Item"],
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

    // Receipts: photos attached to a log, each listed as { id, log_id, content_type }
    getReceipts: builder.query({
      query: receiptsUrl,
      providesTags: (result, error, { logId }) => [{ type: "Receipt", id: logId }],
    }),
    // A receipt's image, as an object URL for an <img> (whose own request
    // couldn't send the token). Revoked once the cache entry is dropped.
    getReceiptImage: builder.query({
      query: ({ id, ...log }) => ({
        url: `${receiptsUrl(log)}/${id}`,
        responseHandler: async (response) =>
          response.ok ? URL.createObjectURL(await response.blob()) : response.json().catch(() => null),
      }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          const { data } = await cacheDataLoaded;
          await cacheEntryRemoved;
          URL.revokeObjectURL(data);
        } catch (err) {
          // removed before the image loaded
        }
      },
    }),
    // photo is a Blob, sent as the body with its image type
    uploadReceipt: builder.mutation({
      query: ({ photo, ...log }) => ({
        url: receiptsUrl(log),
        method: "POST",
        headers: { "Content-Type": photo.type },
        body: photo,
      }),
      invalidatesTags: (result, error, { logId }) => [{ type: "Receipt", id: logId }],
    }),
    deleteReceipt: builder.mutation({
      query: ({ id, ...log }) => ({
        url: `${receiptsUrl(log)}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { logId }) => [{ type: "Receipt", id: logId }],
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
  useGoogleLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

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

  // Receipts
  useGetReceiptsQuery,
  useGetReceiptImageQuery,
  useUploadReceiptMutation,
  useDeleteReceiptMutation,

  // Dashboard
  useGetPastDueItemsQuery,
  useGetUpcomingItemsQuery,
} = maintenanceApi;
