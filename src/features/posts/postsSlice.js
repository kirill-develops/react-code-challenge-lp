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
    setPost: (state, action) => {
      if (action.payload === 404) {
        state.postById = 'No such Id';
      }
      state.postById = (action.payload);
    },
    setErr: (state, action) => {
      state.error = action.payload
    },
    postAdded: (state, action) => {
      state.posts.push(action.payload)
    },
    postEditted: (state, action) => {
      const { id, title, body } = action.payload;
      const exsistingPost = state.posts.find(post => post.id === id);

      if (exsistingPost) {
        exsistingPost.title = title;
        exsistingPost.body = body;
      }
    }
 },
 extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
export default postSlice.reducer;


export const { setPost, setErr, postAdded, postEditted } = postSlice.actions;


export const getAllPosts = state => state.posts.posts;
export const getOne = state => state.posts.postById;

// Alternative method not requested but optional for better performance. Trade
// off, server data may have already been deleted while client is interacting
// with state data.
export const getPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);