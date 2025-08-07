"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Play, Pause, RotateCcw, BookOpen, Heart, Settings, Share2, Star, Timer, Zap, Sparkles, ArrowDown, Crown, Flame, Volume2, Brain, Scroll, Type, Palette, Image, Target, Menu, X } from 'lucide-react'
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageLoader } from "@/components/page-loader"
import { ChatBox } from "@/components/chat-box"
import { FontControls } from "@/components/font-controls"
import { useToast } from "@/hooks/use-toast"
import { StudyProgress } from "@/components/study-progress"
import { VerseBookmarks } from "@/components/verse-bookmarks"
import { PronunciationGuide } from "@/components/pronunciation-guide"
import { QuizMode } from "@/components/quiz-mode"
import { DetailedCommentary } from "@/components/detailed-commentary"
import { SriChakraBackground } from "@/components/sri-chakra-background"

// Sample verses data with enhanced structure
const sampleVerses = [
  {
    id: 1,
    verseNumber: 1,
    sanskrit: "श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी।\nचिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥",
    transliteration: "Shri mata shri maharajni shrimat simhasaneshwari |\nChidagnikunda sambhuta deva karya samudyata ||",
    english: "The Divine Mother, the Great Queen, the Goddess of the magnificent throne,\nBorn from the fire-pit of consciousness, ever ready for divine work.",
    hindi: "दिव्य माता, महान रानी, भव्य सिंहासन की देवी,\nचेतना की अग्निकुंड से जन्मी, दिव्य कार्य के लिए सदा तत्पर।",
    meaning: "This opening verse establishes the Divine Mother as the supreme ruler who emerged from pure consciousness to fulfill cosmic duties.",
    names: ["श्री माता", "श्री महाराज्ञी", "श्रीमत्सिंहासनेश्वरी", "चिदग्निकुण्डसम्भूता", "देवकार्यसमुद्यता"],
    imageUrl: "/images/verse-1.jpg"
  },
  {
    id: 2,
    verseNumber: 2,
    sanskrit: "उद्यद्भानुसहस्राभा चतुर्बाहुसमन्विता।\nरागस्वरूपपाशाढ्या क्रोधाकारांकुशोज्ज्वला॥",
    transliteration: "Udyad bhanu sahasrabha chaturbahu samanvita |\nRaga svarupa pashaDhya krodhakaran kushojjvala ||",
    english: "Radiant as a thousand rising suns, endowed with four arms,\nHolding the noose of attachment and the goad of righteous anger bright.",
    hindi: "हजार उदीयमान सूर्यों के समान तेजस्वी, चार भुजाओं से युक्त,\nराग रूपी पाश और क्रोध रूपी अंकुश से शोभित।",
    meaning: "This verse describes Her luminous form and the divine weapons She holds to guide devotees on the spiritual path.",
    names: ["उद्यद्भानुसहस्राभा", "चतुर्बाहुसमन्विता", "रागस्वरूपपाशाढ्या", "क्रोधाकारांकुशोज्ज्वला"],
    imageUrl: "/images/verse-2.jpg"
  },
  {
    id: 3,
    verseNumber: 3,
    sanskrit: "मनोरूपेक्षुकोदण्डा पञ्चतन्मात्रसायका।\nनिजारुणप्रभापूरमज्जद्ब्रह्माण्डमण्डला॥",
    transliteration: "Mano rupekshu kodanda pancha tanmatra sayaka |\nNijaruna prabha pura majjad brahmanda mandala ||",
    english: "Holding the sugarcane bow of mind, with five arrows of subtle elements,\nThe entire universe is immersed in Her rosy radiant light.",
    hindi: "मन रूपी ईख के धनुष को धारण करने वाली, पांच तन्मात्राओं के बाण वाली,\nजिसके अरुण प्रकाश में संपूर्ण ब्रह्मांड मंडल डूबा हुआ है।",
    meaning: "Her divine weapons represent the subtle forces that govern creation, and Her radiance pervades all existence.",
    names: ["मनोरूपेक्षुकोदण्डा", "पञ्चतन्मात्रसायका", "निजारुणप्रभापूरमज्जद्ब्रह्माण्डमण्डला"],
    imageUrl: "/images/verse-3.jpg"
  },
  {
    id: 4,
    verseNumber: 4,
    sanskrit: "चम्पकाशोकपुन्नागसौगन्धिकलसत्कचा।\nकुरुविन्दमणिश्रेणीकनत्कोटीरमण्डिता॥",
    transliteration: "Champakashoka punnaga saugandhika lasat kacha |\nKuruvinda mani shreni kanat kotira mandita ||",
    english: "Her hair adorned with champaka, ashoka, punnaga and fragrant flowers,\nDecorated with strings of kuruvinda gems and glittering diadems.",
    hindi: "चम्पा, अशोक, पुन्नाग और सुगंधित फूलों से सुशोभित केश,\nकुरुविन्द मणियों की माला और चमकते मुकुटों से अलंकृत।",
    meaning: "This verse describes the Divine Mother's beautiful hair ornaments and the precious gems that adorn Her divine form.",
    names: ["चम्पकाशोकपुन्नागसौगन्धिकलसत्कचा", "कुरुविन्दमणिश्रेणीकनत्कोटीरमण्डिता"],
    imageUrl: "/images/verse-4.jpg"
  },
  {
    id: 5,
    verseNumber: 5,
    sanskrit: "अष्टमीचन्द्रविभ्राजदलिकस्थलशोभिता।\nमुखचन्द्रकलङ्काभमृगनाभिविशेषका॥",
    transliteration: "Ashtami chandra vibhrajad dalika sthala shobhita |\nMukha chandra kalankabha mriga nabhi viseshaka ||",
    english: "Her forehead shines like the eighth-day moon's crescent,\nHer face like the full moon, marked with the sacred musk-deer's fragrance.",
    hindi: "अष्टमी के चंद्र की भांति चमकते मस्तक से शोभित,\nपूर्ण चंद्र के समान मुख, कस्तूरी मृग की सुगंध से युक्त।",
    meaning: "The Divine Mother's radiant forehead and moon-like face are described with celestial beauty and divine fragrance.",
    names: ["अष्टमीचन्द्रविभ्राजदलिकस्थलशोभिता", "मुखचन्द्रकलङ्काभमृगनाभिविशेषका"],
    imageUrl: "/images/verse-5.jpg"
  }
]

