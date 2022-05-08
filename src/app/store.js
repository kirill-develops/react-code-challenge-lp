import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import universityReducer from '../features/university/universitySlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    university: universityReducer,
  },
})