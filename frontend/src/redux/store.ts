import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import userReducer from "./feature/userSlice";



const store = configureStore({
    reducer:{
        [userApi.reducerPath] : userApi.reducer,
        userState: userReducer
    },
    devTools: true,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(
            [
                userApi.middleware
            ]
        ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;