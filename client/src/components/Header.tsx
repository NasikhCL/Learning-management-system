"use client"

import React from 'react'
import { ModeToggle } from './ui/toggleModeButton'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type Props = {}

const Header = (props: Props) => {
  const isLoggedIn = useSelector((state:any) => state.loginUserData.isLoggedIn)
  const user = useSelector((state:any) => state.loginUserData)
    
  return (
    <div className="h-16 w-full px-4 md:px-8 z-50 flex justify-between items-center border-b-2 sticky top-0 bg-transparent bg-opacity-80 backdrop-filter backdrop-blur-md">
        <Link href='/' className="text-2xl font-bold">SeLearn.<span className="text-yellow-400">io</span></Link>
        <ul className="hidden md:flex items-center gap-12">
            <li className="cursor-pointer">courses</li>
            <li className="cursor-pointer">About</li>
        </ul> 
        <div className="hidden md:flex items-center gap-10">
          {
            isLoggedIn ?
            <div className='flex items-center gap-3'>
              <div>{user.name}</div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
         :
        <Link href='/login' className="border px-3 py-1 rounded">
        Login/Signup
    </Link>
          }
        <ModeToggle/> 
        </div>
        <svg className="w-5 h-5 md:hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path></svg>
    </div>
  )
}

export default Header