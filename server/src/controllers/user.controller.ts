import UserModel,{IUser, jwtAccessTokenOptions, jwtRefreshTokenOptions} from '../db/models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import catchAsyncError from '../middleware/catchAsyncError';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
// import ejs from 'ejs';
// import path from "path"
import sendMail from '../utils/sendMail'
import { Request, Response, NextFunction } from 'express';
import { cookieAccessTokenOptions, cookieRefreshTokenOptions, sendToken } from '../utils/jwt';
import {redis} from '../utils/redis'
import { getUserById } from '../services/user.services';
import { RequestWithUser } from '../middleware/auth';



interface ILoginRequest{
    email: string;
    password: string;
}

interface IRegistrationBody{
    name: string;
    email: string;
    password: string;
    avatar?:string;
}
interface IActivationToken {
    token: string;
    activationCode: string;
}

interface IActivationRequest{
    activation_token: string;
    activation_code: string;
}

interface IUpdateUserInfo {
    name?: string;
    email?: string;
}

// register user
export const registrationUser = catchAsyncError(async(req, res, next) =>{
    try{
        const {name, email, password} = req.body;
        console.log(name, email, password)
        const isUserAlreadyExist = await UserModel.findOne({email});
        if(isUserAlreadyExist){
            return next(new ErrorHandler("email already exists", 400));
        }
        const user:IRegistrationBody = {
            name,
            email,
            password
        };
        const activationToken = createActivationToken(user)
        const activationCode = activationToken.activationCode
        const data = {user:{name:user.name}, activationCode: activationCode};

        // const html = await ejs.renderFile(path.join(__dirname,"../mails/acticvation.mail.ejs",data))

        try{
            await sendMail({
                email: user.email,
                subject: "Activate your Account",
                template: "activation.mail.ejs",
                data
            });
            res.status(201).json({
                success: true,
                message: `Please check your: ${user.email} email`,
                activationToken: activationToken.token
            })
        }catch(err:any){
            return next(new ErrorHandler(err.message, 400))
        }
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400))
    }
})



export const createActivationToken = (user:any): IActivationToken=>{
    const activationCode = Math.floor(1000 + Math.random()* 9000).toString();
    const token = jwt.sign({
        user, activationCode
    },process.env.ACTIVATION_SECRET as Secret,
    {
        expiresIn: "5m"
    })
    return {token, activationCode};
} 


// user activation
export const activateUser = catchAsyncError(async(req, res, next)=>{
    try{

        const {activation_token, activation_code} = req.body as IActivationRequest;

        const newUser:{user:IUser, activationCode: string}  = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        )  as {user:IUser, activationCode: string} 

        

        if(newUser.activationCode !== activation_code){
            return next(new ErrorHandler("invalid activation code", 400))
        }

        const {name, email, password} = newUser.user

        const existUser = await UserModel.findOne({email});

        if(existUser){
            return next(new ErrorHandler("email already exist", 400));
        }
        const user = await UserModel.create({
            name,
            email,
            password
        })

        res.status(201).json({
            success: true,
            user:user
        })

    }catch(err:any){
        return next(new ErrorHandler(err.message, 400))
    }
})

// login user

export const loginUser = catchAsyncError(async(req:RequestWithUser, res, next)=>{
    try{
        const {email, password} = req.body as ILoginRequest

        if(!email){
            return next(new ErrorHandler("invalid email or password", 400))
        }
        const user:IUser = await UserModel.findOne({email}).select('+password');
        console.log(user,"this is user login now")
        if(!user){
            return next(new ErrorHandler("invalid email or password", 400))
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return next(new ErrorHandler("Invalid email or passowrd", 400))
        }
        req.user = user;
        sendToken(user, 200, res);

    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
})



export const logOutUser = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{

        res.cookie("access_token","",{maxAge:1});
        res.cookie("refresh_token", "", {maxAge:1});

        const userId = req.headers.id || ""  as string
        if(userId){
            redis.del(userId as string);
        }
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
        
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
})

//  update access token

export const updateTokens = catchAsyncError(async(req:RequestWithUser, res:Response, next:NextFunction)=>{
    try{
        const refresh_token = req.cookies.refresh_token as string;
        const decoded = jwt.verify(refresh_token, (process.env.REFRESH_TOKEN || "somthing") ) as JwtPayload
        if(!decoded){
            return next(new ErrorHandler("not able to refreh token", 400));
        }

        const session = await redis.get(decoded.id as string);
        if(!session){
            return next(new ErrorHandler("no session found", 400));
        }

        const user = JSON.parse(session);
        const newAccessToken = jwt.sign({id: user._id}, (process.env.ACCESS_TOKEN || "something"), jwtAccessTokenOptions)
        const newRefeeshToken = jwt.sign({id: user._id}, (process.env.REFRESH_TOKEN || "something"), jwtRefreshTokenOptions) 
        
        req.user = user
        res.cookie("access_token", newAccessToken, cookieAccessTokenOptions);
        res.cookie("refresh_token",newRefeeshToken, cookieRefreshTokenOptions);

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        })
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
})



// get user info

export const getUserInfo = catchAsyncError(async(req:RequestWithUser, res:Response, next:NextFunction)=>{
    try{
        const userId = req.user?.id
        getUserById(userId, res)

    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));
    }
})

// update user info

export const updateUserInfo = catchAsyncError(async(req:RequestWithUser, res:Response, next:NextFunction)=>{
    try{
        const { name, email } = req.body as IUpdateUserInfo
        const userId = req.user?._id
        const user = await UserModel.findById(userId);
        if(email && user){
            const isEmailExist = await UserModel.findOne({email});
            if(isEmailExist){
                return next(new ErrorHandler("email already exist",400))
            }
            user.email = email

        }
        if(name && user){
            user.name = name;
        }

        await user?.save();

        await redis.set(userId, JSON.stringify(user));
        
        return res.status(201).json({
            success: true,
            user
        })
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400));

    }
})