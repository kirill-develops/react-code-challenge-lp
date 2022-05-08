import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// base server address variable for readability
const SERVER_URL = 'https://api.zippopotam.us/us';


  // Axios request object for getting all posts
  const getZipCode = (zipCode) =>({
    baseURL: SERVER_URL,
    method: 'get',
    url: `/${zipCode}`,
  })

// Thunk function making Axios API REQ to Get All based on ZipCode parameter
export const fetchZipCode = createAsyncThunk("postal/fetchZipCode", async (zipCode) => {
    const response = await axios(getZipCode(zipCode))
  return response.data;
  });