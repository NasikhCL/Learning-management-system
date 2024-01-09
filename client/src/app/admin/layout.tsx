import { Metadata } from "next"

export const metadata: Metadata = {
  title: "seLearn.io login",
  description: "login page of seLearn.io",
}


export default function AuthenticationPage({children}:{children:React.ReactNode}) {
  return (
<>
{children}
</>

  )
}