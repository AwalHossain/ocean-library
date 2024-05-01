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
        } catch (error) {
          console.log(error);
        }
      },
    }),
    filterBooks: builder.query({
      query(data) {
        return {
          url: `book/all/${data}&sortBy=${"createdAt"}&sortOrder=${"desc"}`,
          credentials: "include",
        };
      },
      providesTags: ["filter"],
      transformResponse: (result: { data: { data: IBook[] } }) => result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBook(data.data));

          // dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
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
  }),
});

export const {
  useAddReviewMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useFilterBooksQuery,
  useGetSingleBookQuery,
} = filterApi;
