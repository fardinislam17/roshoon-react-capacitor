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
    getRoles: builder.query({
      query: () => ({
        url: `${window.location.origin}/me/roles`,
      }),
    }),
    signInWithEmailAndPassword: builder.query({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: 'POST',
        body: { email, password },
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  endpoints: {
    signInWithEmailAndPassword: {
      useLazyQuery: useSignInWithEmailAndPasswordLazyQuery,
    },
  },
} = roshoonApi;
