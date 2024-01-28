import React from 'react'
import supabase from '../api/supabaseServer'
import ReactParallaxTilt from 'react-parallax-tilt'
import Image from 'next/image'
import TiltCard from '@/components/tilt-card'
type Props = {}

const revalidate = 0

type GalleryRow = {
    id: number
    prompt: string
    user_name: string
    created_at: string
    image_url: string
}

export default async function Gallery({}: Props) {
const { data, error } = await supabase.from('gallery').select('*');
const galleryData: GalleryRow[] | null = data || null;
  return (
    <section className="container grid max-h-screen gap-6 pb-8 pt-6 appearQuick">
      <div className="grid grid-cols-4 flex-col gap-4">{
        galleryData?.map((row: GalleryRow) => {
            return (
                <div>
               <TiltCard scale={1} user_name={row.user_name} image_url={row.image_url}  prompt={row.prompt}/>
               </div>
            )
        }
        )
    }</div>
    </section>
  )
}