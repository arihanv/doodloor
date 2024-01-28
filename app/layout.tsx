import "@/styles/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ApplicationProvider } from "@/ApplicationProvider"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen bg-background", inter.className)}>
          <ApplicationProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex flex-1">{children}</div>
            </div>
            <Toaster position="top-center"/>
          </ApplicationProvider>
          <TailwindIndicator />
        </body>
      </html>
    </>
  )
}
