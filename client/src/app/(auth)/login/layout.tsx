import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
  description: "login page of seLearn.io",
}

export default function AuthenticationPage({children}:{children:React.ReactNode}) {
  return (
    <>
      <div className="container relative h-screen pt-12 md:pt-0 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
                Welcome to seLearn.<span className="text-yellow-400">io</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to login to your account
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}