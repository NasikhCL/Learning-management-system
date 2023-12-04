import UserModel,{IUser} from '../db/models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import catchAsyncError from '../middleware/catchAsyncError';
import jwt, { Secret } from 'jsonwebtoken'
import ejs from 'ejs'


// register user
interface IRegistrationBody{
    name: string;
    email: string;
    password: string;
    avatar?:string;
}

export const registrationUser = catchAsyncError(async(req, res, next) =>{
    const {name, email, password} = req.body;
    
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

    const htmlTemp = await ejs.renderFile(path.join(__dirname,"../"))
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