import { createSlice } from "@reduxjs/toolkit";

interface IWishlistState {
  userPreference: string;
}

const initialState: IWishlistState = {
  userPreference: "want to read",
};

export const bookSlice = createSlice({
  initialState,
  name: "bookSlice",
  reducers: {
    setUserPrefernce: (state, action) => {
      state.userPreference = action.payload;
    },
  },
});

export const { setUserPrefernce } = bookSlice.actions;

export default bookSlice.reducer;
