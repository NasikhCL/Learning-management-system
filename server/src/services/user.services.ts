import { Response } from "express";
import UserModel from "../db/models/user.model";


//  get user by id
export const getUserById = async(id: string, res:Response)=>{
    const user = await UserModel.findOne({id});
    res.status(201).json({
        success: true,
        user
    })
}