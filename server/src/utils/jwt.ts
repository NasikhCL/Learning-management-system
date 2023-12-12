import { Response } from 'express';
import {IUser} from '../db/models/user.model';
import {redis} from "./redis";


interface ICookieOptions{
    maxAge: number;
}

const accessTokenExpire = 300; // 5minutes
const refreshTokenExpire = 259200; // 3days

export const cookieAccessTokenOptions:ICookieOptions ={
    maxAge: accessTokenExpire
};

export const cookieRefreshTokenOptions:ICookieOptions ={
    maxAge: refreshTokenExpire
};

export const sendToken = (user:IUser, statusCode: number, res:Response) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();

    // upload session to redis
    redis.set(user._id, JSON.stringify(user) as any) 
    res.cookie("access_token", accessToken, cookieAccessTokenOptions);
    res.cookie("refresh_token", refreshToken, cookieRefreshTokenOptions);

    return res.status(statusCode).json({
        success: true,
        user,
        accessToken
    })
}