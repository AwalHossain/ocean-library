
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1/",
        credentials: "include",
      }),
    tagTypes:['Posts'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: "users/create",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        loginUser: builder.mutation({
            query (data){
              return { 
                url: "users/login",
                method: "POST",
                body: data,
                credentials: "include",}
 
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                 
                    await queryFulfilled;
                    await dispatch(
                        userApi
                    )
                } catch (error) {
                    return error;
                }
            }
        },
        
        ),
        refreshToken: builder.mutation({
            query: (token) => ({
                url: "users/refresh-token",
                method: "POST",
                body:token,
            }),
        }),
    }),
});