import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsActions";


const initialState = {
  posts: [],
  postById: {},
  status: 'idle',
  error:null
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAllPost: (state, action) => {
      state.posts = (action.payload);
      state.status = 'succeeded'
    },
    setPost: (state, action) => {
      if (action.payload === 404) {
        state.postById = 'No such Id';
      }
      state.postById = (action.payload);
    },
 }
})
export default postSlice.reducer;


export const { setAllPost, setPost } = postSlice.actions;


export const getAllPosts = state => state.posts.posts;
export const getOne = state => state.posts.postById;

// Alternative method not requested but optional for better performance. Trade
// off, server data may have already been deleted while client is interacting
// with old data.
export const getPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);