import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../api/types";




interface IWishlistState {
    wishlist: IBook[] | null;
  } 

 const initialState: IWishlistState = {
    wishlist: [],
  }
  
  export const bookSlice = createSlice({
    initialState,
    name: 'bookSlice',
    reducers: {
        setWishList : (state, action) => {
            state.wishlist = action.payload
        }

    }

})

export const {setWishList} = bookSlice.actions

export default bookSlice.reducer