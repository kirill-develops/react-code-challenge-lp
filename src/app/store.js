import { configureStore } from "@reduxjs/toolkit";

import universityReducer from '../features/university/universitySlice';
import postalReducer from '../features/postal/postalSlice';
import countryReducer from '../features/country/countrySlice'
import { apiSlice } from "../features/api/apiSlice";

export default configureStore({
  reducer: {
    university: universityReducer,
    postal: postalReducer,
    country: countryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
