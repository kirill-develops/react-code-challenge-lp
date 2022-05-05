import axios from "axios";
import { setAllPost, setPost } from "./postsSlice";

// base server address variable for readability
const SERVER_URL = 'https://jsonplaceholder.typicode.com/';

// Axios request object for getting all posts
const getAll = {
  baseURL: SERVER_URL,
  method: 'get',
  url: '/posts',
}

// Thunk function making Axios API REQ to Get All posts
export function fetchPosts() {
  return function (dispatch) {
    axios(getAll)
      .then(({ data }) => dispatch(setAllPost(data)))
      .catch(err => dispatch(setAllPost(err)))
  }
}

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