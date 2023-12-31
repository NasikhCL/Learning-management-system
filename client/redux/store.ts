"use client"
import { configureStore } from "@reduxjs/toolkit";
import loginUserSlice from "./slices/loginSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        registerUser: authSlice,
        loginUserData:loginUserSlice
    } 
}) 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
