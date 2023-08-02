import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api/apiSlice";
import { userApi } from "./api/userApi";
import userReducer from "./feature/auth/userSlice";
import wishListReducer from "./feature/book/bookSlice";
import bookReducer from "./feature/filter/filterSlice";





const store = configureStore({
    reducer:{
        [userApi.reducerPath] : userApi.reducer,
        [api.reducerPath]: api.reducer,
        userState: userReducer,
        bookState: bookReducer,
        wishListState: wishListReducer,
    },
    devTools: true,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(
            [
                userApi.middleware,
                api.middleware
            ]   
        ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;