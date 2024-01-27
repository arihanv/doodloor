"use client"

import React from "react"
import Link from "next/link"
import { auth, authOptions } from "@/authOptions"
import { signOut, useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { buttonVariants } from "./ui/button"

export default function AccountMenu() {
  const { data: session } = useSession()
  return (
    <div>
      {session?.user?.image ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="select-none pt-0.5 focus-visible:outline-none">
            <Avatar className="!h-8 !w-8">
              <AvatarImage src={session?.user?.image} alt={"profile picture"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-20 mt-2">
            <DropdownMenuItem disabled={true}>
              {session.user.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/api/auth/signin"} rel="noreferrer">
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "h-fit rounded-lg px-2.5 py-1"
            )}
          >
            <span>Login</span>
          </div>
        </Link>
      )}
    </div>
  )
}
