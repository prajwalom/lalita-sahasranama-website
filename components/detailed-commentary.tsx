"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Scroll, Lightbulb, Heart, Star } from 'lucide-react'

interface CommentarySection {
  title: string
  content: string
  icon: React.ReactNode
}

interface DetailedCommentaryProps {
  verse: {
    id: number
    verseNumber: number
    sanskrit: string
    names: string[]
  }
  isOpen: boolean
  onClose: () => void
}

export function DetailedCommentary({ verse, isOpen, onClose }: DetailedCommentaryProps) {
  const [activeSection, setActiveSection] = useState(0)

  const commentarySections: CommentarySection[] = [
    {
      title: "Scholarly Analysis",
      icon: <BookOpen className="h-5 w-5" />,
      content: `This verse represents the foundational invocation of the Divine Mother. The Sanskrit construction follows classical Vedic patterns, with each name building upon the previous to create a complete theological framework. The use of compound words (samasa) demonstrates the sophisticated linguistic tradition of Sanskrit devotional literature.

The verse establishes three primary aspects: maternal (श्री माता), sovereign (श्री महाराज्ञी), and transcendent (श्रीमत्सिंहासनेश्वरी). This trinity reflects the complete nature of divine consciousness as both immanent and transcendent.`
    },
    {
      title: "Spiritual Significance",
      icon: <Heart className="h-5 w-5" />,
      content: `From a spiritual perspective, this verse initiates the devotee into the sacred relationship with the Divine Mother. Each name serves as a doorway to different aspects of divine consciousness:

• श्री माता establishes the loving, nurturing relationship
• श्री महाराज्ञी acknowledges Her supreme authority over all existence  
• श्रीमत्सिंहासनेश्वरी recognizes Her transcendent majesty
• चिदग्निकुण्डसम्भूता points to Her origin in pure consciousness
• देवकार्यसमुद्यता affirms Her active compassion in the world

The progression moves from personal relationship to cosmic recognition to transcendent realization.`
    },
    {
      title: "Meditation Practice",
      icon: <Lightbulb className="h-5 w-5" />,
      content: `For meditation practice, this verse offers multiple entry points:

**Visualization**: Contemplate the Divine Mother seated on a lion throne, radiating golden light, with four arms holding sacred implements. See Her emerging from a fire of pure consciousness.

**Mantra Practice**: Each name can be repeated as a mantra, focusing on its particular quality. Begin with श्री माता to establish devotional connection.

**Contemplative Inquiry**: Reflect on what it means for the Divine to be both Mother (personal) and Queen (universal). How does this paradox resolve in direct experience?

**Breath Coordination**: Synchronize each name with the breath, allowing the meaning to penetrate deeper than intellectual understanding.`
    },
    {
      title: "Historical Context",
      icon: <Scroll className="h-5 w-5" />,
      content: `The Lalita Sahasranama emerges from the Brahmanda Purana, specifically the Lalitopakhyana section. This text is traditionally attributed to the sage Agastya, who received the teaching from Hayagriva.

The historical development shows influences from:
• Early Vedic goddess traditions (Devi Sukta, Ratri Sukta)
• Tantric Shakti worship (particularly Sri Vidya tradition)
• Puranic theological synthesis
• South Indian devotional movements

The text represents a mature synthesis of philosophical Advaita with devotional Bhakti, characteristic of medieval Hindu theological development. The systematic enumeration of 1000 names follows the pattern established in other sahasranamas, particularly the Vishnu Sahasranama.`
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/95 dark:to-orange-900/95 border-amber-200 dark:border-amber-800 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scroll className="h-6 w-6" />
              <div>
                <CardTitle className="text-xl">Detailed Commentary</CardTitle>
                <p className="text-amber-100 text-sm">Verse {verse.verseNumber} - Scholarly Analysis</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex h-[70vh]">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-amber-200 dark:border-amber-800 p-4 bg-gradient-to-b from-amber-100/50 to-orange-100/50 dark:from-amber-900/20 dark:to-orange-900/20">
            <div className="mb-6">
              <h3 className="font-sanskrit text-xl text-amber-800 dark:text-amber-200 mb-2">
                {verse.sanskrit.split('\n')[0]}
              </h3>
              <Badge variant="outline" className="border-amber-300 dark:border-amber-700">
                Verse {verse.verseNumber}
              </Badge>
            </div>

            <div className="space-y-2">
              {commentarySections.map((section, index) => (
                <Button
                  key={index}
                  variant={activeSection === index ? "default" : "ghost"}
                  className={`w-full justify-start p-3 h-auto ${
                    activeSection === index 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                      : 'hover:bg-amber-100 dark:hover:bg-amber-900/30'
                  }`}
                  onClick={() => setActiveSection(index)}
                >
                  <div className="flex items-center space-x-3">
                    {section.icon}
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </Button>
              ))}
            </div>

            <div className="mt-6 p-3 bg-gradient-to-r from-amber-200/50 to-orange-200/50 dark:from-amber-800/30 dark:to-orange-800/30 rounded-lg">
              <h4 className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
                Sacred Names in this Verse:
              </h4>
              <div className="space-y-1">
                {verse.names.map((name, index) => (
                  <div key={index} className="text-xs text-amber-600 dark:text-amber-400 font-sanskrit">
                    {index + 1}. {name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-4 flex items-center space-x-3">
              {commentarySections[activeSection].icon}
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                {commentarySections[activeSection].title}
              </h2>
            </div>

            <div className="prose prose-amber dark:prose-invert max-w-none">
              <div className="text-amber-800 dark:text-amber-200 leading-relaxed whitespace-pre-line">
                {commentarySections[activeSection].content}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 p-4 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Further Study
              </h3>
              <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                <p>• Consult the Brahmanda Purana for the complete context</p>
                <p>• Study the Sri Vidya tradition for practical applications</p>
                <p>• Explore commentaries by Bhaskararaya and other traditional scholars</p>
                <p>• Practice with a qualified guru for deeper understanding</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
