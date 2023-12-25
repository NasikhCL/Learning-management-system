import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import courseThumb from '../../public/courseThumb.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
type Props = {}
// {"sucess":true,"courses":[{"thumbnail":{"public_id":"courses/w4nymt3gwbrwzlhckgzw","url":"https://res.cloudinary.com/dwhsngchk/image/upload/v1702294795/courses/w4nymt3gwbrwzlhckgzw.jpg"},"_id":"6576f50be9eab102120325bf","title":"Full stack Development","description":"this is a full stack course where you will be learing MERN stack with Typescript","instructor":"Harkirat","price":7500,"offerPrice":1500,"createdAt":"2023-12-11T11:39:55.988Z","updatedAt":"2023-12-11T11:39:55.988Z","__v":0},{"thumbnail":{"public_id":"courses/jhf4tkxmienipxww2kia","url":"https://res.cloudinary.com/dwhsngchk/image/upload/v1702303875/courses/jhf4tkxmienipxww2kia.jpg"},"_id":"657704c236564fff69ed7600","title":"Data Science","description":"this is a full stack course where you will be learing MERN stack with Typescript","instructor":"sudanshu","price":7500,"offerPrice":500,"createdAt":"2023-12-11T12:46:58.944Z","updatedAt":"2023-12-11T14:11:17.068Z","__v":0}]}

const CourseCard = (props: Props) => {
    return (
    <Link href='https://www.google.com'>
        <Card className='flex flex-col items-center p-2'>
            <Image 
                alt='course-thumbnail'
                src={courseThumb}
                width={170}
                height={100}
                className='w-[300px] h-[180px] self-center'
                />
            <CardTitle className='my-2'>MERN Stack developer</CardTitle>
            <CardDescription className='self-start'>In this course you will be learing to build a full stack web application using MERN stack which will be production ready and highly scalable. this is a dummy text which is used to add some description to this card this may also include randum data</CardDescription>
            <div className='w-full mt-2 flex items-center justify-between'>
                <div className='text-xl flex items-center gap-2'>
                    <span className='opacity-70'>Price:</span>
                    <span>₹1500/-</span>
                    <span className=' text-sm line-through'>₹7500/-</span>
                </div>
                <Button>View Course</Button>
            </div>

               

        </Card>
    </Link>
  )
}

export default CourseCard