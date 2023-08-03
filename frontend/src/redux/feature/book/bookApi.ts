import { api } from "../../api/apiSlice";
import { IBook } from "../../api/types";
import { setReadingList, setWishList } from "./bookSlice";


const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
      addBook: builder.mutation({
        query: (data) => ({
          url: "book/add",
          method: "POST",
          credentials: "include",
          body: data,
        })
      }),
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
          dispatch(setWishList(data.wishlist));
          
          // dispatch(setUser(data));
        } catch (error) {}
      }, 
    }),

    removeFromWishList: builder.mutation({
        query: (data) => ({
            url: `users/wishlist/${data}`,
            method: "PATCH",
            credentials: "include",
        }),
        invalidatesTags: ["Wishlist"],
    }),

    addToReadingList: builder.mutation({
        query: (data) => ({
            url: "users/readinglist",
            method: "POST",
            credentials: "include",
            body: data,
        }),
        invalidatesTags: ["readingList"],
      }),

      getReadingList: builder.query({
        query: () => ({
            url: "users/readinglist",
            method: "GET",
            credentials: "include",
        }),
        providesTags:['readingList'],
        transformResponse: (result: { data: { readingList:IBook} }) =>
        result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;  
          dispatch(setReadingList(data.readingList));
          
          // dispatch(setUser(data));
        } catch (error) {}
      }, 
      }),

      removeFromReadingList: builder.mutation({
        query: (data) => ({
            url: `users/readinglist/${data}`,
            method: "PATCH",
            credentials: "include",
        }),
        invalidatesTags: ["readingList"],
    }),

    
      addToFinishedList: builder.mutation({
        query: (data) => ({
            url: "users/finishedlist",
            method: "POST",
            credentials: "include",
            body: data,
        }),
        invalidatesTags: ["finishedList"],
      }),
      getFinishedList: builder.query({
        query: () => ({
          url: "users/finishedlist",
          method: "GET",
          credentials: "include",
        }),
        providesTags:['finishedList'],
      })
})
})


export const { 
  useAddBookMutation,
  useAddToWishListMutation, useGetWishListQuery,useAddToReadingListMutation, useGetReadingListQuery,
  useAddToFinishedListMutation, useGetFinishedListQuery,
  useRemoveFromReadingListMutation,useRemoveFromWishListMutation
} = bookApi;


