import Image from 'next/image'
import React from 'react'
import courseThumb from '../../public/courseThumb.jpg'
type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap items-center'>
      <div className='mt-12 lg:mt-0 w-full md:w-1/2'>
        <h1 className="font-bold lg:text-3xl xl:text-4xl"> “Wisdom is not a product of schooling but of the lifelong attempt to acquire it.”</h1>
        <h2 className="text-gray-600 lg:text-2xl mt-4"> — Albert Einstein</h2>
      </div>
      <div className='w-full md:w-1/2'>
        <Image
          src="https://img.freepik.com/free-vector/education-learning-concept-love-reading-people-reading-students-studying-preparing-examination-library-book-lovers-readers-modern-literature-flat-cartoon-vector-illustration_1150-60938.jpg?w=996&t=st=1704635037~exp=1704635637~hmac=df2eec60b3ed81da3983c87414e17d66eb1bc64e0ef45efe5ae19b694d66be81"
          alt="Education and learning concept with people reading"
          width={300}
          height={400}
          className='w-full'
        />
      </div>
    </div>
  )
}

export default Hero