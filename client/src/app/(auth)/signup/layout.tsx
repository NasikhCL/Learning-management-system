import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "seLearn.io signup",
  description: "sign up /login page of seLearn.io",
}



export default function AuthenticationPage({children}:{children:React.ReactNode}) {
  return (
    <>
      <div className="container relative pt-12 md:pt-0 h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <h2 className="text-2xl font-bold">SeLearn.<span className="text-yellow-400">io</span></h2>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Learing never ends. Your mindset matters a lot.&rdquo;
              </p>
              <footer className="text-sm">Nasikh</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account with seLearn.<span className="text-yellow-400">io</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            {children}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By creating account, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}