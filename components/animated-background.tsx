"use client"

import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  theme: string
  pattern: 'lotus' | 'mandala' | 'geometry' | 'none'
}

export function AnimatedBackground({ theme, pattern }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    opacity: number
    speed: number
  }>>([])

  useEffect(() => {
    if (pattern === 'none') return

    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.1
    }))
    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y > 100 ? -10 : particle.y + particle.speed,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.2 + 0.3
      })))
    }, 50)

    return () => clearInterval(interval)
  }, [pattern])

  if (pattern === 'none') return null

  const getParticleContent = () => {
    switch (pattern) {
      case 'lotus':
        return '🪷'
      case 'mandala':
        return '✨'
      case 'geometry':
        return '◊'
      default:
        return '✨'
    }
  }

  const getThemeColors = () => {
    switch (theme) {
      case 'krishna':
        return 'text-blue-300/30 dark:text-blue-400/20'
      case 'shiva':
        return 'text-gray-300/30 dark:text-gray-400/20'
      case 'devi':
        return 'text-pink-300/30 dark:text-pink-400/20'
      case 'sunset':
        return 'text-orange-300/30 dark:text-orange-400/20'
      default:
        return 'text-amber-300/30 dark:text-amber-400/20'
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute transition-all duration-1000 ${getThemeColors()}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `rotate(${particle.id * 45}deg)`,
          }}
        >
          {getParticleContent()}
        </div>
      ))}
      
      {/* Sacred Geometry Overlay */}
      {pattern === 'geometry' && (
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="animate-spin-slow">
            <defs>
              <pattern id="sacred-geometry" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
                <polygon points="100,50 150,100 100,150 50,100" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sacred-geometry)" className={getThemeColors()} />
          </svg>
        </div>
      )}
    </div>
  )
}
