import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import orderModel ,{IOrder} from '../db/models/order.model'
import courseModel from "../db/models/course.model";
import sendMail from "../utils/sendMail";
import UserModel from "../db/models/user.model";
import { redis } from "../utils/redis";






export const createOrder = catchAsyncError(async(req, res, next)=>{
    try {
        const {userId, courseId, payment_info} = req.body as IOrder;

        const cacheData = await redis.get(userId);
        
        if(!cacheData){
            return next(new ErrorHandler("error fetching user", 400));
        }
        const user = JSON.parse(cacheData);

        const courseExistsInUser = user.courses.some((course:string)=> courseId=== course)
        if(courseExistsInUser){
            return next(new ErrorHandler("course already purchased", 400));
        }
        const course = await courseModel.findById(courseId);
        if(!course){
            return next(new ErrorHandler("course not found", 400));
        }

        const data ={
            courseId,
            userId,
            payment_info

        }
       
        const order = await orderModel.create(data)
        console.log(order._id.toString(),'order id is this')
        try{
            const data={
                    name: user.name,
                    order_id: order._id.toString().slice(0,6),
                    course_name:course.title,
                    price: course.price,
                    quantity: 1,
                    date: new Date().toLocaleDateString('en-US', { year:"numeric", month:"long", day:"numeric"})
            }
            await sendMail({
                email: user.email,
                subject: "Order Successful",
                template: "order.email.ejs",
                data
            });
        }catch(err:any){
            return next(new ErrorHandler(err.message, 500))
        }
        console.log(user,'this is user')
        user.courses.push(courseId);
         
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            $set: user
        },
        {
            new:true
        });
        console.log(updatedUser, 'tjis is the updated user')

        await redis.set(userId, JSON.stringify(updatedUser))

        return res.status(201).json({
            success: true,
            message: "purchase successful",
            course
        });

        
    } catch (err:any) {
        return next(new ErrorHandler(err.message,400))
    }
})