const devotionalQuotes = [
  "Each verse is a doorway to divine consciousness",
  "In the rhythm of Sanskrit lies the heartbeat of the cosmos",
  "The thousand names are like pearls on the thread of devotion",
  "Through repetition comes realization, through realization comes liberation",
  "Every sacred syllable carries the power of transformation",
  "In the silence between verses, experience the Divine presence"
]

const autoScrollSpeeds = [
  { label: '2 seconds', value: 2000 },
  { label: '3 seconds', value: 3000 },
  { label: '4 seconds', value: 4000 },
  { label: '5 seconds', value: 5000 },
  { label: '7 seconds', value: 7000 },
  { label: '10 seconds', value: 10000 }
]

export default function SahasranamaPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentVerse, setCurrentVerse] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(5000)
  const [isPageAutoScrolling, setIsPageAutoScrolling] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [lineHeight, setLineHeight] = useState(1.6)
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [showMeaning, setShowMeaning] = useState(true)
  const [readingTime, setReadingTime] = useState(0)
  const [versesRead, setVersesRead] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showCommentary, setShowCommentary] = useState(false)
  const [selectedVerseForCommentary, setSelectedVerseForCommentary] = useState<typeof sampleVerses[0] | null>(null)
  const [bookmarks, setBookmarks] = useState<{[key: number]: string}>({})
  const [studyNotes, setStudyNotes] = useState<{[key: number]: string}>({})
  const [pronunciationHelp, setPronunciationHelp] = useState(false)
  const [verseComparison, setVerseComparison] = useState<number[]>([])
  const [dailyGoal, setDailyGoal] = useState(10)
  const [versesStudiedToday, setVersesStudiedToday] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const [lastStudiedVerse, setLastStudiedVerse] = useState(0)
  const [studyStreak, setStudyStreak] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
  const pageScrollRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  const filteredVerses = sampleVerses.filter(verse =>
    verse.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verse.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verse.english.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const todayQuote = devotionalQuotes[new Date().getDate() % devotionalQuotes.length]

  // Enhanced verse auto-scroll with configurable speed
  useEffect(() => {
    if (isAutoScrolling && filteredVerses.length > 0) {
      autoScrollRef.current = setInterval(() => {
        setCurrentVerse(prev => {
          const nextVerse = (prev + 1) % filteredVerses.length
          
          // Scroll to the next verse element
          const nextElement = document.getElementById(`verse-${nextVerse}`)
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
          
          if (nextVerse === 0) {
            setTimeout(() => {
              toast({
                title: "🙏 Sahasranama Complete!",
                description: "You have completed the sacred recitation. Om Shri Lalitayai Namaha!",
              })
            }, 100)
          }
          return nextVerse
        })
        setVersesRead(prev => prev + 1)
      }, autoScrollSpeed)

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current)
        }
      }
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
        autoScrollRef.current = null
      }
    }
  }, [isAutoScrolling, autoScrollSpeed, filteredVerses.length, toast])

  // Page auto-scroll functionality
  useEffect(() => {
    if (isPageAutoScrolling) {
      pageScrollRef.current = setInterval(() => {
        const currentScroll = window.pageYOffset
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        
        if (currentScroll >= maxScroll) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.scrollBy({ top: 100, behavior: 'smooth' })
        }
      }, 2000)

      return () => {
        if (pageScrollRef.current) {
          clearInterval(pageScrollRef.current)
        }
      }
    } else {
      if (pageScrollRef.current) {
        clearInterval(pageScrollRef.current)
        pageScrollRef.current = null
      }
    }
  }, [isPageAutoScrolling])

  // Reading time tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleAutoScrollToggle = () => {
    const newAutoScrollState = !isAutoScrolling
    setIsAutoScrolling(newAutoScrollState)
    
    setTimeout(() => {
      if (newAutoScrollState) {
        toast({
          title: "🕉️ Verse Auto-scroll Started",
          description: `Verses will change every ${autoScrollSpeed/1000} seconds. Relax and immerse in devotion.`,
        })
      } else {
        toast({
          title: "Auto-scroll Stopped",
          description: "You can now navigate manually through the verses.",
        })
      }
    }, 100)
  }

  const handlePageAutoScrollToggle = () => {
    const newState = !isPageAutoScrolling
    setIsPageAutoScrolling(newState)
    
    setTimeout(() => {
      toast({
        title: newState ? "📜 Page Auto-scroll Started" : "Page Auto-scroll Stopped",
        description: newState 
          ? "The page will scroll smoothly through all content."
          : "Manual scrolling restored.",
      })
    }, 100)
  }

  const handleReset = () => {
    setCurrentVerse(0)
    setIsAutoScrolling(false)
    setIsPageAutoScrolling(false)
    setVersesRead(0)
    setReadingTime(0)
    
    setTimeout(() => {
      toast({
        title: "🔄 Session Reset",
        description: "Starting fresh with the first verse. Om Gam Ganapataye Namaha!",
      })
    }, 100)
  }

  const scrollToVerse = (index: number) => {
    setCurrentVerse(index)
    const element = document.getElementById(`verse-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const toggleFavorite = (verseId: number) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(verseId)
      const newFavorites = isCurrentlyFavorite 
        ? prev.filter(id => id !== verseId)
        : [...prev, verseId]
      
      setTimeout(() => {
        toast({
          title: isCurrentlyFavorite ? "Removed from Favorites" : "⭐ Added to Favorites",
          description: isCurrentlyFavorite 
            ? "Verse removed from your sacred collection"
            : "Verse saved to your sacred collection",
        })
      }, 100)
      
      return newFavorites
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const openCommentary = (verse: typeof sampleVerses[0]) => {
    setSelectedVerseForCommentary(verse)
    setShowCommentary(true)
  }

  if (isLoading) {
    return <PageLoader isLoading={true} message="Loading sacred verses..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 dark:from-red-950 dark:via-pink-950 dark:to-rose-950 animate-fade-in relative overflow-hidden">
      
      {/* Sri Chakra Background */}
      <SriChakraBackground />
      
      {/* Sacred Header */}
      <header className="border-b border-red-200 dark:border-red-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform text-red-700 dark:text-red-300 p-2">
                  <ArrowLeft className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Crown className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Lalita Sahasranama
                  </h1>
                  <p className="text-xs text-red-600 dark:text-red-400 font-sanskrit hidden sm:block">श्री ललिता सहस्रनाम</p>
                </div>
              </div>
            </div>
            
            {/* Right Section - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm text-red-700 dark:text-red-300 bg-red-100/70 dark:bg-red-900/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Timer className="h-4 w-4" />
                <span>{formatTime(readingTime)}</span>
                <span>•</span>
                <span>{versesRead} verses</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePageAutoScrollToggle}
                className={`hover:scale-105 transition-transform border-red-300 dark:border-red-700 ${isPageAutoScrolling ? 'bg-red-100 dark:bg-red-900/30' : ''}`}
              >
                <ArrowDown className={`h-4 w-4 mr-2 text-red-600 dark:text-red-400 ${isPageAutoScrolling ? 'animate-bounce' : ''}`} />
                <span className="text-red-700 dark:text-red-300">{isPageAutoScrolling ? 'Stop' : 'Auto'}</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPronunciationHelp(!pronunciationHelp)}
                className="hover:scale-105 transition-transform border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Audio
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowProgress(!showProgress)}
                className="hover:scale-105 transition-transform border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
              >
                <Target className="h-4 w-4 mr-2" />
                Progress
              </Button>
              <ThemeToggle />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowQuiz(true)}
                className="hover:scale-105 transition-transform border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
              >
                <Brain className="h-4 w-4 mr-2" />
                Quiz
              </Button>
            </div>

            {/* Right Section - Mobile */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="border-red-300 dark:border-red-700 p-2"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 p-4 bg-red-50/90 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-700 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePageAutoScrollToggle}
                  className={`border-red-300 dark:border-red-700 ${isPageAutoScrolling ? 'bg-red-100 dark:bg-red-900/30' : ''}`}
                >
                  <ArrowDown className={`h-4 w-4 mr-2 ${isPageAutoScrolling ? 'animate-bounce' : ''}`} />
                  {isPageAutoScrolling ? 'Stop' : 'Auto'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPronunciationHelp(!pronunciationHelp)}
                  className="border-red-300 dark:border-red-700"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Audio
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowProgress(!showProgress)}
                  className="border-red-300 dark:border-red-700"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Progress
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowQuiz(true)}
                  className="border-red-300 dark:border-red-700"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Quiz
                </Button>
              </div>
              <div className="text-sm text-red-700 dark:text-red-300 bg-red-100/70 dark:bg-red-900/30 px-3 py-2 rounded text-center backdrop-blur-sm">
                <Timer className="h-4 w-4 inline mr-2" />
                {formatTime(readingTime)} • {versesRead} verses
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-8 relative z-10">
        {/* Divine Welcome Section */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-2xl animate-pulse mb-4 sm:mb-0 sm:mr-4">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-sanskrit">
                पूर्ण सहस्रनाम
              </h2>
              <h3 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Complete Sahasranama
              </h3>
            </div>
          </div>
          <p className="text-base sm:text-lg text-red-800 dark:text-red-200 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed px-4">
            Experience the complete thousand names of Goddess Lalita in their traditional verse form. 
            Each verse contains multiple sacred names with their profound spiritual meanings.
          </p>
          
          {/* Sacred Daily Quote */}
          <Card className="max-w-3xl mx-auto mb-6 sm:mb-8 bg-white/80 dark:bg-gray-900/80 border-red-300 dark:border-red-700 hover:shadow-2xl transition-all duration-500 animate-fade-in-up shadow-xl mx-4 sm:mx-auto backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4 sm:p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-3">
                  <Heart className="h-3 w-3 sm:h-5 sm:w-5 text-white animate-pulse" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wide">
                  Divine Wisdom
                </span>
              </div>
              <blockquote className="text-lg sm:text-xl italic text-red-900 dark:text-red-100 font-medium">
                "{todayQuote}"
              </blockquote>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Enhanced Sacred Controls Sidebar */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            
            {/* Main Controls */}
            <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-red-200 dark:border-red-700 lg:sticky lg:top-24 animate-fade-in-up shadow-xl" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg text-red-800 dark:text-red-200 flex items-center">
                  <Settings className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Sacred Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                {/* Auto-scroll Controls */}
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">Verse Auto-scroll</span>
                    <Button
                      variant={isAutoScrolling ? "default" : "outline"}
                      size="sm"
                      onClick={handleAutoScrollToggle}
                      className={isAutoScrolling 
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 animate-pulse shadow-lg text-white" 
                        : "border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }
                    >
                      {isAutoScrolling ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {/* Speed Control */}
                  <div className="space-y-2">
                    <label className="text-xs text-red-600 dark:text-red-400">Auto-scroll Speed</label>
                    <Select value={autoScrollSpeed.toString()} onValueChange={(value) => setAutoScrollSpeed(parseInt(value))}>
                      <SelectTrigger className="w-full border-red-300 dark:border-red-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {autoScrollSpeeds.map((speed) => (
                          <SelectItem key={speed.value} value={speed.value.toString()}>
                            {speed.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="w-full border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-105 transition-transform"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Session
                  </Button>
                </div>

                <Separator className="bg-red-200 dark:bg-red-700" />

                {/* Display Options */}
                <div className="space-y-3 lg:space-y-4">
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">Display Options</span>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600 dark:text-red-400">Transliteration</span>
                    <Button
                      variant={showTransliteration ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowTransliteration(!showTransliteration)}
                      className={showTransliteration ? "bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white" : "border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"}
                    >
                      {showTransliteration ? "On" : "Off"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600 dark:text-red-400">Meanings</span>
                    <Button
                      variant={showMeaning ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowMeaning(!showMeaning)}
                      className={showMeaning ? "bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white" : "border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"}
                    >
                      {showMeaning ? "On" : "Off"}
                    </Button>
                  </div>
                </div>

                <Separator className="bg-red-200 dark:bg-red-700" />

                {/* Sacred Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">Sacred Progress</span>
                    <span className="text-sm text-red-600 dark:text-red-400">
                      {currentVerse + 1} / {filteredVerses.length}
                    </span>
                  </div>
                  <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-3 lg:h-4 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-pink-500 h-3 lg:h-4 rounded-full transition-all duration-500 animate-pulse shadow-lg"
                      style={{ width: `${((currentVerse + 1) / filteredVerses.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-center text-red-600 dark:text-red-400 font-medium">
                    {Math.round(((currentVerse + 1) / filteredVerses.length) * 100)}% Complete
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditional Sidebar Components for larger screens */}
            <div className="hidden lg:block space-y-6">
              {showProgress && (
                <StudyProgress
                  versesStudiedToday={versesStudiedToday}
                  dailyGoal={dailyGoal}
                  studyStreak={studyStreak}
                  totalVersesStudied={versesRead}
                  favoriteCount={favorites.length}
                  readingTime={readingTime}
                  onGoalChange={setDailyGoal}
                />
              )}

              <VerseBookmarks
                bookmarks={bookmarks}
                studyNotes={studyNotes}
                onBookmarkAdd={(verseId, name) => setBookmarks(prev => ({...prev, [verseId]: name}))}
                onBookmarkRemove={(verseId) => setBookmarks(prev => {
                  const newBookmarks = {...prev}
                  delete newBookmarks[verseId]
                  return newBookmarks
                })}
                onNoteAdd={(verseId, note) => setStudyNotes(prev => ({...prev, [verseId]: note}))}
                verses={sampleVerses}
              />

              {pronunciationHelp && currentVerse < filteredVerses.length && (
                <PronunciationGuide
                  verse={filteredVerses[currentVerse]}
                  isVisible={pronunciationHelp}
                />
              )}

              <FontControls 
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                lineHeight={lineHeight}
                onLineHeightChange={setLineHeight}
              />
            </div>
          </div>

          {/* Main Sacred Content */}
          <div className="lg:col-span-3">
            {/* Sacred Search */}
            <div className="mb-6 lg:mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 h-4 w-4 lg:h-5 lg:w-5" />
                <Input
                  placeholder="Search verses by Sanskrit, transliteration, or English..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 lg:pl-12 py-2 lg:py-3 text-base lg:text-lg border-red-200 dark:border-red-700 focus:border-red-400 dark:focus:border-red-600 hover:shadow-lg transition-all bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Sacred Verses */}
            <div className="space-y-6 lg:space-y-8">
              {filteredVerses.map((verse, index) => (
                <Card 
                  key={verse.id} 
                  id={`verse-${index}`}
                  className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-red-200 dark:border-red-700 transition-all duration-500 hover:shadow-2xl animate-fade-in-up ${
                    currentVerse === index 
                      ? "ring-4 ring-red-400 dark:ring-red-600 shadow-2xl scale-[1.02] bg-gradient-to-br from-red-50/90 to-pink-50/90 dark:from-red-900/30 dark:to-pink-900/30" 
                      : 'hover:scale-[1.01]'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3 lg:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                        <Badge variant="secondary" className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium shadow-lg">
                          Verse {verse.verseNumber}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => scrollToVerse(index)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 hover:scale-105 transition-transform text-xs lg:text-sm"
                        >
                          <BookOpen className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                          Focus
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openCommentary(verse)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 hover:scale-105 transition-transform text-xs lg:text-sm"
                        >
                          <Scroll className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                          Commentary
                        </Button>
                        {currentVerse === index && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-lg">
                            <Zap className="h-3 w-3 mr-1" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 dark:text-red-400 hover:scale-105 transition-transform"
                        >
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleFavorite(verse.id)}
                          className={`transition-all duration-300 hover:scale-110 ${
                            favorites.includes(verse.id) 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-red-400 hover:text-red-500'
                          }`}
                        >
                          <Star className={`h-4 w-4 lg:h-5 lg:w-5 ${favorites.includes(verse.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 lg:space-y-6">
                    {/* Sacred Sanskrit */}
                    <div className="space-y-2 lg:space-y-3 animate-fade-in">
                      <h4 className="text-xs lg:text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wide flex items-center">
                        <div className="h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-2 shadow-lg">
                          <Crown className="h-2 w-2 lg:h-3 lg:w-3 text-white" />
                        </div>
                        Sacred Sanskrit
                      </h4>
                      <p 
                        className="font-sanskrit text-red-900 dark:text-red-100 leading-relaxed whitespace-pre-line hover:text-red-800 dark:hover:text-red-50 transition-colors font-medium"
                        style={{ fontSize: `${Math.max(fontSize * 0.9, 14)}px`, lineHeight: lineHeight }}
                      >
                        {verse.sanskrit}
                      </p>
                    </div>

                    {/* Transliteration */}
                    {showTransliteration && (
                      <div className="space-y-2 lg:space-y-3 animate-fade-in-delay">
                        <h4 className="text-xs lg:text-sm font-medium text-pink-700 dark:text-pink-300 uppercase tracking-wide">
                          Transliteration
                        </h4>
                        <p 
                          className="text-pink-800 dark:text-pink-200 italic leading-relaxed whitespace-pre-line hover:text-pink-700 dark:hover:text-pink-100 transition-colors"
                          style={{ fontSize: `${Math.max(fontSize * 0.85, 13)}px`, lineHeight: lineHeight }}
                        >
                          {verse.transliteration}
                        </p>
                      </div>
                    )}

                    {/* English Translation */}
                    <div className="space-y-2 lg:space-y-3 animate-fade-in-delay">
                      <h4 className="text-xs lg:text-sm font-medium text-rose-700 dark:text-rose-300 uppercase tracking-wide">
                        English Translation
                      </h4>
                      <p 
                        className="text-rose-800 dark:text-rose-200 leading-relaxed whitespace-pre-line hover:text-rose-700 dark:hover:text-rose-100 transition-colors"
                        style={{ fontSize: `${Math.max(fontSize * 0.9, 14)}px`, lineHeight: lineHeight }}
                      >
                        {verse.english}
                      </p>
                    </div>

                    {/* Hindi Translation */}
                    <div className="space-y-2 lg:space-y-3 animate-fade-in-delay-2">
                      <h4 className="text-xs lg:text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wide">
                        Hindi Translation
                      </h4>
                      <p 
                        className="text-red-800 dark:text-red-200 leading-relaxed whitespace-pre-line hover:text-red-700 dark:hover:text-red-100 transition-colors"
                        style={{ fontSize: `${Math.max(fontSize * 0.9, 14)}px`, lineHeight: lineHeight }}
                      >
                        {verse.hindi}
                      </p>
                    </div>

                    {/* Spiritual Meaning */}
                    {showMeaning && (
                      <div className="space-y-2 lg:space-y-3 p-4 lg:p-6 bg-gradient-to-r from-red-50/90 to-pink-50/90 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl border border-red-300 dark:border-red-700 hover:shadow-lg transition-all animate-fade-in-delay-2 backdrop-blur-sm">
                        <h4 className="text-xs lg:text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wide flex items-center">
                          <Heart className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                          Spiritual Meaning
                        </h4>
                        <p 
                          className="text-red-800 dark:text-red-200 leading-relaxed font-medium"
                          style={{ fontSize: `${Math.max(fontSize * 0.85, 13)}px`, lineHeight: lineHeight }}
                        >
                          {verse.meaning}
                        </p>
                      </div>
                    )}

                    {/* Sacred Names in this verse */}
                    <div className="space-y-2 lg:space-y-3 animate-fade-in-delay-2">
                      <h4 className="text-xs lg:text-sm font-medium text-pink-700 dark:text-pink-300 uppercase tracking-wide">
                        Sacred Names in this Verse
                      </h4>
                      <div className="flex flex-wrap gap-2 lg:gap-3">
                        {verse.names.map((name, nameIndex) => (
                          <Badge 
                            key={nameIndex} 
                            variant="outline" 
                            className="text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 dark:hover:from-pink-900/20 dark:hover:to-red-900/20 cursor-pointer hover:scale-105 transition-all duration-300 px-2 lg:px-3 py-1 font-sanskrit text-xs lg:text-sm backdrop-blur-sm"
                          >
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sacred Continuation Placeholder */}
            <Card className="mt-8 lg:mt-12 bg-white/80 dark:bg-gray-900/80 border-red-300 dark:border-red-700 border-dashed hover:shadow-2xl transition-all duration-500 animate-fade-in-up shadow-xl backdrop-blur-sm">
              <CardContent className="p-6 lg:p-10 text-center">
                <div className="h-12 w-12 lg:h-16 lg:w-16 mx-auto mb-4 lg:mb-6 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center opacity-70 animate-pulse shadow-2xl">
                  <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white animate-spin-slow" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-red-800 dark:text-red-200">
                  More Sacred Verses Coming Soon
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4 lg:mb-6 text-base lg:text-lg leading-relaxed">
                  This is where you can add the remaining verses of the complete Lalita Sahasranama. 
                  Each verse will follow the same beautiful format with Sanskrit, transliteration, translations, and profound spiritual meanings.
                </p>
                <Badge variant="secondary" className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base font-medium shadow-lg">
                  {filteredVerses.length} of 183 verses added
                </Badge>
              </CardContent>
            </Card>

            {/* Mobile-only components */}
            <div className="lg:hidden mt-8 space-y-6">
              {showProgress && (
                <StudyProgress
                  versesStudiedToday={versesStudiedToday}
                  dailyGoal={dailyGoal}
                  studyStreak={studyStreak}
                  totalVersesStudied={versesRead}
                  favoriteCount={favorites.length}
                  readingTime={readingTime}
                  onGoalChange={setDailyGoal}
                />
              )}

              <VerseBookmarks
                bookmarks={bookmarks}
                studyNotes={studyNotes}
                onBookmarkAdd={(verseId, name) => setBookmarks(prev => ({...prev, [verseId]: name}))}
                onBookmarkRemove={(verseId) => setBookmarks(prev => {
                  const newBookmarks = {...prev}
                  delete newBookmarks[verseId]
                  return newBookmarks
                })}
                onNoteAdd={(verseId, note) => setStudyNotes(prev => ({...prev, [verseId]: note}))}
                verses={sampleVerses}
              />

              {pronunciationHelp && currentVerse < filteredVerses.length && (
                <PronunciationGuide
                  verse={filteredVerses[currentVerse]}
                  isVisible={pronunciationHelp}
                />
              )}

              <FontControls 
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                lineHeight={lineHeight}
                onLineHeightChange={setLineHeight}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Mode */}
      <QuizMode isOpen={showQuiz} onClose={() => setShowQuiz(false)} />

      {/* Detailed Commentary */}
      {selectedVerseForCommentary && (
        <DetailedCommentary 
          verse={selectedVerseForCommentary} 
          isOpen={showCommentary} 
          onClose={() => {
            setShowCommentary(false)
            setSelectedVerseForCommentary(null)
          }} 
        />
      )}

      {/* Divine Chat Box */}
      <ChatBox />
    </div>
  )
}
