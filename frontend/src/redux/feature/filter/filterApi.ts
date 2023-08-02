import { api } from "../../api/apiSlice";
import { IBook } from "../../api/types";
import { setBook } from "./filterSlice";




const filterApi = api.injectEndpoints({
    endpoints: (builder) => ({
        filterBooks: builder.query({
            query: (data) => ({
                url: `/book/all/${data}`,
                method: 'GET',
            })    
    }),
        getAllbooks: builder.query({
            query() {
                return {
                  url: "book/all",
                  credentials: "include",
                };
              },
              transformResponse: (result: { data: {data:IBook}  }) =>
              result.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
                const { data } = await queryFulfilled;
                console.log(data.data,"chekolo");   
                dispatch(setBook(data.data));
                
                // dispatch(setUser(data));
              } catch (error) {}
            },

    })

})

})


export const { useFilterBooksQuery, useGetAllbooksQuery } = filterApi;
