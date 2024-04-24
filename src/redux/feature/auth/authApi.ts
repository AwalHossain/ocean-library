import { api } from "../../api/apiSlice";


const authApi = api.injectEndpoints({
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
            query: (data) => ({
                url: "users/login",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        refreshToken: builder.mutation({
            query: (token) => ({
                url: "users/refresh-token",
                method: "POST",
                body:token,
            }),
        }),
    }),
    overrideExisting: false,
});


export const { useRegisterUserMutation, useLoginUserMutation, useRefreshTokenMutation } = authApi;