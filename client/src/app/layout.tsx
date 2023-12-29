import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from 'next'
import './globals.css'
import Header from "@/components/Header"
import { Providers } from "./Provider"


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
    <html lang="en">
       <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main  className="px-4 md:px-8">
              {children}
            </main>
          </ThemeProvider>
        </body>
    </html> 
    </Providers>
  )
}
