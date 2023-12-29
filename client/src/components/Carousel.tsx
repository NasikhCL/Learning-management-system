"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import courseCarousel from '../../public/5036654.jpg'
export default function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      console.log("current")
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel setApi={setApi} className="w-[93%] mx-auto">
        <CarouselContent  className="w-full h-[300px] md:h-screen" >
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                    <Image 
                        alt='course-carousel'
                        src={courseCarousel}
                        width={170}
                        height={100}
                        className='w-full h-full self-center'
                    />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
      </Carousel>
    </div>
  )
}
