import { api } from "../../api/apiSlice";
import { IBook } from "../../api/types";
import { setWishList } from "./bookSlice";


const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addToWishList: builder.mutation({
            query: (data) => ({
                url: "users/wishlist",
                method: "POST",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["Wishlist"],
        }),

    getWishList: builder.query({
        query: () => ({
            url: "users/wishlist",
            method: "GET",
            credentials: "include",
        }),
        providesTags:['Wishlist'],
        transformResponse: (result: { data: { wishlist:IBook} }) =>
        result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data,"bookapi test");   
          dispatch(setWishList(data.wishlist));
          
          // dispatch(setUser(data));
        } catch (error) {}
      }, 
    })
})
})


export const { useAddToWishListMutation, useGetWishListQuery } = bookApi;


