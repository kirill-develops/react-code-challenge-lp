import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query({
      query: () => ('https://countriesnow.space/api/v0.1/countries/info?returns=none'),
      transformResponse: resData => resData.data.sort((a, b) => a.name.localeCompare(b.name))
    })
  })
})

export const { useGetCountriesQuery } = extendedApiSlice;