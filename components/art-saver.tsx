import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Download, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { revalidateGallery } from "@/app/studio/actions"

import TiltCard from "./tilt-card"
import { Button } from "./ui/button"

type Props = {
  imageBlob: Blob
  prompt: string
}

export default function ArtSaver({ imageBlob, prompt }: Props) {
  const submissionRef = React.useRef<boolean>(false)
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const session = useSession()

  async function publishToGallery(image: Blob) {
    setLoading(true)
    const formData = new FormData()
    formData.append("image", image)
    formData.append("prompt", prompt)

    const res = fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    })
    toast.promise(res, {
      loading: "Uploading...",
      success: () => {
        revalidateGallery()
        router.push("/gallery")
        return "Uploaded!"
      },
      error: "Error uploading image",
    })
    return
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger disabled={!imageBlob || !prompt} asChild>
          <Button
            className=" border border-green-700/20 bg-green-800/20 hover:bg-green-800/50"
            variant={"outline"}
            size="icon"
          >
            <Check />
          </Button>
        </DialogTrigger>
        <DialogContent className="border-none bg-transparent shadow-none sm:max-w-[425px] ">
          <TiltCard
            appearAnimation
            image_url={URL.createObjectURL(imageBlob)}
            user_name={session.data?.user?.name || "Anonymous"}
            prompt={prompt}
          />
          <div
            className={cn(
              "appearQuick fixed inset-x-0 bottom-0 z-[51] mx-auto mb-5 mt-10 grid w-full max-w-lg translate-y-24 place-items-center rounded-lg border border-zinc-800/50 border-b-zinc-900/40 border-t-zinc-700/60 bg-gradient-to-b from-zinc-700/40 via-zinc-800/50 to-zinc-800/40 px-5 py-2",
              { hidden: !open }
            )}
          >
            <div className="flex w-full justify-between">
              <button
                className="rounded-lg border bg-zinc-900/50 px-3 py-1  font-medium"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
              <button
                disabled={loading}
                onClick={() => publishToGallery(imageBlob)}
                className={cn(
                  "rounded-lg border bg-zinc-900/50 px-3 py-0.5 font-medium opacity-100 transition-opacity duration-100 ease-in-out",
                  { "opacity-20": loading }
                )}
              >
                Publish To Gallery
              </button>
              <Link
                download={
                  Math.floor(Math.random() * 100000).toString() + ".png"
                }
                href={URL.createObjectURL(imageBlob)}
                className="rounded-lg border bg-zinc-900/50 px-3 py-1 font-medium"
              >
                <Download size={20} />
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
