import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

import { fetchPosts } from "./postsActions";

const postsAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.id - a.id
})

const initialState = postsAdapter.getInitialState({
  postById: {},
  status: 'idle',
  error:null
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action) => {
      if (action.payload === 404)
        state.postById = action.payload;
      else
      state.postById = action.payload;
    },
    setErr: (state, action) => {
      state.error = action.payload;
    },
    postAdded: (state, action) => {
      postsAdapter.addOne(state, action.payload);
    },
    postEditted: (state, action) => {
      const { id, title, body } = action.payload;

      if (state.postById.id === id) {
        state.postById.title = title;
        state.postById.body = body;
      }

      postsAdapter.updateOne(state, { id: id, changes: { title: title, body: body } });
    },
    postDeleted: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
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
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
});

export default postSlice.reducer;

export const { setPost, setErr, postAdded, postEditted, postDeleted } = postSlice.actions;

export const {selectAll: getAllPosts, selectById: getPostById} = postsAdapter.getSelectors(
   state => state.posts);

export const getOne = createSelector([state => state],
  state => state.posts.postById);
