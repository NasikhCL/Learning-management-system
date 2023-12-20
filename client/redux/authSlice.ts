import { IUserSignup } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLoading: false,
    userData: {}
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';

const signupUser = createAsyncThunk('auth/signup',async(data:IUserSignup)=>{
    try{
        const user = fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return user;
    
    }catch(err:any){
        return err
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
            .addCase(signupUser.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action)=>{
                state.userData = action?.payload?.data
                state.isLoading = false  
            })
            .addCase(signupUser.rejected,(state)=>{
                state.isLoading = false
            })
    }
})