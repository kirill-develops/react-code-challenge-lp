import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setUni } from "./universitySlice";


// base server address variable for readability
const SERVER_URL = 'http://universities.hipolabs.com/';


// Axios request object for getting all posts
const getCountries = {
  baseURL: 'https://countriesnow.space/api/v0.1/countries',
  method: 'get',
  url: '/info?returns=none',
}

// Thunk function making Axios API REQ to Get All posts
export const fetchCountries = createAsyncThunk("university/fetchCountries", async () => {
    const response = await axios(getCountries)
  return response.data.data;
});


// Axios request object for getting all posts
const getUni = (country) =>({
  baseURL: SERVER_URL,
  method: 'get',
  url: `/search?country=${country}`,
})

// Thunk funkction making Axios API REQ to Get One post
export function fetchUniversity(search) {
  return function (dispatch) {
    if (search)
      axios(getUni(search))
        .then(({ data }) => dispatch(setUni(data)))
        .catch(({ response }) => dispatch(setUni(response.status)))
    else
      dispatch(setUni({}))
  }
};