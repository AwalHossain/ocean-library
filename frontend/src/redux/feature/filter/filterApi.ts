import { api } from "../../api/apiSlice";



const filterApi = api.injectEndpoints({
    endpoints: (builder) => ({
        filterBooks: builder.query({
            query: (data) => ({
                url: `/book/filter/${data}`,
                method: 'GET',
            })    
    }),
        getAllbooks: builder.query({
            query: () => ({
                url: `/book/all`,
                method: 'GET',
            })    
    })

})

})


export const { useFilterBooksQuery, useGetAllbooksQuery } = filterApi;
