import { IUserLogin, IUserSignup } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




interface UsersState {
    isLoggedIn: boolean;
    userData: IUserLogin;
    isLoading: boolean
  }
  

  const initialState = {
    isLoggedIn: false,
    userData: {},
    isLoading: false,
  };
  

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';

export const signupUser = createAsyncThunk('auth/signup',async(data:IUserSignup)=>{
    try{
        const user = fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        console.log(user)
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
                state.userData = action?.payload?.data;
                state.isLoading = false;
                state.isLoggedIn = true ; 
            })
            .addCase(signupUser.rejected,(state)=>{
                state.isLoading = false
            })
    }
})

export default authSlice.reducer