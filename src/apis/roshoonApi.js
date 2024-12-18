import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieByName } from 'src/utils';
import { logout, setUser } from 'src/slices';
import { ROSHOON_ACCESS_TOKEN, ROSHOON_AUTH_TOKEN } from 'src/app/constants';

// Helper function to set the access token in local storage
const setAccessToken = (accessToken) => {
  if (accessToken) localStorage.setItem(ROSHOON_ACCESS_TOKEN, accessToken);
};

// Helper function to handle user data after a successful login/registration
const handleUserLogin = (dispatch, queryFulfilled) => {
  queryFulfilled
    .then(({ data: { accessToken, user } }) => {
      if (user) {
        dispatch(setUser({ ...user, loggedIn: true }));
      }
      setAccessToken(accessToken);
    })
    .catch((err) => console.error(err.error));
};

export const roshoonApi = createApi({
  keepUnusedDataFor: import.meta.env.VITEST ? 0 : 60,

  tagTypes: [],
  baseQuery: fetchBaseQuery({
    // baseUrl: `${import.meta.env.BASE_URL}api`,
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: async (headers, { endpoint }) => {
      if (endpoint === 'signInWithExistingCookie') {
        const authToken = getCookieByName(ROSHOON_AUTH_TOKEN);
        if (authToken) headers.set(ROSHOON_AUTH_TOKEN, authToken);
      }
      const accessToken = localStorage.getItem(ROSHOON_ACCESS_TOKEN);
      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    signInWithExistingCookie: builder.query({
      query: () => ({ url: 'auth/token-login', credentials: 'include' }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) =>
        handleUserLogin(dispatch, queryFulfilled),
    }),
    signInWithEmailAndPassword: builder.query({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
        credentials: 'include',
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) =>
        handleUserLogin(dispatch, queryFulfilled),
    }),
    register: builder.query({
      query: ({ email, firstName, lastName, password, phone }) => ({
        url: 'auth/register',
        method: 'POST',
        body: { email, password, firstName, lastName, phone },
        credentials: 'include',
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) =>
        handleUserLogin(dispatch, queryFulfilled),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
    loginWithGoogle: builder.mutation({
      query: ({ access_token }) => ({
        url: 'auth/google-login',
        method: 'POST',
        body: { access_token },
        credentials: 'include',
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) =>
        handleUserLogin(dispatch, queryFulfilled),
    }),
    userProfile: builder.query({
      query: () => ({ url: 'auth/profile', credentials: 'include' }),
    }),
    createVerificationSession: builder.mutation({
      query: () => ({
        url: 'identity/create-verification-session',
        method: 'POST',
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error('Error creating verification session:', err);
        }
      },
    }),
    chefRegister: builder.mutation({
      query: ({
        shopName,
        address,
        buildingNo,
        city,
        state,
        zipCode,
        ssn,
      }) => ({
        url: 'chef/register',
        method: 'POST',
        body: { shopName, address, buildingNo, city, state, zipCode, ssn },
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error('Chef registration error:', err);
        }
      },
    }),
    loginWithFacebook: builder.mutation({
      query: ({ access_token }) => ({
        url: `auth/facebook-login`,
        method: 'POST',
        body: { access_token },
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { accessToken, user },
          } = await queryFulfilled;
          if (user) {
            dispatch(setUser({ ...user, loggedIn: true }));
          }
          localStorage.setItem(ROSHOON_ACCESS_TOKEN, accessToken);
        } catch (err) {
          console.error(err.error);
        }
      },
    }),
    resetPasswordRequest: builder.mutation({
      query: ({ identifier }) => ({
        url: `auth/reset-password/request`,
        method: 'POST',
        body: { identifier },
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Reset Password Request Success:', data);
        } catch (err) {
          console.error('Reset Password Request Error:', err.error);
        }
      },
    }),
    resetPasswordVerify: builder.mutation({
      query: ({ identifier, otp }) => ({
        url: `auth/reset-password/verify-otp`,
        method: 'POST',
        body: { identifier, otp },
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Reset Password Request Success:', data);
        } catch (err) {
          console.error('Reset Password Request Error:', err.error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: ({ resetToken, newPassword, confirmPassword }) => ({
        url: `auth/reset-password/update`,
        method: 'POST',
        body: { resetToken, newPassword, confirmPassword },
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Reset Password Request Success:', data);
        } catch (err) {
          console.error('Reset Password Request Error:', err.error);
        }
      },
    }),
  }),
});

export const {
  useSignInWithExistingCookieQuery,
  useLogoutMutation,
  useLoginWithGoogleMutation,
  useCreateVerificationSessionMutation,
  useChefRegisterMutation,
  useUserProfileQuery,
  useLoginWithFacebookMutation,
  useResetPasswordRequestMutation,
  useResetPasswordVerifyMutation,
  useUpdatePasswordMutation,
  endpoints: {
    signInWithEmailAndPassword: {
      useLazyQuery: useSignInWithEmailAndPasswordLazyQuery,
    },
    register: { useLazyQuery: useRegisterLazyQuery },
  },
} = roshoonApi;
