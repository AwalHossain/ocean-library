import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie";
import { setUser } from "../feature/auth/userSlice";
import { IUser } from "./types";

const cookie = Cookies.get('refreshToken')

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({ 
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data:  IUser  }) =>
        result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

