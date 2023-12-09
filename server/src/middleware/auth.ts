import catchAsyncError from './catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {redis} from '../utils/redis'
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../db/models/user.model';
interface RequestWithUser extends Request{
    user?: IUser
  }


export const isAuthenticted = catchAsyncError(async(req:RequestWithUser, res:Response, next:NextFunction)=>{
    const access_token  = req.cookies.access_token;
    if(!access_token){
        return next(new ErrorHandler("please login to access this request",400));
    }
    const decoded = jwt.verify(access_token, (process.env.ACCESS_TOKEN || '') as string) as JwtPayload
    if(!decoded){
        return next(new ErrorHandler("access token not valid",400))
    }

    const user = await redis.get(decoded.id);
    if(!user){
        return next(new ErrorHandler("user not found",400))
    }

    req.user = JSON.parse(user);
    next();

})

// validate user role

export const authorizeRoles = (...roles: string[])=>{
    return (req:RequestWithUser, res:Response, next:NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler("This user is not allowed to access this resource",400))
        }
        next();
    }
}