import React from 'react'
import { ModeToggle } from './ui/toggleModeButton'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
    
  return (
    <div className=" h-16 w-full flex justify-between items-center border-b-2 sticky top-0">
        <h2 className="text-2xl font-bold">SeLearn.<span className="text-yellow-400">io</span></h2>
        <ul className="hidden md:flex items-center gap-12">
            <li>courses</li>
            <li>About</li>
        </ul>
        <div className="hidden md:flex gap-10">
        <Link href='/login' className="border px-3 py-1 rounded">
            Login/Signup
        </Link>
        <ModeToggle/> 
        </div>
        <svg className="w-5 h-5 md:hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path></svg>
    </div>
  )
}

export default Header