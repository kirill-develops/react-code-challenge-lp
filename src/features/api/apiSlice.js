import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ""
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "https://jsonplaceholder.typicode.com/posts",
      providesTags: (result=[], _error, _arg) => ['Post', ...result.map(({id})=> ({type: 'Post', id}))]
    }),
    getOnePost: builder.query({
      query: (id) => `https://jsonplaceholder.typicode.com/posts/${id}`,
      providesTags: (_result, _error, arg) => [{type:'Post', id:arg}]
    }),
    addOnePost: builder.mutation({
      query: (postData) => ({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: 'post',
        body: postData
      }),
      invalidatesTags: ['Post']
    }),
    editOnePost: builder.mutation({
      query: postData => ({
        url: `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
        method: 'put',
        body: postData
      }),
      invalidatesTags: (_result, _error, arg) => [{type:'Post', id: arg.id}]
    }),
    deleteOnePost: builder.mutation({
      query: postId => ({
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
        method: 'delete',
      }),
      invalidatesTags: (_result, _error, arg) =>[{type:'Post', id: arg}]
    })
  })
});

export const { useGetAllPostsQuery,
  useGetOnePostQuery,
  useAddOnePostMutation,
  useEditOnePostMutation,
useDeleteOnePostMutation} = apiSlice;