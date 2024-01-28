import Link from "next/link"
import { Github, Twitter } from "lucide-react"

import { siteConfig } from "@/config/site"

import AccountMenu from "./account-menu"
import { MainNav } from "./main-nav"
import { buttonVariants } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Github className="size-5 fill-current" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({ size: "icon", variant: "ghost" })}
              >
                <Twitter className="size-5 fill-current transition-transform duration-300 ease-in-out hover:rotate-[25deg]" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <AccountMenu />
          </nav>
        </div>
      </div>
    </header>
  )
}
