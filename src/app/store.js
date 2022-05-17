import { configureStore } from "@reduxjs/toolkit";

import countryReducer from '../features/country/countrySlice'
import { apiSlice } from "../features/api/apiSlice";

export default configureStore({
  reducer: {
    country: countryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
