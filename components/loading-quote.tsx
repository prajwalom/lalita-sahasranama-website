"use client"

import { useEffect, useState } from "react"
import { Loader2, Sparkles } from 'lucide-react'

const loadingQuotes = [
  "Preparing your sacred journey...",
  "Loading divine wisdom...",
  "Connecting to the cosmic consciousness...",
  "Awakening spiritual energies...",
  "Invoking the Divine Mother's blessings...",
  "Opening the gates of devotion...",
  "Channeling sacred vibrations...",
  "Illuminating the path of dharma..."
]

export function LoadingQuote() {
  const [isLoading, setIsLoading] = useState(true)
  const [quote, setQuote] = useState("")

  useEffect(() => {
    const randomQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]
    setQuote(randomQuote)
    
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <Sparkles className="h-16 w-16 text-rose-500 mx-auto animate-pulse" />
          <Loader2 className="h-8 w-8 text-rose-400 animate-spin absolute top-4 left-1/2 transform -translate-x-1/2" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Lalita Sahasranama
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
            {quote}
          </p>
        </div>
      </div>
    </div>
  )
}
