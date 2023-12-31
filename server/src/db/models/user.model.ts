import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const emailRegexPattern: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export interface IUser extends Document {
    name:string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    courses: string[];
    avatar: {
        public_id: string;
        url: string;
    }
    comparePassword: (password: string) => Promise<boolean>;
    signAccessToken: ()=> string;
    signRefreshToken: ()=> string;

}

interface ICookieOptions{
    expiresIn: string;
}


export const UserSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        required: [true, "please enter you name"]
    },
    email:{
        type: String,
        required: [true,"please enter your email"],
        validate:{
            validator: function(value:string){
                return emailRegexPattern.test(value);
            },
            message: "please enter a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, "password must be atleast 6 characters"],
        select:false
    },
    avatar:{
        public_id: String,
        url: String
    },  
    role:{
        type: String, 
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses:[String],
    
},{timestamps: true});


//hashing password
UserSchema.pre<IUser> ('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

//compare password
UserSchema.methods.comparePassword = async function(enteredPassword:string): Promise<boolean>{
    return await bcrypt.compare(enteredPassword, this.password)
}

export const jwtAccessTokenOptions:ICookieOptions = {
    expiresIn:"5m"
}

export const jwtRefreshTokenOptions:ICookieOptions ={
    expiresIn:"3d"
}

// sign access token
UserSchema.methods.signAccessToken = function(){
    return jwt.sign({id:this._id,}, (process.env.ACCESS_TOKEN || "something"), jwtAccessTokenOptions);
}

// sign refresh token
UserSchema.methods.signRefreshToken = function(){
    return jwt.sign({id:this._id,}, (process.env.REFRESH_TOKEN || "something"), jwtRefreshTokenOptions);
}

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default UserModel; 