"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Crown, Waves, Flower, Sun } from 'lucide-react'

export type ThemeVariant = 'traditional' | 'krishna' | 'shiva' | 'devi' | 'sunset'

interface ThemeOption {
  id: ThemeVariant
  name: string
  description: string
  icon: React.ReactNode
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

const themeOptions: ThemeOption[] = [
  {
    id: 'traditional',
    name: 'Traditional Saffron',
    description: 'Sacred saffron and gold',
    icon: <Crown className="h-5 w-5" />,
    colors: {
      primary: 'from-amber-500 to-orange-500',
      secondary: 'from-orange-500 to-red-500',
      accent: 'from-yellow-400 to-amber-400'
    }
  },
  {
    id: 'krishna',
    name: 'Krishna Blue',
    description: 'Divine blue and peacock',
    icon: <Waves className="h-5 w-5" />,
    colors: {
      primary: 'from-blue-500 to-indigo-500',
      secondary: 'from-indigo-500 to-purple-500',
      accent: 'from-cyan-400 to-blue-400'
    }
  },
  {
    id: 'shiva',
    name: 'Shiva Silver',
    description: 'Sacred ash and moonlight',
    icon: <Sun className="h-5 w-5" />,
    colors: {
      primary: 'from-gray-500 to-slate-500',
      secondary: 'from-slate-500 to-zinc-500',
      accent: 'from-silver-400 to-gray-400'
    }
  },
  {
    id: 'devi',
    name: 'Devi Rose',
    description: 'Divine feminine pink',
    icon: <Flower className="h-5 w-5" />,
    colors: {
      primary: 'from-pink-500 to-rose-500',
      secondary: 'from-rose-500 to-red-500',
      accent: 'from-pink-400 to-rose-400'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glory',
    description: 'Evening prayer colors',
    icon: <Sun className="h-5 w-5" />,
    colors: {
      primary: 'from-orange-500 to-red-500',
      secondary: 'from-red-500 to-pink-500',
      accent: 'from-yellow-400 to-orange-400'
    }
  }
]

interface ThemeSelectorProps {
  currentTheme: ThemeVariant
  onThemeChange: (theme: ThemeVariant) => void
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="border-amber-300 dark:border-amber-700"
      >
        <Palette className="h-4 w-4 mr-2" />
        Themes
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 w-80 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-amber-200 dark:border-amber-800 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Sacred Themes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {themeOptions.map((theme) => (
              <Button
                key={theme.id}
                variant={currentTheme === theme.id ? "default" : "outline"}
                className={`w-full justify-start p-4 h-auto ${
                  currentTheme === theme.id 
                    ? `bg-gradient-to-r ${theme.colors.primary} text-white` 
                    : 'hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20'
                }`}
                onClick={() => {
                  onThemeChange(theme.id)
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${theme.colors.primary}`}>
                    {theme.icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-sm opacity-70">{theme.description}</div>
                  </div>
                  <div className="flex space-x-1">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.colors.primary}`}></div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.colors.secondary}`}></div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.colors.accent}`}></div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
