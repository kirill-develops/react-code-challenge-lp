import axios from "axios";

import { setZip } from "./postalSlice";


// base server address variable for readability
const SERVER_URL = 'https://api.zippopotam.us/us';


// Axios request object for getting all posts
const getZipCode = (zipCode) =>({
  baseURL: SERVER_URL,
  method: 'get',
  url: `/${zipCode}`,
})

// Thunk funkction making Axios API REQ to Get One post
export function fetchZipCode(search) {
  return function (dispatch) {
    if (search.length === 5) 
      axios(getZipCode(search))
        .then(({ data }) => {
          const dataObj = { search: search, data: data };
          dispatch(setZip(dataObj));
        })
        .catch(({ response }) => { dispatch(setZip({ search: response.status })) })
    else if (search.length === 0)
      dispatch(setZip({ search: "", data: [] }))
  }
};