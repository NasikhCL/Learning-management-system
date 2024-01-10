"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"


import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          learcode.io
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
      <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/")
              ? "text-foreground underline"
              : "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/add-new-course"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/add-new-course" ? "text-foreground underline" : "text-foreground/60"
          )}
        >
          Add New Course
        </Link>
        <Link
          href="/admin/view-all-course"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/view-all-course")
              ? "text-foreground underline"
              : "text-foreground/60"
          )}
        >
          View All Courses
        </Link>
        <Link
          href={`www.google.com`}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  )
}
