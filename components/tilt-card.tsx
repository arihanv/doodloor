"use client"

import React from "react"
import Image from "next/image"
import ReactParallaxTilt from "react-parallax-tilt"

import { cn } from "@/lib/utils"

type Props = {
  user_name: string
  image_url: string
  prompt: string
  scale?: number
  imageSettings?: {
    width: number
    height: number
  }
  appearAnimation?: boolean
}

export default function TiltCard({
  user_name,
  image_url,
  prompt,
  scale,
  imageSettings,
  appearAnimation,
}: Props) {
  return (
    <ReactParallaxTilt
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-800/70 via-zinc-900 to-zinc-900/80",
        { imgCard: appearAnimation }
      )}
      scale={scale ?? 1.1}
      glareEnable
    >
      <div className="flex flex-col items-center rounded-xl">
        <div className="py-2 font-medium text-white/50">
          {"🎨 by " + user_name || "Anonymous"}
        </div>
        <Image
          unoptimized
          alt="Generated Image"
          className="size-full"
          src={image_url}
          height={imageSettings?.height ?? 40}
          width={imageSettings?.width ?? 40}
        ></Image>
        <div className="px-3 py-2">
          <span className="line-clamp-3 text-center text-sm font-medium text-white/50">
            &quot;{prompt}&quot;
          </span>
        </div>
      </div>
    </ReactParallaxTilt>
  )
}
