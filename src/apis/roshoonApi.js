import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieByName } from 'src/utils';
import { ROSHOON_AUTH_TOKEN } from 'src/app/constants';
import { logout, setUser } from 'src/slices';

export const roshoonApi = createApi({
  keepUnusedDataFor: import.meta.env.VITEST ? 0 : 60,

  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: async (headers) => {
      if (import.meta.env.VITEST) {
        return headers;
      }
      const accessToken = getCookieByName(ROSHOON_AUTH_TOKEN);
      if (accessToken) {
        headers.set('ACCESS_TOKEN', accessToken);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    signInWithExistingCookie: builder.query({
      query: () => ({
        url: `auth/token-login`,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          sessionStorage.setItem('logout', 'false');
        } catch (err) {
          console.log(err.error);
        }
      },
    }),
    signInWithEmailAndPassword: builder.query({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: 'POST',
        body: { email, password },
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { user },
          } = await queryFulfilled;
          if (user) {
            dispatch(setUser({ ...user, loggedIn: true }));
          }
          sessionStorage.setItem('logout', 'false');
        } catch (err) {
          console.log(err.error);
        }
      },
    }),
    register: builder.query({
      query: ({ email, password, name, phone }) => ({
        url: `auth/register`,
        method: 'POST',
        body: { email, password, name, phone, roles: ['buyer'] },
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const {
            data: { user },
          } = await queryFulfilled;
          if (user) {
            dispatch(setUser({ ...user, loggedIn: true }));
          }
          sessionStorage.setItem('logout', 'false');
        } catch (err) {
          console.log(err.error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          sessionStorage.setItem('logout', 'true');
        } catch (err) {
          console.log(err.error);
        }
      },
    }),
  }),
});

export const {
  useSignInWithExistingCookieQuery,
  useLogoutMutation,
  endpoints: {
    signInWithEmailAndPassword: {
      useLazyQuery: useSignInWithEmailAndPasswordLazyQuery,
    },
    register: { useLazyQuery: useRegisterLazyQuery },
  },
} = roshoonApi;
