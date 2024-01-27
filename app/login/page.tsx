"use client"

import React from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

type Props = {}

export default function Page({}: Props) {
  return (
    <div className="appearQuick flex max-h-screen min-h-full w-full items-center justify-center">
      <div className="flex w-full max-w-xs flex-col items-center justify-center gap-3">
        <Button
          variant={"outline"}
          className="animate-enter text-md group mt-5 w-full rounded-md border-t-2 border-orange-500 bg-gradient-to-b from-orange-600 to-orange-700 px-4 py-6 font-sans font-medium shadow-lg shadow-orange-800/30 transition-colors duration-200 ease-in-out"
          onClick={() => signIn("google", { callbackUrl: "/studio" })}
        >
          <span className="bg-gradient-to-b from-white to-zinc-200/90 bg-clip-text py-10 text-transparent transition-all group-hover:text-white group-hover:brightness-200">
            Sign In With Google
          </span>
        </Button>
      </div>
    </div>
  )
}
