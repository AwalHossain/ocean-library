
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';



const cookie = Cookies.get('refreshToken')

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000/api/v1",
        credentials: "include",
        prepareHeaders: (headers, { }) => {
          // const token = cookie
          if (cookie) {
           // include token in req header
            headers.set('authorization', `${cookie}`)  
            return headers
          }
        }
      }),
     tagTypes: ["Books", "Book", "Reviews", "Wishlist", "finishedList","readingList"],
    endpoints:()=>({})
});