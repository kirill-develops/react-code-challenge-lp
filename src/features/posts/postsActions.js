import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setErr, setPost } from "./postsSlice";

// base server address variable for readability
const SERVER_URL = 'https://jsonplaceholder.typicode.com/';

// Axios request object for getting all posts
const getAll = {
  baseURL: SERVER_URL,
  method: 'get',
  url: '/posts',
}

// Thunk function making Axios API REQ to Get All posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios(getAll)
  return response.data
});

// Axios request function returning details for specific post by provided id
const getOne = (id) => ({
  baseURL: SERVER_URL,
  method: 'get',
  url: `/posts/${id}`,
})

// Thunk funkction making Axios API REQ to Get One post
export function fetchPost(search) {
  return function (dispatch) {
    if (search)
    axios(getOne(search))
      .then(({ data }) => dispatch(setPost(data)))
      .catch(({response}) => dispatch(setPost(response.status)))
    else dispatch(setPost({}))
  }
};

// 
const addPostObj = (postData) => ({
  baseURL: SERVER_URL,
  method: 'post',
  url: '/posts',
  data: postData,
});


export function addPost(postData) {
  return function (dispatch) {
    if (String(postData.body)
      && String(postData.title)
      && Number(postData.userId))
      axios(addPostObj(postData))
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            dispatch(fetchPosts());
          } else {
            dispatch(setErr(res.status))
          }
        })
        .catch(({ res }) => dispatch(setErr(res.status)))
  };
};