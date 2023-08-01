import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../api/types";


interface IBookState {
    book: IBook[] | null;
  }
  
 const initialState: IBookState = {
    book: [],
  }
  
  export const bookSlice = createSlice({
    initialState,
    name: 'bookSlice',
    reducers: {
        setBook: (state, action) => {
            state.book = action.payload
        }
    }

})


export const { setBook } = bookSlice.actions
export default bookSlice.reducer;