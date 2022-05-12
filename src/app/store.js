import { configureStore } from "@reduxjs/toolkit";

import postsReducer from '../features/posts/postsSlice';
import universityReducer from '../features/university/universitySlice';
import postalReducer from '../features/postal/postalSlice';
import countryReducer from '../features/country/countrySlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    university: universityReducer,
    postal: postalReducer,
    country: countryReducer
  },
});
