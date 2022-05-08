import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "./universityActions";

const initialState = {
  country: [],
  university: [],
  status: 'idle',
  error: null
};

export const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
     setUni: (state, action) => {
      if (action.payload === 404) {
        state.university.push('Error... Try refreshing page');
      }
      state.university = action.payload
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  },
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
  },

})
export default universitySlice.reducer;

export const { setUni } = universitySlice.actions;

export const getAllCountries = state => state.university.country;

export const getAllUniversity = state => state.university.university;