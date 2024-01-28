import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/authOptions"

import supabase from "@/app/api/supabaseServer"

type ImageUpload = {
  path: string
  id: string
  fullPath: string
}

export const POST = async (req: NextRequest) => {
  const session = await auth()
  const body = await req.formData()

  const image = body.get("image")
  const prompt = body.get("prompt")

  if (!image || !prompt) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" })
  }

  var imageId = randomUUID()

  const { data: galleryImage, error: imageUploadError } = await supabase.storage
    .from("galleryImages")
    .upload(`public/${imageId}.png`, image, {
      cacheControl: "3600",
      upsert: false,
    })

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${
    (galleryImage as ImageUpload).fullPath
  }`

  const { data: galleryInsert, error: galleryInsertError } = await supabase
    .from("gallery")
    .insert([
      {
        image_url: imageUrl,
        prompt: prompt,
        user_name: session?.user?.name,
        user_email: session?.user?.email,
      },
    ])

  if (imageUploadError || galleryInsertError) {
    return new NextResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    })
  }

  return new NextResponse(null, { status: 200, statusText: "OK" })
}
