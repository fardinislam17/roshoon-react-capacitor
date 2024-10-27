import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieByName } from 'src/utils';

export const roshoonApi = createApi({
  keepUnusedDataFor: import.meta.env.VITEST ? 0 : 60,

  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: async (headers) => {
      if (import.meta.env.VITEST) {
        return headers;
      }
      const accessToken = getCookieByName('roshoon_auth_token');
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
    }),
    signInWithEmailAndPassword: builder.query({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.query({
      query: ({ email, password, name }) => ({
        url: `auth/register`,
        method: 'POST',
        body: { email, password, name, roles: ['buyer'] },
      }),
    }),
  }),
});

export const {
  useSignInWithExistingCookieQuery,
  endpoints: {
    signInWithEmailAndPassword: {
      useLazyQuery: useSignInWithEmailAndPasswordLazyQuery,
    },
    register: { useLazyQuery: useRegisterLazyQuery },
  },
} = roshoonApi;
