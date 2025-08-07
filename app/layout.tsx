import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lalita Sahasranama - Sacred Names of the Divine Mother",
  description: "Discover the 1000 sacred names of Goddess Lalita Tripurasundari with meanings in English and Hindi. A spiritual journey of devotion and enlightenment.",
  keywords: "Lalita Sahasranama, Divine Mother, Goddess Lalita, Sanskrit names, spiritual practice, devotion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <script src="/scripts/register-sw.js" defer></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
