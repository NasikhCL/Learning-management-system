import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

export const errorMiddleware = (err:any, req:Request, res: Response, next: NextFunction)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error' 

    // wrong mongodb id error
    if(err.name === 'CastError'){
        const message:string = `Resource not found, Invalid:${err.path}`;
        err = new ErrorHandler(message, 400);

    }

    // duplicate key error
    if(err.code === 11000){
        const message:string = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT error
    if(err.name === 'JsonWebTokenError'){
        const message:string = `Invalid token, please try again`;
        err = new ErrorHandler(message, 400);
        
    }
    // JWT expired error
    if(err.name === 'TokenExpiredError'){
        const message:string = `Token expired, please try again`;
        err = new ErrorHandler(message, 400);
        next(err)
        
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
    next(err)
}