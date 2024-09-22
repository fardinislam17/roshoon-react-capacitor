import { roshoonsApi } from "src/features/roshoon/roshoonsApi";
import { MostLovedChefs } from "./types";
const mostLovedChefsApi = roshoonsApi.injectEndpoints({
  endpoints: (builder) => ({
    getMostLovedChefs: builder.query<MostLovedChefs[], void>({
      query: () => "https://fakestoreapi.com/products",
      providesTags: ["MostLovedChefs"],
    }),
  }),
});

export const { useGetMostLovedChefsQuery } = mostLovedChefsApi;
