import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api/apiSlice";
import { userApi } from "./api/userApi";
import userReducer from "./feature/auth/userSlice";



const store = configureStore({
    reducer:{
        [userApi.reducerPath] : userApi.reducer,
        [api.reducerPath]: api.reducer,
        // [userApi.reducerPath]
        userState: userReducer
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