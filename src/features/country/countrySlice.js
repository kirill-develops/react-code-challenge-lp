import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  country: [],
  status: 'idle',
  error: null
}

// Axios request object for getting all posts
const getCountries = {
  baseURL: 'https://countriesnow.space/api/v0.1/countries',
  method: 'get',
  url: '/info?returns=none',
}

// Thunk function making Axios API REQ to Get All posts
export const fetchCountries = createAsyncThunk("university/fetchCountries", async () => {
  const response = await axios(getCountries)
  return response.data.data;
});

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add fetched countries to the array
        state.country = action.payload
          .sort((a, b) => a.name.localeCompare(b.name))
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default countrySlice.reducer;

export const getAllCountries = state => state.country.country;