import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../api/types";


interface IBookState {
    book: IBook[] | null;
    reviews: IBook[] | null;
  }
  
 const initialState: IBookState = {
    book: [],
    reviews:  []
  }
  
  export const bookSlice = createSlice({
    initialState,
    name: 'bookSlice',
    reducers: {
        setBook: (state, action) => {
            state.book = action.payload
        },
        setReviews: (state, action) => {
            state.reviews = action.payload
        }
    }

})


export const { setBook, setReviews } = bookSlice.actions
export default bookSlice.reducer;