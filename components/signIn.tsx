import React from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

type Props = {}

export default function SignIn({}: Props) {
  return (
    <Button
      variant={"secondary"}
      onClick={() => signIn()}
      className="m-auto flex rounded-md border-t-2 border-orange-500 bg-orange-600 text-lg font-medium transition-colors duration-200 ease-in-out hover:border-orange-400 hover:bg-orange-500 "
    >
      <span className="font-medium text-white">Try For Free!</span>
    </Button>
  )
}
