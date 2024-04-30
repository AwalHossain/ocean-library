import { api } from "../../api/apiSlice";
import { IBook } from "../../api/types";
import { setBook, setReviews } from "./filterSlice";

const filterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query(data) {
        return {
          url: `book/review/${data.bookId}`,
          method: "PATCH",
          credentials: "include",
          body: data,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getSingleBook: builder.query({
      query(data) {
        return {
          url: `book/${data}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Reviews", "Books"],
      transformResponse: (result: { data: IBook }) => result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setReviews(data.reviews));
          // dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    filterBooks: builder.query({
      query(data) {
        return {
          url: `book/all/${data}&sortBy=${"createdAt"}&sortOrder=${"desc"}`,
          credentials: "include",
        };
      },
      providesTags: ["Books"],
      transformResponse: (result: { data: { data: IBook[] } }) => result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBook(data.data));

          // dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    editBook: builder.mutation({
      query(data) {
        return {
          url: `book/${data.bookId}`,
          method: "PATCH",
          credentials: "include",
          body: data,
        };
      },
      // invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query(data) {
        return {
          url: `book/${data}`,
          method: "DELETE",
          credentials: "include",
        };
      },
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
  }),
});

export const {
  useAddReviewMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useFilterBooksQuery,
  useGetAllbooksQuery,
  useGetSingleBookQuery,
} = filterApi;
