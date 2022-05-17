import { createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState();


function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: 'LIST' }]
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ""
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "https://jsonplaceholder.typicode.com/posts",
      transformResponse: responseData => {
        const resConvert = responseData.sort((a, b) => b.id - a.id)

        return postsAdapter.setAll(initialState, resConvert)
      },
      providesTags: (result) => providesList(result.ids, 'Post'),
    }),
    addOnePost: builder.mutation({
      query: (postData) => ({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: 'post',
        body: postData
      }),
      invalidatesTags: (_result, _error, arg) => [{type:'Post', id: arg.id}, { type: 'Post', id: 'LIST' }]
    }),
    editOnePost: builder.mutation({
      query: postData => ({
        url: `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
        method: 'put',
        body: postData
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    deleteOnePost: builder.mutation({
      query: postId => ({
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
        method: 'delete',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg }]
    })
  })
});

export const { useGetAllPostsQuery,
  useGetOnePostQuery,
  useAddOnePostMutation,
  useEditOnePostMutation,
  useDeleteOnePostMutation } = apiSlice;

export const { selectAll: getAllPosts, selectById: getPostById } = postsAdapter
  .getSelectors(state => {
    let newObj = {};

    if (Object.values(state.api.queries).length > 0) {
      for (const value of Object.values(state.api.queries)) { 
        if (value?.endpointName === 'getAllPosts'
          && value?.status === 'fulfilled') {
            newObj = value.data;
        }
      }
    }

    return !Object.values(newObj)[0] ? initialState : newObj;
  })