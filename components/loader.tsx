"use client"

import { useEffect, useState } from "react"
import { Loader2, Sparkles, NotebookIcon as Lotus, Heart } from 'lucide-react'

const spiritualQuotes = [
  "श्री माता - The Divine Mother embraces all with unconditional love",
  "Each sacred name is a key to unlock divine consciousness",
  "In devotion to Lalita, find the path to eternal bliss",
  "The thousand names are like pearls on the thread of devotion",
  "Through surrender to the Divine Mother, all obstacles dissolve",
  "Every repetition of Her name purifies the heart and mind",
  "In the silence between names, experience the Divine presence",
  "The Divine Mother's grace flows to those who call Her name",
  "Each verse carries the power to transform consciousness",
  "Lalita Tripurasundari - The beauty that transcends all worlds",
  "In the sacred syllables, find the rhythm of the cosmos",
  "The Divine Mother's love knows no boundaries or conditions",
  "Through devotion, the finite merges with the infinite",
  "Every name is a doorway to the Divine Mother's heart",
  "In chanting Her names, discover your true divine nature"
]

interface PageLoaderProps {
  isLoading: boolean
  message?: string
}

export function PageLoader({ isLoading, message }: PageLoaderProps) {
  const [quote, setQuote] = useState("")
  const [showQuote, setShowQuote] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const randomQuote = spiritualQuotes[Math.floor(Math.random() * spiritualQuotes.length)]
      setQuote(randomQuote)
      
      const timer = setTimeout(() => {
        setShowQuote(true)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setShowQuote(false)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center transition-all duration-500">
      <div className="text-center space-y-8 max-w-2xl px-6">
        {/* Animated Lotus */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <Lotus className="h-20 w-20 text-rose-300 dark:text-rose-600 mx-auto opacity-75" />
          </div>
          <div className="relative animate-pulse">
            <Lotus className="h-20 w-20 text-rose-500 dark:text-rose-400 mx-auto" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="h-8 w-8 text-rose-600 dark:text-rose-300 animate-spin" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-fade-in">
            Lalita Sahasranama
          </h2>
          {message && (
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in-delay">
              {message}
            </p>
          )}
        </div>

        {/* Spiritual Quote */}
        <div className={`transition-all duration-1000 ${showQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 border border-rose-200 dark:border-rose-800">
            <div className="flex items-center justify-center mb-3">
              <Heart className="h-5 w-5 text-rose-500 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                Divine Wisdom
              </span>
            </div>
            <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
              "{quote}"
            </blockquote>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
