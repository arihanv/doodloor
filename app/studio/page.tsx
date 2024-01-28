"use client"

import React from "react"
import Image from "next/image"
import { Check, SendIcon } from "lucide-react"
import { ReactSketchCanvas } from "react-sketch-canvas"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { cn } from "../../lib/utils"

type Props = {}

export default function StudioPage({}: Props) {
  const [imageUrl, setImageUrl] = React.useState(null)
  const [timeDiff, setTimeDiff] = React.useState<undefined | number>()
  const [prompt, setPrompt] = React.useState("")
  const drawingCanvas = React.useRef(null)
  const [loading, setLoading] = React.useState(false)

  async function submitDrawing() {
    if (!drawingCanvas.current) return
    setLoading(true)

    const image = await (drawingCanvas.current as any)
      .exportImage("png")
      .then((data: any) => {
        return data
      })

    const start = new Date().getTime()
    const res = await fetch("/api/file", {
      method: "POST",
      body: JSON.stringify({
        image: image,
        prompt: prompt,
      }),
    })
    const end = new Date().getTime()
    setTimeDiff((end - start) / 1000)

    const img_blob = await res.blob()
    const resImageUrl = URL.createObjectURL(img_blob)
    setImageUrl(resImageUrl)
    setLoading(false)
  }

  return (
    <div className="container flex max-h-screen max-w-6xl flex-col items-center justify-center ">
      <div className="appearQuick flex w-full flex-col items-center gap-3 rounded-xl border border-zinc-800/50 border-b-zinc-900/40 border-t-zinc-700/60 bg-gradient-to-b from-zinc-800/40 via-zinc-900/50 to-zinc-900/40 px-5 py-3 sm:h-[35rem]">
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
          <div className="relative flex-1 overflow-hidden rounded-lg border border-input">
            {imageUrl && (
              <Image
                width={50}
                className={cn("size-full transition-all", {
                  "blur-md animate-pulse transition-all": loading,
                })}
                height={50}
                alt="Generated image"
                src={imageUrl}
              ></Image>
            )}
            {timeDiff && <div className={cn("absolute bottom-0 right-0 py-0.5 px-3 text-sm bg-zinc-800 border-2 border-zinc-700 rounded-xl m-1 font-mono flex gap-2 opacity-100 transition-opacity ease-in-out duration-200", {"opacity-0":loading})}>{timeDiff}s</div>}
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="flex-1 placeholder:opacity-50"
            placeholder="Describe your drawing..."
          />
          <Button
            onClick={submitDrawing}
            disabled={loading || prompt.trim() === ""}
            className="border-input pr-2"
            variant={"outline"}
            size="icon"
          >
            <span className="rotate-45">
              <SendIcon />
            </span>
          </Button>
          <Button
            className=" border border-green-700/20 bg-green-800/20 hover:bg-green-800/50"
            variant={"outline"}
            size="icon"
          >
            <Check />
          </Button>
        </div>
      </div>
    </div>
  )
}
