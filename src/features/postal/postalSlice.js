import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getZip: builder.query({
      query: zip => (`https://api.zippopotam.us/us/${zip}`)
    }),
  }),
});

export const { useGetZipQuery } = extendedApiSlice;