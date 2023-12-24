import CourseCard from '@/components/CourseCard'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { Button } from '@/components/ui/button'
export default function Home() {
  return (
  <>
    {/* <Hero /> */}
    <section className='md:px-12 my-4'>
      <h1>Courses</h1>
      <div className='flex justify-center gap-4'>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </section>
  
  </>
  )
}
