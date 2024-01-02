import { IUserLogin, IUserSignup } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




interface UsersState {
    activationCode: string;
    activationToken: string;
    isLoading: boolean
    userData: IUserSignup
  }
  

  const initialState:UsersState = {
    isLoading: false,
    activationCode: "",
    activationToken: "",
    userData:{
        name: '',
        email: '',
        password:''
    }
    
  };
  

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
export const registerUser = createAsyncThunk('auth/register',async(data: IUserSignup)=>{
    try {
        const url =  baseUrl + 'users/registration'
        const {name, email, password } = data;
        const response =  await axios.post(url,{
            name,
            email,
            password
        });
        if(response){
            console.log(response,'this is response')
            return response;
        } 
    } catch (err: any) {
        return err.message;
        
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
            .addCase(registerUser.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.isLoading= false;
                state.activationToken = action.payload.data.activationToken
            })
            .addCase(registerUser.rejected,(state)=>{
                state.isLoading = false
            })
    }
})

export default authSlice.reducer