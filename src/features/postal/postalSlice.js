import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  zip: '',
  error: null
}

export const postalSlice = createSlice({
  name: 'postal',
  initialState,
  reducers: {
    setZip: (state, action) => {
      const { search, data } = action.payload;

      if (search === 404) {
        state.error = action.payload.search;
      }
      else if (search === '' || data === []) {
        state.zip = action.payload.search;
        state.data = (action.payload.data);
        state.error = null;
      }
      else {
        state.zip = action.payload.search;
        state.data = (action.payload.data.places);
        state.error = null;
      }
    },
  },
});

export default postalSlice.reducer;

export const { setZip } = postalSlice.actions;

export const getAllData = state => state.postal.data;