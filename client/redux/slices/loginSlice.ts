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
    token: ''
}

const baseUrl = process.env.BASE_URL
export const loginUser = createAsyncThunk('auth/login',async(data: IUserLogin)=>{
    try {
        const url =  baseUrl + '/users/login'
        const {email, password } = data;
        const user = axios.post(url,{
            email,
            password
        });
        if(user){
            console.log(user, '//////something is this')
            return user;
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
            .addCase(loginUser.fulfilled, (state)=>{
                state.isLoading = false;
                state.isLoggedIn= true;
                state.name='Nasik';
                state.email='';
                state.PurchasedCourses= [];
                state.role= '';
                state.token='';
            })
            .addCase(loginUser.rejected, (state)=>{
                state.isLoading = false
            })

    }
})


 export default loginUserSlice.reducer;
 