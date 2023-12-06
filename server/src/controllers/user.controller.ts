import UserModel from '../db/models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import catchAsyncError from '../middleware/catchAsyncError';
import jwt, { Secret } from 'jsonwebtoken'
// import ejs from 'ejs';
// import path from "path"
import sendMail from '../utils/sendMail'


// register user
interface IRegistrationBody{
    name: string;
    email: string;
    password: string;
    avatar?:string;
}

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

interface IActivationToken {
    token: string;
    activationCode: string;
}

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