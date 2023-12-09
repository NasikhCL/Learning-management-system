import { Response } from 'express';
import {IUser} from '../db/models/user.model';
import {redis} from "./redis";


interface ITokenOptions{
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean
}

export const sendToken = (user:IUser, statusCode: number, res:Response)=>{
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();

    // upload session to redis

    redis.set(user._id, JSON.stringify(user) as any)

    //if using env: parese env variable to integrate with fallback values
    const accessTokenExpire = 300;
    const refreshTokenExpire = 1200;

    const accessTokenOptions:ITokenOptions ={
        expires: new Date(Date.now() + accessTokenExpire + 1000),
        maxAge: refreshTokenExpire + 1000,
        httpOnly: true,
        sameSite: "lax" 
    };

    const refreshTokenOptions:ITokenOptions ={
        expires: new Date(Date.now() + accessTokenExpire + 1000),
        maxAge: refreshTokenExpire + 1000,
        httpOnly: true,
        sameSite: "lax" 
    };
    

    // set secure true only in production
    if(process.env.NODE_ENV === "production"){
        accessTokenOptions.secure = true;
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions)

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}