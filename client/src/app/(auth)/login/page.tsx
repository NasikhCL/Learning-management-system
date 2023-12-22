"use client"

import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { IUserLogin } from '@/types/auth'


export default function Login() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [formData, setFormData] = useState<IUserLogin>({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setFormData((prev)=>  {
    return {...prev, [name]: value}
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
    <div className={cn("grid gap-6")}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </div>
      </form>
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
  )
}
