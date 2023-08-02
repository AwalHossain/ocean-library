import { api } from "../../api/apiSlice";


const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addToWishList: builder.mutation({
            query: (data) => ({
                url: "users/wishlist",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),

    })
})


export const { useAddToWishListMutation } = bookApi;


