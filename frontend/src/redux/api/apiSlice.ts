
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';



const cookie = Cookies.get('refreshToken')

const BASE_URL = "https://bookend-awalho.vercel.app/api/v1"

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
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