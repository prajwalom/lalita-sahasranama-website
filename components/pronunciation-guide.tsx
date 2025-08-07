"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Volume2, BookOpen, Info } from 'lucide-react'

interface PronunciationGuideProps {
  verse: {
    sanskrit: string
    transliteration: string
    names: string[]
  }
  isVisible: boolean
}

export function PronunciationGuide({ verse, isVisible }: PronunciationGuideProps) {
  if (!isVisible) return null

  const pronunciationTips = [
    { letter: 'ा', sound: 'aa', example: 'माता (maa-taa)' },
    { letter: 'ी', sound: 'ee', example: 'श्री (shree)' },
    { letter: 'ू', sound: 'oo', example: 'रूप (roop)' },
    { letter: 'ं', sound: 'n/m', example: 'संभूता (sam-bhoo-taa)' },
    { letter: 'ः', sound: 'h', example: 'नमः (na-mah)' },
    { letter: 'च्', sound: 'ch', example: 'चित् (chit)' },
    { letter: 'ज्ञ', sound: 'gya', example: 'राज्ञी (raag-nyee)' }
  ]

  const getWordBreakdown = (word: string) => {
    // Simple syllable breakdown for common patterns
    const syllables = []
    let current = ''
    
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      current += char
      
      // Break on vowel sounds or consonant clusters
      if (char.match(/[aeiouāīūṛṝḷḹēōṃḥ]/i) || 
          (char.match(/[kgṅcjñṭḍṇtdnpbmyrlvśṣsh]/i) && 
           word[i+1] && word[i+1].match(/[aeiouāīūṛṝḷḹēōṃḥ]/i))) {
        syllables.push(current)
        current = ''
      }
    }
    
    if (current) syllables.push(current)
    return syllables
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 border-blue-200 dark:border-blue-800 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-blue-800 dark:text-blue-200 flex items-center">
          <Volume2 className="h-5 w-5 mr-2" />
          Pronunciation Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Tips */}
        <div className="grid grid-cols-2 gap-2">
          {pronunciationTips.slice(0, 4).map((tip, index) => (
            <div key={index} className="bg-blue-100/50 dark:bg-blue-900/20 rounded p-2 text-xs">
              <span className="font-sanskrit text-blue-800 dark:text-blue-200 font-bold">{tip.letter}</span>
              <span className="text-blue-600 dark:text-blue-400 mx-1">→</span>
              <span className="text-blue-700 dark:text-blue-300">{tip.sound}</span>
            </div>
          ))}
        </div>

        {/* Word-by-word breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Sacred Names Breakdown:</h4>
          {verse.names.slice(0, 3).map((name, index) => (
            <div key={index} className="p-3 bg-white dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sanskrit text-blue-800 dark:text-blue-200 font-medium">{name}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-blue-600 dark:text-blue-400">
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {getWordBreakdown(name).map((syllable, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                    {syllable}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pronunciation Tips */}
        <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded border border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Pro Tips:</span>
          </div>
          <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
            <li>• Roll your 'R's gently, like in Spanish</li>
            <li>• 'Ch' is always pronounced like 'church'</li>
            <li>• Vowels are pure sounds, not diphthongs</li>
            <li>• Stress is usually on the first syllable</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
