import { api } from "../../api/apiSlice";
import { IBook } from "../../api/types";
import { setFinishedList, setReadingList, setWishList } from "./bookSlice";


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
      providesTags: ['Wishlist'],
      transformResponse: (result: { data: { wishlist: IBook[] } }) =>
        result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setWishList(data.wishlist));

          // dispatch(setUser(data));
        } catch (error) { }
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
      providesTags: ['readingList'],
      transformResponse: (result: { data: { readingList: IBook } }) =>
        result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setReadingList(data.readingList));

          // dispatch(setUser(data));
        } catch (error) { }
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
        url: "users/finishedBook",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["finishedList"],
    }),
    getFinishedList: builder.query({
      query: () => ({
        url: "users/finishedBook",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['finishedList'],
      transformResponse: (result: { data: { finishedBooks: IBook } }) =>
      result.data,
    async onQueryStarted(_args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(setFinishedList(data.finishedBooks));
      } catch (error) { }
    },
    })
  })
})


export const {
  useAddBookMutation,
  useAddToWishListMutation, useGetWishListQuery, useAddToReadingListMutation, useGetReadingListQuery,
  useAddToFinishedListMutation, useGetFinishedListQuery,
  useRemoveFromReadingListMutation, useRemoveFromWishListMutation
} = bookApi;


