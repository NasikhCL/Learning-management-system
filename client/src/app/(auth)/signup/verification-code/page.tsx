"use client"

import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { IUserLogin } from '@/types/auth'
import VerifyCode from '@/components/VerifyCode'
import { registerUser } from '../../../../../redux/slices/authSlice'
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useRouter } from 'next/navigation'
import { RootState } from '../../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
 

// Define the type for your dispatch function
type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default function Login() {

  const dispath: AppDispatch = useDispatch();

  const activationToken = useSelector((state:any)=> state.registerUser.activationToken);
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [activationCode, setActivationCode] = useState<object>({})

  // useEffect(()=>{
  //   if(activationToken){
  //     console.log(activationToken,'this is the token')
  //   }
  // },[activationToken])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivationCode((prev) => {
      return { ...prev, [name]: value }
    })
  }
  async function onSubmit(event: React.SyntheticEvent) {
    // to: backend call and verify the credentials, then redirect
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <p className="text-sm mx-auto text-muted-foreground">
        Enter the code recived to your Email
      </p>
      <div className={cn("grid gap-6")}>

        <VerifyCode />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              you don&apos;t have an account? <Link href='/signup' className="text-blue-700 font-bold underline">Sign up</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
