"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Heart, Star, User, TrendingUp, Clock, Target, Sparkles, ArrowDown } from 'lucide-react'
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageLoader } from "@/components/page-loader"
import { ChatBox } from "@/components/chat-box"
import { useToast } from "@/hooks/use-toast"

// Sample data - you can replace this with your actual data
const sampleNames = [
  {
    id: 1,
    number: 1,
    sanskrit: "श्री माता",
    transliteration: "Shri Mata",
    english: "The Divine Mother",
    hindi: "दिव्य माता",
    meaning: "She who is the supreme mother of all creation, the source of all love and compassion.",
    category: "Divine Attributes"
  },
  {
    id: 2,
    number: 2,
    sanskrit: "श्री महाराज्ञी",
    transliteration: "Shri Maharajni",
    english: "The Great Queen",
    hindi: "महान रानी",
    meaning: "She who rules over all the three worlds with supreme authority and grace.",
    category: "Royal Titles"
  },
  {
    id: 3,
    number: 3,
    sanskrit: "श्रीमत्सिंहासनेश्वरी",
    transliteration: "Shrimat Simhasaneshwari",
    english: "The Goddess of the Lion Throne",
    hindi: "सिंहासन की देवी",
    meaning: "She who sits on the divine throne supported by lions, symbolizing power and majesty.",
    category: "Divine Throne"
  }
]

const dailyVerse = {
  sanskrit: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके",
  english: "She who is the auspiciousness of all auspicious things",
  meaning: "Today, invoke the Divine Mother for blessings in all your endeavors."
}

const userStats = {
  namesStudied: 47,
  totalNames: 1000,
  streakDays: 12,
  totalTime: "2h 34m",
  favoriteNames: 8
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([1, 3])
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)

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

  const filteredNames = sampleNames.filter(name =>
    name.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.english.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFavorite = (nameId: number) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(nameId)
      const newFavorites = isCurrentlyFavorite 
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    
      setTimeout(() => {
        toast({
          title: isCurrentlyFavorite ? "Removed from Favorites" : "Added to Favorites ⭐",
          description: isCurrentlyFavorite 
            ? "Name removed from your sacred collection"
            : "Name saved to your sacred collection",
        })
      }, 0)
    
      return newFavorites
    })
  }

  const handleAutoScrollToggle = () => {
    const newState = !isAutoScrolling
    setIsAutoScrolling(newState)
    
    setTimeout(() => {
      toast({
        title: newState ? "Auto-scroll Started 📜" : "Auto-scroll Stopped",
        description: newState 
          ? "The page will scroll smoothly through all content."
          : "Manual scrolling restored.",
      })
    }, 0)
  }

  if (isLoading) {
    return <PageLoader isLoading={true} message="Loading your spiritual dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 animate-fade-in">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 animate-slide-down">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Lalita Sahasranama
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAutoScrollToggle}
              className={`hover:scale-105 transition-transform ${isAutoScrolling ? 'bg-rose-100 dark:bg-rose-900' : ''}`}
            >
              <ArrowDown className={`h-4 w-4 mr-2 ${isAutoScrolling ? 'animate-bounce' : ''}`} />
              {isAutoScrolling ? 'Stop Scroll' : 'Auto Scroll'}
            </Button>
            <Link href="/sahasranama">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <BookOpen className="h-4 w-4 mr-2" />
                Sahasranama
              </Button>
            </Link>
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Welcome to Your Sacred Journey
          </h2>
          
          {/* User Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-rose-200 dark:border-rose-800 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{userStats.namesStudied}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Names Studied</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-rose-200 dark:border-rose-800 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{userStats.streakDays}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-rose-200 dark:border-rose-800 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{userStats.totalTime}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-rose-200 dark:border-rose-800 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{userStats.favoriteNames}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Daily Verse Card */}
          <Card className="mb-6 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 border-rose-300 dark:border-rose-700 hover:shadow-lg transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-rose-600 mr-2 animate-pulse" />
                <span className="text-sm font-medium text-rose-700 dark:text-rose-300 uppercase tracking-wide">
                  Today's Sacred Verse
                </span>
              </div>
              <p className="text-xl font-sanskrit text-rose-800 dark:text-rose-200 mb-2">
                {dailyVerse.sanskrit}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-2">
                {dailyVerse.english}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {dailyVerse.meaning}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, transliteration, or meaning..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-rose-200 dark:border-rose-800 focus:border-rose-400 dark:focus:border-rose-600 hover:shadow-md transition-all"
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:scale-105 transition-transform">All</Badge>
              <Badge variant="outline" className="cursor-pointer hover:scale-105 transition-transform">Divine Attributes</Badge>
              <Badge variant="outline" className="cursor-pointer hover:scale-105 transition-transform">Royal Titles</Badge>
            </div>
          </div>
        </div>

        {/* Names Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNames.map((name, index) => (
            <Card key={name.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-rose-200 dark:border-rose-800 hover:border-rose-300 dark:hover:border-rose-700 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${0.7 + index * 0.1}s` }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs animate-pulse">
                    #{name.number}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {name.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-rose-800 dark:text-rose-200 font-sanskrit hover:text-rose-900 dark:hover:text-rose-100 transition-colors">
                  {name.sanskrit}
                </CardTitle>
                <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                  {name.transliteration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">English:</p>
                    <p className="text-gray-800 dark:text-gray-200">{name.english}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Hindi:</p>
                    <p className="text-gray-800 dark:text-gray-200">{name.hindi}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Meaning:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{name.meaning}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-rose-600 border-rose-300 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-700 dark:hover:bg-rose-900/20 hover:scale-105 transition-all">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Learn More
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleFavorite(name.id)}
                    className={`transition-all duration-300 hover:scale-110 ${
                      favorites.includes(name.id) 
                        ? 'text-rose-500 hover:text-rose-600' 
                        : 'text-gray-400 hover:text-rose-500'
                    }`}
                  >
                    <Star className={`h-4 w-4 ${favorites.includes(name.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Names
          </Button>
        </div>
      </div>

      {/* Chat Box */}
      <ChatBox />
    </div>
  )
}
