import { api } from "../../api/apiSlice";
import { IBook } from "../../api/types";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: "book/add",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    addToPrefernce: builder.mutation({
      query: (data) => ({
        url: "book/preference",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    getAllbooks: builder.query({
      query() {
        return {
          url: `book/all?page=${1}&limit=${10}&sortBy=${"createdAt"}&sortOrder=${"desc"}`,
          credentials: "include",
        };
      },
      providesTags: ["Books"],
      transformResponse: (result: { data: { data: IBook[] } }) => result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data.data, "chekolo");
          dispatch(setBook(data.data));

          // dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    getWishList: builder.query({
      query: () => ({
        url: "users/wishlist",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Wishlist"],
      // transformResponse: (result: { data: { wishlist: IBook[] } }) =>
      //   result.data,
      // async onQueryStarted(_args, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setWishList(data.wishlist));

      //     // dispatch(setUser(data));
      //   } catch (error) {}
      // },
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
      providesTags: ["readingList"],
      transformResponse: (result: { data: { readingList: IBook } }) =>
        result.data,
      // async onQueryStarted(_args, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setReadingList(data.readingList));

      //     // dispatch(setUser(data));
      //   } catch (error) {}
      // },
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
      providesTags: ["finishedList"],
      transformResponse: (result: { data: { finishedBooks: IBook } }) =>
        result.data,
      // async onQueryStarted(_args, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setFinishedList(data.finishedBooks));
      //   } catch (error) {}
      // },
    }),
  }),
});

export const {
  useAddBookMutation,
  useAddToPrefernceMutation,
  useGetWishListQuery,
  useAddToReadingListMutation,
  useGetReadingListQuery,
  useAddToFinishedListMutation,
  useGetFinishedListQuery,
  useRemoveFromReadingListMutation,
  useRemoveFromWishListMutation,
  useGetAllbooksQuery,
} = bookApi;
