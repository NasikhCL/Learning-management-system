import catchAsyncError from "../middleware/catchAsyncError";
import CourseModel from '../db/models/course.model'
import ErrorHandler from "../utils/ErrorHandler";
import { v2 as cloudinary } from 'cloudinary';


// create course
export const createCourse = catchAsyncError(async(req, res, next)=>{
    try {

        const data = req.body;
        if(!data.title || !data.description || !data.instructor || !data.videos || !data.thumbnail || !data.price){
            return next(new ErrorHandler("all field must be filled",400))
        }
        const myCloud = await cloudinary.uploader.upload(data.thumbnail,{
            folder:"courses"
        });
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
        for (const video of data.videos) {
            if (
              !video.title || typeof video.title !== 'string' ||
              !video.url || typeof video.url !== 'string' ||
              !video.duration || typeof video.duration !== 'number' ||
              !video.videoNumber || typeof video.duration !== 'number'
            ) {
                return next(new ErrorHandler("please update videos in proper format",400))
            }
        }
        const course =  await CourseModel.create(data)
        
        return res.status(201).json({
            success: true,
            course
        })

    }catch (err:any) {
        return next(new ErrorHandler(err.message,400))
    }
    
})