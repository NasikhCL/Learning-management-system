import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import React,{FC} from 'react'

type Props = {}

const courseDetails = (props: Props) => {
  return (
    <div>
      <section className='md:w-[60%] bg-gray-600 h-[1000px]'>

      </section>
      <Card className='fixed  top-20 right-10 px-4'>
        <div className='md:w-[500px] h-[300px] bg-red-300'>
        </div> 
        <CardTitle className='flex items-center gap-4'><span>₹1500</span><span className='text-sm line-through'>₹7500/-</span></CardTitle>
        <Button>Buy Now</Button>
        <CardDescription className='list-disc'>
          <ul >
            <li>10 hours on-demand Video content</li>
            <li>source code file</li>
            <li>certificate of completion</li>
            <li>Life time access</li>
          </ul>
        </CardDescription>
      </Card>
    </div>
  )
}

export default courseDetails
// {
//     "success": true,
//     "course": {
//         "thumbnail": {
//             "public_id": "courses/jhf4tkxmienipxww2kia",
//             "url": "https://res.cloudinary.com/dwhsngchk/image/upload/v1702303875/courses/jhf4tkxmienipxww2kia.jpg"
//         },
//         "_id": "657704c236564fff69ed7600",
//         "title": "Data Science",
//         "description": "this is a full stack course where you will be learing MERN stack with Typescript",
//         "instructor": "sudanshu",
//         "videos": [
//             {
//                 "videoNumber": 1,
//                 "title": "html and css",
//                 "duration": 120,
//                 "_id": "657718850b285a370b4abb78"
//             }
//         ],
//         "price": 7500,
//         "offerPrice": 500,
//         "createdAt": "2023-12-11T12:46:58.944Z",
//         "updatedAt": "2023-12-11T14:11:17.068Z",
//         "__v": 0
//     }
// }