"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Sparkles, Heart, Crown } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

// Enhanced knowledge base for Lalita Sahasranama
const knowledgeBase = {
  "श्री माता": {
    english: "The Divine Mother",
    hindi: "दिव्य माता",
    meaning: "She who is the supreme mother of all creation, the source of all love and compassion.",
    verse: "श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी। चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥"
  },
  "श्री महाराज्ञी": {
    english: "The Great Queen",
    hindi: "महान रानी",
    meaning: "She who rules over all the three worlds with supreme authority and grace.",
    verse: "श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी। चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥"
  },
  "श्रीमत्सिंहासनेश्वरी": {
    english: "The Goddess of the Lion Throne",
    hindi: "सिंहासन की देवी",
    meaning: "She who sits on the divine throne supported by lions, symbolizing power and majesty.",
    verse: "श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी। चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥"
  },
  "चिदग्निकुण्डसम्भूता": {
    english: "Born from the Fire of Consciousness",
    hindi: "चेतना की अग्नि से जन्मी",
    meaning: "She who emerged from the fire pit of pure consciousness, representing the transformation of awareness into divine form.",
    verse: "श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी। चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥"
  },
  "देवकार्यसमुद्यता": {
    english: "Ready for Divine Work",
    hindi: "दिव्य कार्य के लिए तत्पर",
    meaning: "She who is always ready to fulfill the tasks of the gods and maintain cosmic order.",
    verse: "श्री माता श्री महाराज्ञी श्रीमत्सिंहासनेश्वरी। चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥"
  }
}

const spiritualResponses = [
  "🙏 The Divine Mother's grace flows through every sacred name. How may I guide you on this spiritual journey?",
  "✨ Each name of Lalita carries infinite wisdom. What would you like to explore today?",
  "🌸 In the thousand names lies the path to liberation. Ask me about any sacred name or verse.",
  "💫 The Divine Mother listens to every sincere inquiry. How can I help deepen your understanding?",
  "🕉️ Through devotion and knowledge, we approach the Divine. What spiritual guidance do you seek?"
]

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🙏 Namaste! I'm your divine guide for exploring the sacred names and verses of Lalita Sahasranama. Ask me about any name, its meaning, or the verse it appears in. I can provide detailed explanations in both English and Hindi with spiritual significance.",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const findNameInKnowledge = (query: string) => {
    const lowerQuery = query.toLowerCase()
    
    // Direct Sanskrit name match
    for (const [name, info] of Object.entries(knowledgeBase)) {
      if (name.includes(query) || lowerQuery.includes(name.toLowerCase())) {
        return { name, info }
      }
    }
    
    // English translation match
    for (const [name, info] of Object.entries(knowledgeBase)) {
      if (info.english.toLowerCase().includes(lowerQuery) || 
          info.hindi.includes(query) ||
          info.meaning.toLowerCase().includes(lowerQuery)) {
        return { name, info }
      }
    }
    
    return null
  }

  const generateResponse = (userMessage: string) => {
    const foundName = findNameInKnowledge(userMessage)
    
    if (foundName) {
      const { name, info } = foundName
      return `🌸 **${name}**

**English:** ${info.english}
**Hindi:** ${info.hindi}

**Spiritual Meaning:** ${info.meaning}

**Appears in Sacred Verse:** 
${info.verse}

✨ This sacred name carries the divine vibration of the Mother's infinite grace. Meditate upon it with devotion and surrender. 🙏

May the Divine Mother's blessings be upon you! 🕉️`
    }
    
    // General spiritual guidance
    if (userMessage.toLowerCase().includes('meaning') || 
        userMessage.toLowerCase().includes('verse') ||
        userMessage.toLowerCase().includes('name')) {
      return `🕉️ I can help you understand any of the sacred names from Lalita Sahasranama. Try asking about specific names like:

• श्री माता (Shri Mata) - The Divine Mother
• श्री महाराज्ञी (Shri Maharajni) - The Great Queen  
• चिदग्निकुण्डसम्भूता (Chidagnikunda Sambhuta) - Born from Consciousness Fire

Simply type the Sanskrit name or its English meaning, and I'll provide detailed explanations in both languages along with the verse context and spiritual significance. 🌸

The Divine Mother's wisdom flows through every sacred syllable! ✨`
    }
    
    if (userMessage.toLowerCase().includes('help') || 
        userMessage.toLowerCase().includes('how')) {
      return `💫 I'm here to guide you through the sacred thousand names of Goddess Lalita. You can:

🔹 Ask about specific Sanskrit names and their profound meanings
🔹 Request verse translations and spiritual significance  
🔹 Inquire about the divine context of any name
🔹 Get explanations in both English and Hindi
🔹 Learn about the spiritual practices associated with each name

**Example Questions:**
• "What does श्री माता mean?"
• "Tell me about the Divine Mother"
• "Explain the first verse of Sahasranama"
• "What is the significance of Lalita's names?"

The Divine Mother's wisdom flows through every interaction. How may I serve your spiritual journey? 🙏✨`
    }
    
    // Default spiritual response
    const randomResponse = spiritualResponses[Math.floor(Math.random() * spiritualResponses.length)]
    return randomResponse
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate divine wisdom processing time
    setTimeout(() => {
      const response = generateResponse(inputValue)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Divine Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 shadow-2xl hover:shadow-3xl transition-all duration-300 z-40 ${isOpen ? 'hidden' : 'flex'} items-center justify-center animate-pulse`}
      >
        <MessageCircle className="h-8 w-8 text-white" />
      </Button>

      {/* Divine Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 backdrop-blur-sm border-amber-200 dark:border-amber-800 shadow-2xl z-50 animate-fade-in-up">
          <CardHeader className="pb-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">Divine Guide</CardTitle>
                  <p className="text-sm text-amber-100">Lalita Sahasranama Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[500px]">
            {/* Sacred Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-lg shadow-lg ${
                        message.isUser
                          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white'
                          : 'bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-red-900/40 text-amber-900 dark:text-amber-100 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                        {message.text}
                      </div>
                      <div className={`text-xs mt-2 ${message.isUser ? 'text-amber-100' : 'text-amber-600 dark:text-amber-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Divine Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-red-900/40 p-4 rounded-lg border border-amber-200 dark:border-amber-800 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-amber-700 dark:text-amber-300 ml-3 font-medium">Divine wisdom flowing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Sacred Input Area */}
            <div className="p-4 border-t border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about sacred names or verses..."
                  className="flex-1 border-amber-200 dark:border-amber-800 focus:border-amber-400 dark:focus:border-amber-600 bg-white dark:bg-amber-950/50"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 shadow-lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
