"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { IUserSignup } from '@/types/auth'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../../redux/slices/authSlice'
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useRouter } from 'next/navigation'
import { RootState } from '../../../../redux/store'

// Define the type for your dispatch function
type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Signup({ className, ...props }: UserAuthFormProps) {
  const dispatch:AppDispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [formData, setFormData] = React.useState<IUserSignup>({
    name: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(router.asPath,'path')
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }
  async function onSubmit(event: React.SyntheticEvent) {
    //handle submit login / backend calls
    event.preventDefault()
    dispatch(registerUser(formData));
    router.push('/verifcation-code')
  }
  return (
    <>
      <p className="text-sm mx-auto text-muted-foreground">
        Enter your details below to create your account
      </p>
      <div className={cn("grid gap-6")}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                name
              </Label>
              <Input
                name="name"
                id="name"
                placeholder="your name"
                type="text"
                autoCorrect="off"
                autoComplete="name"
                disabled={isLoading}
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
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
              Create Account
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              already have an account? <Link href='/login' className="text-blue-700 font-bold underline">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
