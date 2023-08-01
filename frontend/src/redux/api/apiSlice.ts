
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';



const cookie = Cookies.get('refreshToken')

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1/",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
          // const token = cookie
          if (cookie) {
           // include token in req header
            headers.set('authorization', `${cookie}`)  
            return headers
          }
        }
      }),
    tagTypes:['Posts'],
    endpoints:()=>({})
});