"use client"

import React from "react"
import { Check, SendIcon } from "lucide-react"
import { ReactSketchCanvas } from "react-sketch-canvas"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SketchBoard from "@/components/sketch"
import { signIn } from 'next-auth/react';

type Props = {}

export default function StudioPage({}: Props) {
  const [image, setImage] = React.useState(null)
  const [prompt, setPrompt] = React.useState("")
  const drawingCanvas = React.useRef(null)
  return (
    <div className="container grid max-h-screen max-w-6xl  items-center rounded-xl border border-zinc-800/50 border-b-zinc-900/40 border-t-zinc-700/60 bg-gradient-to-b from-zinc-800/40 via-zinc-900/50 to-zinc-900/40 px-5">
      <div className="flex flex-col items-center gap-3 py-3 sm:h-[35rem]">
        <span className="font-medium text-zinc-500">
          Stable Diffusion v1.5 + ControlNet
        </span>
        <div className="grid size-full grid-cols-2 gap-5">
          <div className="flex-1 overflow-hidden rounded-lg border border-input">
            <div className="relative h-full">
              <ReactSketchCanvas
                backgroundImage="black"
                ref={drawingCanvas}
                strokeWidth={10}
                className="relative h-full !rounded-none !border-none bg-black/50"
                strokeColor="white"
              />
              <div className="absolute inset-0 -z-10 m-auto flex select-none items-center justify-center opacity-30">
                Draw Here
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-lg border border-input">
            <Image alt="Generated image" src={''}></Image>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="flex-1 placeholder:opacity-50"
            placeholder="Describe your drawing..."
          />
          <Button className="border-input pr-2" variant={"outline"} size="icon">
            <span className="rotate-45"><SendIcon/></span>
          </Button>
          <Button
            className=" border border-green-700/20 bg-green-800/20 hover:bg-green-800/50"
            variant={"outline"}
            size="icon"
          >
            <Check  />
          </Button>
        </div>
      </div>
    </div>
  )
}
