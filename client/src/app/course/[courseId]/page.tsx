import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import React, { FC } from 'react'
import Image from 'next/image'
import courseThumb from '../../../../public/courseThumb.jpg'

type Props = {}

const courseDetails = (props: Props) => {
  return (
    <div>
      <Card className='lg:hidden flex flex-col gap-2 my-2 py-4 px-4'>
      <Image 
                alt='course-thumbnail'
                src={courseThumb}
                width={250}
                height={100}
                className='w-full items-center h-[180px] md:h-[300px]'
                />
        <CardTitle>Full Stack Web development(MERN)</CardTitle>
        <CardTitle className='flex items-center gap-4'><span>₹1500</span><span className='text-sm line-through'>₹7500/-</span></CardTitle>
        <Button>Buy Now</Button>
        <CardDescription className='px-4 flex flex-col'>
          <span>10 hours on-demand Video content</span>
          <span>source code file</span>
          <span>certificate of completion</span>
          <span>Life time access</span>
        </CardDescription>
      </Card>
      <section className='flex flex-col mt-5 lg:w-[65%] overflow-y-scroll'>
        <div className='hidden lg:block'>
          <h1 className='text-4xl font-bold'>Full Stack Web development(MERN)</h1>
        </div>
        <div className=''>
          <p className='text-xl text-justify leading-7 [&:not(:first-child)]:mt-6'>In this course you will be learing to build a full stack web application using MERN stack which will be production ready and highly scalable. this is a dummy text which is used to add some description to this card this may also include randum data</p>
        </div>
        <div className='flex gap-4 items-center'>
          <div>
            <span>Instructor: </span><span>Sudanshu</span>
          </div>
          <span>|</span>
          <div>
            <span>Language: </span><span>English</span>
          </div>
        </div>
        <Card className='my-4 py-4'>
          <CardTitle className='mb-2 ml-2'>What you will learn?</CardTitle>
          <div className='flex gap-12 ml-4'>
            <CardDescription className='flex flex-col '>
              <span>HTML</span>
              <span>CSS</span>
              <span>TAILWIND CSS</span>
              <span>JAVASCRIPT</span>
            </CardDescription>
            <CardDescription className='flex flex-col '>
              <span>REACT JS</span>
              <span>NODE JS</span>
              <span>EXPRESS JS</span>
              <span>MONGO DB</span>
            </CardDescription>
          </div>
        </Card>

        <div className=''>
          <h2 className='text-3xl font-bold '>Course Content</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>HTML</AccordionTrigger>
              <AccordionContent>
                Basics of HTML
              </AccordionContent>
              <AccordionContent>
                Advanced HTML
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>CSS</AccordionTrigger>
              <AccordionContent>
                Basics of CSS
              </AccordionContent>
              <AccordionContent>
                Advanced CSS
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>TAILWIND CSS</AccordionTrigger>
              <AccordionContent>
                deep dive in to Tailwind CSS
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Javascript</AccordionTrigger>
              <AccordionContent>
                Basics of Javascript
              </AccordionContent>
              <AccordionContent>
                Advanced Javascript
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </section>
      <Card className='hidden w-[30%] lg:flex flex-col gap-2 py-4 px-4 lg:fixed top-20 right-10'>
        <Image 
                alt='course-thumbnail'
                src={courseThumb}
                width={170}
                height={100}
                className='w-full h-[100px] lg:h-[200px] xl:h-[250px] 2xl:h-[350p]'
                />
        <CardTitle className='flex items-center gap-4'><span>₹1500</span><span className='text-sm line-through'>₹7500/-</span></CardTitle>
        <Button>Buy Now</Button>
        <CardDescription className='px-4 flex flex-col'>
          <span>10 hours on-demand Video content</span>
          <span>source code file</span>
          <span>certificate of completion</span>
          <span>Life time access</span>
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