"use client"

import { useEffect, useState } from "react"
import { Loader2, Sparkles, Heart, Star } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 flex items-center justify-center transition-all duration-500">
      <div className="text-center space-y-8 max-w-2xl px-6">
        {/* Divine Lotus Animation */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 dark:from-amber-600 dark:via-orange-600 dark:to-red-600 opacity-75"></div>
          </div>
          <div className="relative">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 dark:from-amber-500 dark:via-orange-500 dark:to-red-500 flex items-center justify-center shadow-2xl animate-pulse">
              <div className="relative">
                <Sparkles className="h-12 w-12 text-white animate-spin-slow" />
                <Star className="absolute top-1 right-1 h-4 w-4 text-amber-200 animate-pulse" />
                <Heart className="absolute bottom-1 left-1 h-4 w-4 text-red-200 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        </div>

        {/* Sacred Title */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent animate-fade-in font-sanskrit">
            ॐ श्री ललिता सहस्रनाम ॐ
          </h2>
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 dark:from-amber-300 dark:via-orange-300 dark:to-red-300 bg-clip-text text-transparent">
            Lalita Sahasranama
          </h3>
          {message && (
            <p className="text-lg text-amber-800 dark:text-amber-200 animate-fade-in-delay">
              {message}
            </p>
          )}
        </div>

        {/* Spiritual Quote */}
        <div className={`transition-all duration-1000 ${showQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-gradient-to-r from-amber-100/80 via-orange-100/80 to-red-100/80 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-red-900/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 dark:border-amber-800 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-3">
                <Heart className="h-4 w-4 text-white animate-pulse" />
              </div>
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                Divine Wisdom
              </span>
            </div>
            <blockquote className="text-lg italic text-amber-900 dark:text-amber-100 leading-relaxed font-medium">
              "{quote}"
            </blockquote>
          </div>
        </div>

        {/* Sacred Loading Dots */}
        <div className="flex justify-center space-x-3">
          <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
