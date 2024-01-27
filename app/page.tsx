import { Cedarville_Cursive } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { auth } from "@/authOptions";

import { Button, buttonVariants } from "@/components/ui/button"

import controlImg from "../assets/control.png"
import { cn } from '../lib/utils';

const cursive = Cedarville_Cursive({ weight: "400", subsets: ["latin"] })

export default async function IndexPage() {
  const session = await auth();
  return (
    <section className="container grid max-h-screen items-center justify-center gap-6 pb-8 pt-6">
      <div className="flex max-w-3xl flex-col items-center gap-4">
        <div className="space-y-1">
          <div className="flex flex-col items-center gap-5">
            <div className="mt-2 max-w-3xl bg-gradient-to-b from-white to-zinc-400 bg-clip-text py-4 text-center text-4xl font-bold leading-[1.125] tracking-tight text-transparent sm:text-7xl">
              Turn a Doodle Into A{" "}
              <span
                className={cn(
                  cursive.className,
                  "bg-gradient-to-r from-white via-orange-200 to-orange-600 bg-clip-text p-2 text-transparent"
                )}
              >
                Masterpiece
              </span>
            </div>
          </div>
          <Link
            target="_"
            href="https://twitter.com/ar1hanv"
            className="group relative mx-auto flex w-fit"
          >
            <span className="border-lg gap-1 rounded-xl border px-2.5 py-0.5 text-sm font-medium">
              By{" "}
              <span className="bg-gradient-to-r from-white via-orange-200 to-orange-600 bg-clip-text text-transparent">
                @ar1hanv
              </span>
            </span>
            <span className="absolute -right-1.5 -top-1.5 z-10 flex size-4 items-center justify-center rounded-full border-t border-t-zinc-800 bg-zinc-900/50 text-zinc-400 shadow-lg backdrop-blur-sm transition-all duration-200  ease-in-out group-hover:border-t-orange-600 group-hover:bg-orange-700 group-hover:text-white">
              <ArrowUpRight size={13} />
            </span>
          </Link>
        </div>

        <div className="hero relative flex h-fit flex-col items-center gap-3 rounded-xl border border-zinc-800/50 border-b-zinc-900/40 border-t-zinc-700/60 bg-gradient-to-b from-zinc-800/40 via-zinc-900/50 to-zinc-900/40 px-5">
          <div className="flex flex-col items-center gap-3 py-3">
            <span className="font-medium text-zinc-500">Doodloor-Bot</span>
            <div className="grid size-full flex-1 grid-cols-2 gap-5 ">
              <Image
                alt="scribble"
                src={controlImg}
                width={0}
                height={0}
                className="h-full rounded-lg border-2 border-zinc-800/50"
              />
              <Image
                alt="scribble"
                src={controlImg}
                width={0}
                height={0}
                className="fadeIn botImage h-full overflow-hidden rounded-lg border-2 border-zinc-800/50"
              />
            </div>
            <span className="flex w-full justify-center rounded-lg border-2 border-zinc-800/50 bg-zinc-900/20 py-1 font-medium text-white">
              &quot;A bedroom in space&quot;
            </span>
          </div>
          <div className="appear absolute flex size-full flex-col rounded-xl bg-black/70">
            <Link
              href={session ? "/studio" : "/api/auth/signin"}
              className={cn(buttonVariants({variant: "secondary"}), "m-auto flex rounded-md border-t-2 border-orange-500 bg-orange-600 text-lg font-medium transition-colors duration-200 ease-in-out hover:border-orange-400 hover:bg-orange-500")}
            >
              <span className="font-medium text-white">Try For Free!</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
