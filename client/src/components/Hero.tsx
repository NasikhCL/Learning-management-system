import Image from 'next/image'
import React from 'react'
import courseThumb from '../../public/courseThumb.jpg'
type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='w-full'>
      <Image 
        alt='hero-image'
        src={courseThumb}
        // width={100}
        // height={100}
        className='w-full h-[80vh]'
      />
    </div>
  )
}

export default Hero