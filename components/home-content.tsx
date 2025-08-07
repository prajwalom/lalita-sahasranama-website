"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, Sparkles, Star, Zap, ArrowDown, Crown, Flame } from 'lucide-react'
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageLoader } from "@/components/page-loader"
import { ChatBox } from "@/components/chat-box"

const devotionalQuotes = [
  "The Divine Mother is the source of all creation, preservation, and transformation.",
  "In the sacred names of Lalita, find the path to inner peace and divine love.",
  "Each name is a doorway to the infinite, a step closer to the Divine.",
  "Through devotion and surrender, the heart becomes a temple of the Divine Mother.",
  "The thousand names are like a thousand lights illuminating the path to liberation."
]

const dailyVerses = [
  {
    sanskrit: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके",
    english: "She who is the auspiciousness of all auspicious things, the consort of Shiva, the fulfiller of all desires",
    meaning: "Invoke the Divine Mother for blessings and fulfillment of righteous desires"
  },
  {
    sanskrit: "श्री ललिता त्रिपुरसुन्दरी",
    english: "The beautiful Goddess of the three worlds",
    meaning: "Meditate on the supreme beauty that transcends all realms"
  }
]

export function HomeContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 300)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout

    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        const currentScroll = window.pageYOffset
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        
        if (currentScroll >= maxScroll) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.scrollBy({ top: 100, behavior: 'smooth' })
        }
      }, 2000)
    }

    return () => {
      if (scrollInterval) clearInterval(scrollInterval)
    }
  }, [isAutoScrolling])

  const todayVerse = dailyVerses[new Date().getDate() % dailyVerses.length]
  const todayQuote = devotionalQuotes[new Date().getDate() % devotionalQuotes.length]

  return (
    <>
      <PageLoader isLoading={isLoading} message="Preparing your sacred journey..." />
      
      <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Sacred Header */}
        <header className="border-b border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-100/80 via-orange-100/80 to-red-100/80 dark:from-amber-900/80 dark:via-orange-900/80 dark:to-red-900/80 backdrop-blur-sm sticky top-0 z-40 animate-slide-down shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 flex items-center justify-center animate-pulse shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 dark:from-amber-300 dark:via-orange-300 dark:to-red-300 bg-clip-text text-transparent">
                  Lalita Sahasranama
                </h1>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-sanskrit">श्री ललिता सहस्रनाम</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`hover:scale-105 transition-transform border-amber-300 dark:border-amber-700 ${isAutoScrolling ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800' : ''}`}
              >
                <ArrowDown className={`h-4 w-4 mr-2 text-amber-600 dark:text-amber-400 ${isAutoScrolling ? 'animate-bounce' : ''}`} />
                <span className="text-amber-700 dark:text-amber-300">{isAutoScrolling ? 'Stop Scroll' : 'Auto Scroll'}</span>
              </Button>
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white hover:scale-105 transition-all shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Divine Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="mb-12 animate-fade-in-up">
              <div className="relative mb-8">
                <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-2xl animate-pulse">
                  <div className="relative">
                    <Flame className="h-10 w-10 text-white animate-float" />
                    <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-amber-200 animate-spin-slow" />
                  </div>
                </div>
                <div className="absolute inset-0 animate-ping opacity-30">
                  <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 mb-6"></div>
                </div>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent animate-gradient font-sanskrit">
                ॐ श्री ललिता ॐ
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 dark:from-amber-300 dark:via-orange-300 dark:to-red-300 bg-clip-text text-transparent">
                Divine Names
              </h3>
              <p className="text-xl md:text-2xl text-amber-800 dark:text-amber-200 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
                Discover the sacred thousand names of Goddess Lalita Tripurasundari. 
                Each name is a pathway to divine consciousness and spiritual awakening.
              </p>
            </div>

            {/* Sacred Daily Quote */}
            <Card className="max-w-5xl mx-auto mb-12 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-red-100/70 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-red-900/40 backdrop-blur-sm border-amber-200 dark:border-amber-800 hover:shadow-2xl transition-all duration-500 animate-fade-in-up shadow-xl" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                    Daily Divine Inspiration
                  </span>
                </div>
                <blockquote className="text-xl md:text-2xl italic text-amber-900 dark:text-amber-100 mb-4 font-medium">
                  "{todayQuote}"
                </blockquote>
              </CardContent>
            </Card>

            {/* Sacred Verse of the Day */}
            <Card className="max-w-5xl mx-auto mb-12 bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 dark:from-orange-900/30 dark:via-red-900/30 dark:to-pink-900/30 border-orange-300 dark:border-orange-700 hover:shadow-2xl transition-all duration-500 animate-fade-in-up shadow-xl" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-3">
                    <Sparkles className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                    Sacred Verse of the Day
                  </span>
                </div>
                <div className="space-y-6">
                  <p className="text-3xl font-sanskrit text-orange-800 dark:text-orange-200 animate-fade-in leading-relaxed">
                    {todayVerse.sanskrit}
                  </p>
                  <p className="text-xl text-orange-700 dark:text-orange-300 italic animate-fade-in-delay">
                    {todayVerse.english}
                  </p>
                  <p className="text-lg text-orange-600 dark:text-orange-400 animate-fade-in-delay-2">
                    {todayVerse.meaning}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Divine CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link href="/auth/signup">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-10 py-4 text-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                  <Star className="h-6 w-6 mr-3" />
                  Begin Sacred Journey
                </Button>
              </Link>
              <Link href="/sahasranama">
                <Button variant="outline" size="lg" className="px-10 py-4 text-xl border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 hover:scale-105 transition-all duration-300 shadow-lg">
                  <BookOpen className="h-6 w-6 mr-3" />
                  Complete Sahasranama
                </Button>
              </Link>
              <Link href="/namaavali">
                <Button variant="outline" size="lg" className="px-10 py-4 text-xl border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 hover:scale-105 transition-all duration-300 shadow-lg">
                  <Zap className="h-6 w-6 mr-3" />
                  Explore Sacred Names
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Divine Features Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-100/50 via-orange-100/50 to-red-100/50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20">
          <div className="container mx-auto">
            <h3 className="text-4xl font-bold text-center mb-16 text-amber-800 dark:text-amber-200 animate-fade-in-up">
              Sacred Features
            </h3>
            <div className="grid md:grid-cols-3 gap-10">
              <Card className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up border-amber-200 dark:border-amber-800" style={{ animationDelay: '0.1s' }}>
                <CardContent className="pt-8">
                  <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-xl">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold mb-4 text-amber-800 dark:text-amber-200">
                    Complete Sahasranama
                  </h4>
                  <p className="text-amber-700 dark:text-amber-300 text-lg leading-relaxed">
                    All 1000 sacred names with detailed English and Hindi meanings for deep spiritual understanding.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/40 dark:to-red-900/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up border-orange-200 dark:border-orange-800" style={{ animationDelay: '0.2s' }}>
                <CardContent className="pt-8">
                  <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold mb-4 text-orange-800 dark:text-orange-200">
                    Daily Sacred Verses
                  </h4>
                  <p className="text-orange-700 dark:text-orange-300 text-lg leading-relaxed">
                    Receive daily sacred verses and divine inspirational quotes for continuous spiritual growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/40 dark:to-pink-900/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up border-red-200 dark:border-red-800" style={{ animationDelay: '0.3s' }}>
                <CardContent className="pt-8">
                  <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-xl">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold mb-4 text-red-800 dark:text-red-200">
                    Offline Devotion
                  </h4>
                  <p className="text-red-700 dark:text-red-300 text-lg leading-relaxed">
                    Access your spiritual practice anywhere with full offline functionality and divine guidance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sacred Footer */}
        <footer className="py-12 px-4 bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center mr-3">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-semibold">Lalita Sahasranama</span>
            </div>
            <p className="text-amber-200 mb-6 text-lg">
              A sacred digital sanctuary for devotees of the Divine Mother
            </p>
            <p className="text-sm text-amber-300">
              © 2024 Lalita Sahasranama. Created with devotion, love, and divine blessings.
            </p>
          </div>
        </footer>

        {/* Divine Chat Box */}
        <ChatBox />
      </div>
    </>
  )
}
