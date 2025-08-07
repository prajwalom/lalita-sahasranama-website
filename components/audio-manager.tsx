"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Music, Bell } from 'lucide-react'

interface AudioManagerProps {
  onBellSound?: () => void
}

export function AudioManager({ onBellSound }: AudioManagerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([0.3])
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const bellRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio elements
    audioRef.current = new Audio()
    bellRef.current = new Audio()
    
    // Set up background music (you can replace with actual devotional music URL)
    audioRef.current.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    audioRef.current.loop = true
    audioRef.current.volume = volume[0]

    // Set up bell sound (you can replace with actual bell sound URL)
    bellRef.current.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
    bellRef.current.volume = volume[0]

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (bellRef.current) {
        bellRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0]
    }
    if (bellRef.current) {
      bellRef.current.volume = isMuted ? 0 : volume[0]
    }
  }, [volume, isMuted])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playBell = () => {
    if (bellRef.current) {
      bellRef.current.currentTime = 0
      bellRef.current.play().catch(console.error)
    }
    onBellSound?.()
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMusic}
            className={`${isPlaying ? 'bg-amber-100 dark:bg-amber-800' : ''} border-amber-300 dark:border-amber-700`}
          >
            <Music className={`h-4 w-4 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={playBell}
            className="border-amber-300 dark:border-amber-700"
          >
            <Bell className="h-4 w-4 mr-2" />
            Bell
          </Button>
          
          <div className="flex items-center space-x-2 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="p-1"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              step={0.1}
              className="flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
