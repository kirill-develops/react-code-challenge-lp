import { createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


const universityAdapter = createEntityAdapter({})

const initialState = universityAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUni: builder.query({
      query: country => ({
        url: `http://universities.hipolabs.com/search?country=${country}`,
      }),
      transformResponse: responseData => {
        let resConvert = responseData.slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(each => {
            return { ...each, id: nanoid() }
          });
        return universityAdapter.setAll(initialState, resConvert)
      }
    }) 
  })
});

export const { useGetUniQuery } = extendedApiSlice;

export const { selectAll: getAllUniversity } = universityAdapter
  .getSelectors(state => {
  let newObj = {};

    for (const value of Object.values(state.api.queries)) { 
    if (value?.endpointName === 'getUni'
      && value?.status === 'fulfilled')
    {
      newObj = value.data;
    }
  }
  
    return !Object.values(newObj)[0] ? initialState : newObj;
})