"use client"

import React from "react"
import Image from "next/image"
import ReactParallaxTilt from "react-parallax-tilt"

type Props = {
  user_name: string
  image_url: string
  prompt: string
  scale?: number
  imageSettings?: {
    width: number
    height: number
  }
}

export default function TiltCard({
  user_name,
  image_url,
  prompt,
  scale,
  imageSettings,
}: Props) {
  return (
    <ReactParallaxTilt
      className="imgCard overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-800/70 via-zinc-900 to-zinc-900/80"
      scale={scale ?? 1.1}
      glareEnable
    >
      <div className="flex flex-col items-center rounded-xl">
        <div className="py-2 font-medium text-white/50">
          {"🎨 by " + user_name || "Anonymous"}
        </div>
        <Image
          alt="Generated Image"
          className="size-full"
          src={image_url}
          height={imageSettings?.height ?? 50}
          width={imageSettings?.width ?? 50}
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
