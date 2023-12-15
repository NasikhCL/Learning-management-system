import catchAsyncError from "../middleware/catchAsyncError";
import CourseModel from '../db/models/course.model'
import ErrorHandler from "../utils/ErrorHandler";
import { v2 as cloudinary } from 'cloudinary';
import courseModel from "../db/models/course.model";
import { redis } from "../utils/redis";
import { RequestWithUser } from "../middleware/auth";


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


// update course
export const updateCourse = catchAsyncError(async(req, res, next)=>{
    try {
        
        const data = req.body;
        if(data.thumbnail){
            const course = await courseModel.findById(req.params.id);
            if(!course){
                return next(new ErrorHandler("course not found",400))
            }
            cloudinary.uploader.destroy(course.thumbnail.public_id);
            const myCloud = await cloudinary.uploader.upload(data.thumbnail,{
                folder:"courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
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

        const updateCourse = await courseModel.findByIdAndUpdate(req.params.id,
            {
                $set: data
            },
            {
                new:true
            }
        );
        console.log(updateCourse)
        return res.status(201).json({
            success: true,
            updateCourse
        })

    }catch (err:any) {
        return next(new ErrorHandler(err.message,400))
    }
})

// get all course - without purchase
export const getAllCourses = catchAsyncError(async(req, res, next)=>{
    try{
        const cacheData = await redis.get("allCourses")
        if(cacheData){
            const courses = JSON.parse(cacheData);
            return res.status(200).json({
                sucess: true,
                courses
            })
        }else{
            const courses = await courseModel.find().select("-videos");
            await redis.set("allCourses", JSON.stringify(courses))
            return res.status(200).json({
                success:true,
                courses
            })
        }


    }catch(err:any){
        return next(new ErrorHandler(err.message, 400))
    }
})


// get single course - without purchase
export const getCoursesById = catchAsyncError(async(req, res, next)=>{
    try{

        const cacheData = await redis.get(req.params.id)
        if(cacheData){
            const course = JSON.parse(cacheData);
            return res.status(200).json({
                sucess: true,
                course
            })
        }else{
            const course = await courseModel.findById(req.params.id).select("-videos.url");
            
            await redis.set(req.params.id, JSON.stringify(course));
           
            return res.status(200).json({
                success:true,
                course
            })
        }

    }catch(err:any){
        return next(new ErrorHandler(err.message, 400))
    }
})



// get cour se content - purchased users

export const getCourseWithContent = catchAsyncError(async(req:RequestWithUser, res, next)=>{
    try{
        const userCourseList = req.user?.courses
        const courseId = req.params.id;
        if(!userCourseList || userCourseList.length === 0){
            return next(new ErrorHandler("unable to access this course",400))
        }
        const courseExists = userCourseList.find((course:any) => course === courseId )
        if(!courseExists){
            return next(new ErrorHandler("please purchase the course to access",400))
        }

        const course = await courseModel.findById(courseId);


        return res.status(200).json({
            success: true,
            course
        })
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400))
    }
});


// delete course

export const deleteCourse = catchAsyncError(async(req, res, next)=>{
    try{
        const courseId = req.params.id;

        const course = await courseModel.findByIdAndDelete(courseId);
        if(!course){
            return next(new ErrorHandler("course not found to perform this operation", 400))
        }
        return res.status(201).json({
            sucess: true,
            course
        })
    }catch(err:any){
        return next(new ErrorHandler(err.message, 400))
    }
})