import React from "react"
import Image from "next/image"
import { Check, Download, X } from "lucide-react"
import { useSession } from "next-auth/react"
import ReactParallaxTilt from "react-parallax-tilt"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"
import Link from "next/link"

type Props = {
  imageUrl: string
  prompt: string
}

export default function ArtSaver({ imageUrl, prompt }: Props) {
  const [open, setOpen] = React.useState(false)
  const session = useSession()
  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger disabled={!imageUrl || !prompt} asChild>
          <Button
            className=" border border-green-700/20 bg-green-800/20 hover:bg-green-800/50"
            variant={"outline"}
            size="icon"
          >
            <Check />
          </Button>
        </DialogTrigger>
        <DialogContent className="border-none bg-transparent shadow-none sm:max-w-[425px] ">
          <ReactParallaxTilt
            className="overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-800/70 via-zinc-900 to-zinc-900/80 imgCard"
            scale={1.1}
            glareEnable
          >
            <div className="flex flex-col items-center rounded-xl">
              <div className="py-2 font-medium text-white/50">
                {"🎨 by " + session.data?.user?.name || "Anonymous"}
              </div>
              <Image
                alt="Generated Image"
                className="size-full"
                src={imageUrl}
                height={50}
                width={50}
              ></Image>
              <div className="py-2 font-medium text-white/50">
                &quot;{prompt}&quot;
              </div>
            </div>
          </ReactParallaxTilt>
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
              <button className="rounded-lg border bg-zinc-900/50 px-3 py-0.5 font-medium">
                Publish To Gallery
              </button>
              <Link download={Math.floor(Math.random() * 100000).toString() + ".png"} href={imageUrl} className="rounded-lg border bg-zinc-900/50 px-3 py-1 font-medium">
                <Download size={20}/>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
