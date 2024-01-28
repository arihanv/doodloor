import { NextResponse, type NextRequest } from "next/server"

export const POST = async (req: Request) => {
  const body = await req.json()

  const formData = new FormData()
  formData.append("prompt", body.prompt)
  formData.append("image", body.image)

  const res = await fetch(`${process.env.MODAL_URL}/run_model`, {
    method: "POST",
    body: formData,
  })

  const blob = await res.blob()

  const headers = new Headers()

  headers.set("Content-Type", "image/*")

  return new NextResponse(blob, { status: 200, statusText: "OK", headers })
}
