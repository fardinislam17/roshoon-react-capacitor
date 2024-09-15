import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roshoonsApi = createApi({
  keepUnusedDataFor: import.meta.env.VITEST ? 0 : 60,

  tagTypes: [], // we will add all other api list here as tag
  baseQuery: fetchBaseQuery({
    baseUrl: `${window.location.origin.concat(import.meta.env.VITE_API_BASE_URL)}`,

    prepareHeaders: async (headers) => {
      if (import.meta.env.VITEST) {
        return headers;
      }

      const accessToken = "test-token";
      if (accessToken) {
        headers.set("ACCESS-TOKEN", accessToken);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getRoles: builder.query<string, void>({
      query: () => ({
        url: `${window.location.origin}/me/roles`,
      }),
    }),
  }),
});

export const { useGetRolesQuery } = roshoonsApi;
