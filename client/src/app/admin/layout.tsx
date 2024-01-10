import { MainNav } from "@/components/admin/main-nav"
import { Search } from "@/components/admin/search"
import { UserNav } from "@/components/admin/user-nav"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "seLearn.io login",
  description: "login page of seLearn.io",
}


export default function AuthenticationPage({children}:{children:React.ReactNode}) {
  return (
<>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav/>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        {children}
      </div>
    </>

  )
}