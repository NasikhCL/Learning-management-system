import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoggedInUser, IUserLogin } from "@/types/auth";
import axios from "axios";

const initialState : ILoggedInUser = {
    isLoading: false,
    isLoggedIn: false,
    name:'',
    email:'',
    PurchasedCourses: [],
    role: '',
    token: '',
    id: ''
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
export const loginUser = createAsyncThunk('auth/login',async(data: IUserLogin)=>{
    try {
        const url =  baseUrl + 'users/login'
        const {email, password } = data;
        const response = axios.post(url,{
            email,
            password
        });
        if(response){
            return response;
        } 
    } catch (err: any) {
        return err.message;
        
    }
})

const loginUserSlice =  createSlice({
    name: 'auth/login',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(loginUser.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state,action)=>{
                const user = action.payload.data.user
                
                state.isLoading = false;
                state.isLoggedIn= true;
                state.name=user.name;
                state.email=user.email;
                state.PurchasedCourses= user.courses;
                state.role= user.role;
                state.token=action.payload.data.accessToken;
            })
            .addCase(loginUser.rejected, (state)=>{
                state.isLoading = false
            })

    }
})


 export default loginUserSlice.reducer;
 