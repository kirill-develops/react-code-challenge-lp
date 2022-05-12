import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";


const universityAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = universityAdapter.getInitialState();

export const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    setUni: (state, action) => {
      if (action.payload === 404)
        state.university.error = 'Error... Try refreshing page';
      else if (action.payload) {
        let universities;

        universities = action.payload.map(uni => ({
          ...uni,
          id: nanoid()
        }));

        universityAdapter.setAll(state, universities);
      }
    },
  }
});

export default universitySlice.reducer;

export const { setUni } = universitySlice.actions;

export const {selectAll: getAllUniversity } = universityAdapter.getSelectors(state => state.university)