import { createSlice } from '@reduxjs/toolkit';
import { fetchZipCode } from './postalActions';

const initialState = {
  data: [],
  status: 'idle',
  error: null
}

export const postalSlice = createSlice({
  name: 'postal',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchZipCode.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(fetchZipCode.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add fetched countries to the array
        state.data = action.payload
      })
      .addCase(fetchZipCode.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
export default postalSlice.reducer;

export const { } = postalSlice.actions;

export const getAllData = state => state.postal.data;