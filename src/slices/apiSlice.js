import { createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { retry } from '@reduxjs/toolkit/dist/query';

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState();

const staggeredBaseQuery = retry(
  async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({ baseUrl: '' })(
      args,
      api,
      extraOptions
    )

    // bail out of re-tries immediately if unauthorized,
    // because we know successive re-retries would be redundant
    if (result.error?.status === 401) {
      retry.fail(result.error)
    }

    return result
  },
  {
    maxRetries: 5,
  })

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
  baseQuery: staggeredBaseQuery,
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
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post', id: arg.id },
        { type: 'Post', id: 'LIST' }]
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
  useDeleteOnePostMutation,
  usePrefetch } = apiSlice;

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