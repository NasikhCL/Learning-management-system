"use client"

import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import Link from 'next/link'

import VerifyCode from '@/components/VerifyCode'

 
export default function verification() {

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
