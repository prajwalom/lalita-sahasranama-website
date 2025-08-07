"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Play, Pause, RotateCcw, BookOpen, Heart, Settings, Share2, Star, Timer, Zap, Sparkles, ArrowDown, Crown, Flame, Volume2, Brain, Scroll, Type, Palette, Image, Target } from 'lucide-react'
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageLoader } from "@/components/page-loader"
import { ChatBox } from "@/components/chat-box"
import { FontControls } from "@/components/font-controls"
import { useToast } from "@/hooks/use-toast"
import { StudyProgress } from "@/components/study-progress"
import { VerseBookmarks } from "@/components/verse-bookmarks"
import { PronunciationGuide } from "@/components/pronunciation-guide"

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
    imageUrl: "/images/verse-1.jpg" // Placeholder for future images
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
  // Add these new state variables
  const [bookmarks, setBookmarks] = useState<{[key: number]: string}>({})
  const [studyNotes, setStudyNotes] = useState<{[key: number]: string}>({})
  const [pronunciationHelp, setPronunciationHelp] = useState(false)
  const [verseComparison, setVerseComparison] = useState<number[]>([])
  const [dailyGoal, setDailyGoal] = useState(10)
  const [versesStudiedToday, setVersesStudiedToday] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const [lastStudiedVerse, setLastStudiedVerse] = useState(0)
  const [studyStreak, setStudyStreak] = useState(0)
  
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

  const themeClasses = {
    bg: 'from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950',
    primary: 'from-amber-500 via-orange-500 to-red-500',
    secondary: 'from-orange-500 via-red-500 to-amber-500',
    accent: 'from-amber-400 to-orange-400'
  }

  const openCommentary = (verse: typeof sampleVerses[0]) => {
    setSelectedVerseForCommentary(verse)
    setShowCommentary(true)
  }

  if (isLoading) {
    return <PageLoader isLoading={true} message="Loading sacred verses..." />
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeClasses.bg} animate-fade-in relative`}>
      
      {/* Sacred Header */}
      <header className={`border-b border-amber-200 dark:border-amber-800 bg-gradient-to-r ${themeClasses.primary}/10 backdrop-blur-sm sticky top-0 z-40 animate-slide-down shadow-lg`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform text-amber-700 dark:text-amber-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${themeClasses.primary} flex items-center justify-center animate-pulse shadow-lg`}>
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${themeClasses.primary} bg-clip-text text-transparent`}>
                  Lalita Sahasranama
                </h1>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-sanskrit">श्री ललिता सहस्रनाम</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-sm text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/30 px-3 py-1 rounded-full">
              <Timer className="h-4 w-4" />
              <span>{formatTime(readingTime)}</span>
              <span>•</span>
              <span>{versesRead} verses</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePageAutoScrollToggle}
              className={`hover:scale-105 transition-transform border-amber-300 dark:border-amber-700 ${isPageAutoScrolling ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800' : ''}`}
            >
              <ArrowDown className={`h-4 w-4 mr-2 text-amber-600 dark:text-amber-400 ${isPageAutoScrolling ? 'animate-bounce' : ''}`} />
              <span className="text-amber-700 dark:text-amber-300">{isPageAutoScrolling ? 'Stop Scroll' : 'Auto Scroll'}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPronunciationHelp(!pronunciationHelp)}
              className="hover:scale-105 transition-transform border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Pronunciation
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowProgress(!showProgress)}
              className="hover:scale-105 transition-transform border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
            >
              <Target className="h-4 w-4 mr-2" />
              Progress
            </Button>
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowQuiz(true)}
              className="hover:scale-105 transition-transform border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
            >
              <Brain className="h-4 w-4 mr-2" />
              Quiz
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Divine Welcome Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <div className={`h-16 w-16 rounded-full bg-gradient-to-r ${themeClasses.primary} flex items-center justify-center shadow-2xl animate-pulse mr-4`}>
              <Flame className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className={`text-4xl font-bold bg-gradient-to-r ${themeClasses.primary} bg-clip-text text-transparent font-sanskrit`}>
                पूर्ण सहस्रनाम
              </h2>
              <h3 className={`text-3xl font-bold bg-gradient-to-r ${themeClasses.secondary} bg-clip-text text-transparent`}>
                Complete Sahasranama
              </h3>
            </div>
          </div>
          <p className="text-lg text-amber-800 dark:text-amber-200 mb-6 max-w-4xl mx-auto leading-relaxed">
            Experience the complete thousand names of Goddess Lalita in their traditional verse form. 
            Each verse contains multiple sacred names with their profound spiritual meanings.
          </p>
          
          {/* Sacred Daily Quote */}
          <Card className={`max-w-3xl mx-auto mb-8 bg-gradient-to-r ${themeClasses.secondary}/20 border-orange-300 dark:border-orange-700 hover:shadow-2xl transition-all duration-500 animate-fade-in-up shadow-xl`} style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${themeClasses.secondary} flex items-center justify-center mr-3`}>
                  <Heart className="h-5 w-5 text-white animate-pulse" />
                </div>
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                  Divine Wisdom
                </span>
              </div>
              <blockquote className="text-xl italic text-orange-900 dark:text-orange-100 font-medium">
                "{todayQuote}"
              </blockquote>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sacred Controls Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            
            {/* Main Controls */}
            {/* Study Progress */}
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

            {/* Bookmarks & Notes */}
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

            {/* Pronunciation Guide */}
            {pronunciationHelp && currentVerse < filteredVerses.length && (
              <PronunciationGuide
                verse={filteredVerses[currentVerse]}
                isVisible={pronunciationHelp}
              />
            )}

            {/* Font Controls */}
            <FontControls 
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              lineHeight={lineHeight}
              onLineHeightChange={setLineHeight}
            />
          </div>

          {/* Main Sacred Content */}
          <div className="lg:col-span-3">
            {/* Sacred Search */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
                <Input
                  placeholder="Search verses by Sanskrit, transliteration, or English..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-lg border-amber-200 dark:border-amber-800 focus:border-amber-400 dark:focus:border-amber-600 hover:shadow-lg transition-all bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
                />
              </div>
            </div>

            {/* Sacred Verses */}
            <div className="space-y-8">
              {filteredVerses.map((verse, index) => (
                <Card 
                  key={verse.id} 
                  id={`verse-${index}`}
                  className={`bg-gradient-to-br ${themeClasses.bg} backdrop-blur-sm border-amber-200 dark:border-amber-800 transition-all duration-500 hover:shadow-2xl animate-fade-in-up ${
                    currentVerse === index 
                      ? `ring-4 ring-amber-400 dark:ring-amber-600 shadow-2xl scale-[1.02] bg-gradient-to-br ${themeClasses.primary}/10` 
                      : 'hover:scale-[1.01]'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className={`bg-gradient-to-r ${themeClasses.accent} text-amber-800 dark:text-amber-200 animate-pulse px-3 py-1 text-sm font-medium shadow-lg`}>
                          Verse {verse.verseNumber}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => scrollToVerse(index)}
                          className="text-amber-600 hover:text-amber-700 dark:text-amber-400 hover:scale-105 transition-transform"
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          Focus
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openCommentary(verse)}
                          className="text-amber-600 hover:text-amber-700 dark:text-amber-400 hover:scale-105 transition-transform"
                        >
                          <Scroll className="h-4 w-4 mr-1" />
                          Commentary
                        </Button>
                        {currentVerse === index && (
                          <Badge className={`bg-gradient-to-r ${themeClasses.primary} text-white animate-pulse shadow-lg`}>
                            <Zap className="h-3 w-3 mr-1" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-600 hover:text-amber-700 dark:text-amber-400 hover:scale-105 transition-transform"
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
                              : 'text-amber-400 hover:text-red-500'
                          }`}
                        >
                          <Star className={`h-5 w-5 ${favorites.includes(verse.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Sacred Sanskrit */}
                    <div className="space-y-3 animate-fade-in">
                      <h4 className="text-sm font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide flex items-center">
                        <div className={`h-5 w-5 rounded-full bg-gradient-to-r ${themeClasses.primary} flex items-center justify-center mr-2 shadow-lg`}>
                          <Crown className="h-3 w-3 text-white" />
                        </div>
                        Sacred Sanskrit
                      </h4>
                      <p 
                        className="font-sanskrit text-amber-900 dark:text-amber-100 leading-relaxed whitespace-pre-line hover:text-amber-800 dark:hover:text-amber-50 transition-colors font-medium"
                        style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
                      >
                        {verse.sanskrit}
                      </p>
                    </div>

                    {/* Transliteration */}
                    {showTransliteration && (
                      <div className="space-y-3 animate-fade-in-delay">
                        <h4 className="text-sm font-medium text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                          Transliteration
                        </h4>
                        <p 
                          className="text-orange-800 dark:text-orange-200 italic leading-relaxed whitespace-pre-line hover:text-orange-700 dark:hover:text-orange-100 transition-colors"
                          style={{ fontSize: `${fontSize * 0.9}px`, lineHeight: lineHeight }}
                        >
                          {verse.transliteration}
                        </p>
                      </div>
                    )}

                    {/* English Translation */}
                    <div className="space-y-3 animate-fade-in-delay">
                      <h4 className="text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wide">
                        English Translation
                      </h4>
                      <p 
                        className="text-red-800 dark:text-red-200 leading-relaxed whitespace-pre-line hover:text-red-700 dark:hover:text-red-100 transition-colors"
                        style={{ fontSize: `${fontSize * 0.95}px`, lineHeight: lineHeight }}
                      >
                        {verse.english}
                      </p>
                    </div>

                    {/* Hindi Translation */}
                    <div className="space-y-3 animate-fade-in-delay-2">
                      <h4 className="text-sm font-medium text-pink-700 dark:text-pink-300 uppercase tracking-wide">
                        Hindi Translation
                      </h4>
                      <p 
                        className="text-pink-800 dark:text-pink-200 leading-relaxed whitespace-pre-line hover:text-pink-700 dark:hover:text-pink-100 transition-colors"
                        style={{ fontSize: `${fontSize * 0.95}px`, lineHeight: lineHeight }}
                      >
                        {verse.hindi}
                      </p>
                    </div>

                    {/* Spiritual Meaning */}
                    {showMeaning && (
                      <div className={`space-y-3 p-6 bg-gradient-to-r ${themeClasses.primary}/10 rounded-xl border border-amber-300 dark:border-amber-700 hover:shadow-lg transition-all animate-fade-in-delay-2`}>
                        <h4 className="text-sm font-medium text-amber-700 dark:text-amber-300 uppercase tracking-wide flex items-center">
                          <Heart className="h-4 w-4 mr-2" />
                          Spiritual Meaning
                        </h4>
                        <p 
                          className="text-amber-800 dark:text-amber-200 leading-relaxed font-medium"
                          style={{ fontSize: `${fontSize * 0.9}px`, lineHeight: lineHeight }}
                        >
                          {verse.meaning}
                        </p>
                      </div>
                    )}

                    {/* Sacred Names in this verse */}
                    <div className="space-y-3 animate-fade-in-delay-2">
                      <h4 className="text-sm font-medium text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                        Sacred Names in this Verse
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {verse.names.map((name, nameIndex) => (
                          <Badge 
                            key={nameIndex} 
                            variant="outline" 
                            className="text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 cursor-pointer hover:scale-105 transition-all duration-300 px-3 py-1 font-sanskrit"
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
            <Card className={`mt-12 bg-gradient-to-r ${themeClasses.primary}/10 border-amber-300 dark:border-amber-700 border-dashed hover:shadow-2xl transition-all duration-500 animate-fade-in-up shadow-xl`}>
              <CardContent className="p-10 text-center">
                <div className={`h-16 w-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${themeClasses.primary} flex items-center justify-center opacity-70 animate-pulse shadow-2xl`}>
                  <Sparkles className="h-8 w-8 text-white animate-spin-slow" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-amber-800 dark:text-amber-200">
                  More Sacred Verses Coming Soon
                </h3>
                <p className="text-amber-700 dark:text-amber-300 mb-6 text-lg leading-relaxed">
                  This is where you can add the remaining verses of the complete Lalita Sahasranama. 
                  Each verse will follow the same beautiful format with Sanskrit, transliteration, translations, and profound spiritual meanings.
                </p>
                <Badge variant="secondary" className={`bg-gradient-to-r ${themeClasses.accent} text-amber-800 dark:text-amber-200 px-4 py-2 text-base font-medium shadow-lg`}>
                  {filteredVerses.length} of 183 verses added
                </Badge>
              </CardContent>
            </Card>
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
