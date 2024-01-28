import React from "react"

import TiltCard from "@/components/tilt-card"

import supabase from "../api/supabaseServer"

type Props = {}

export const revalidate = 15

type GalleryRow = {
  id: number
  prompt: string
  user_name: string
  created_at: string
  image_url: string
}

export default async function Gallery({}: Props) {
  const { data, error } = await supabase.from("gallery").select("*")
  const galleryData: GalleryRow[] | null = data || null
  return (
    <section className="appearQuick container grid max-h-screen gap-6 pb-8 pt-6">
      <div className="grid grid-cols-4 flex-col gap-4">
        {galleryData?.map((row: GalleryRow, index: number) => {
          return (
            <div key={index}>
              <TiltCard
                scale={1}
                user_name={row.user_name}
                image_url={row.image_url}
                prompt={row.prompt}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
