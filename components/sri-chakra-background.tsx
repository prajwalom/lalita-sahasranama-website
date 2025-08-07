"use client"

import { useEffect, useState } from "react"

export function SriChakraBackground() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Main Sri Chakra */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 dark:opacity-10">
        <div className="relative w-96 h-96 sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] animate-spin-slow">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Circle */}
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-red-400 dark:text-red-600"
            />
            
            {/* Second Circle */}
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-pink-400 dark:text-pink-600"
            />
            
            {/* Lotus Petals - Outer Ring */}
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 22.5) * (Math.PI / 180)
              const x1 = 200 + Math.cos(angle) * 150
              const y1 = 200 + Math.sin(angle) * 150
              const x2 = 200 + Math.cos(angle) * 170
              const y2 = 200 + Math.sin(angle) * 170
              
              return (
                <g key={`outer-petal-${i}`}>
                  <path
                    d={`M 200 200 L ${x1} ${y1} L ${x2} ${y2} Z`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-red-300 dark:text-red-700"
                  />
                </g>
              )
            })}
            
            {/* Lotus Petals - Inner Ring */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45) * (Math.PI / 180)
              const x1 = 200 + Math.cos(angle) * 120
              const y1 = 200 + Math.sin(angle) * 120
              const x2 = 200 + Math.cos(angle) * 140
              const y2 = 200 + Math.sin(angle) * 140
              
              return (
                <g key={`inner-petal-${i}`}>
                  <path
                    d={`M 200 200 L ${x1} ${y1} L ${x2} ${y2} Z`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-pink-300 dark:text-pink-700"
                  />
                </g>
              )
            })}
            
            {/* Central Triangles - Sri Chakra Pattern */}
            {/* Upward Triangles */}
            <polygon
              points="200,120 160,240 240,240"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-red-500 dark:text-red-600"
            />
            
            <polygon
              points="200,140 170,220 230,220"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-pink-500 dark:text-pink-600"
            />
            
            <polygon
              points="200,160 180,200 220,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-rose-500 dark:text-rose-600"
            />
            
            {/* Downward Triangles */}
            <polygon
              points="200,280 160,160 240,160"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-red-500 dark:text-red-600"
              transform="rotate(180 200 200)"
            />
            
            <polygon
              points="200,260 170,180 230,180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-pink-500 dark:text-pink-600"
              transform="rotate(180 200 200)"
            />
            
            {/* Central Bindu (Point) */}
            <circle
              cx="200"
              cy="200"
              r="8"
              fill="currentColor"
              className="text-red-600 dark:text-red-400"
            />
            
            <circle
              cx="200"
              cy="200"
              r="4"
              fill="currentColor"
              className="text-pink-600 dark:text-pink-400"
            />
            
            {/* Sacred Geometry Lines */}
            <line
              x1="200"
              y1="50"
              x2="200"
              y2="350"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-red-300 dark:text-red-700"
            />
            
            <line
              x1="50"
              y1="200"
              x2="350"
              y2="200"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-red-300 dark:text-red-700"
            />
            
            {/* Diagonal Lines */}
            <line
              x1="85"
              y1="85"
              x2="315"
              y2="315"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-pink-300 dark:text-pink-700"
            />
            
            <line
              x1="315"
              y1="85"
              x2="85"
              y2="315"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-pink-300 dark:text-pink-700"
            />
          </svg>
        </div>
      </div>
      
      {/* Smaller Sri Chakras in corners */}
      <div className="absolute top-10 right-10 opacity-3 dark:opacity-5">
        <div className="w-32 h-32 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-400" />
            <polygon points="50,25 35,65 65,65" fill="none" stroke="currentColor" strokeWidth="1" className="text-pink-400" />
            <polygon points="50,75 35,35 65,35" fill="none" stroke="currentColor" strokeWidth="1" className="text-rose-400" transform="rotate(180 50 50)" />
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-red-500" />
          </svg>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 opacity-3 dark:opacity-5">
        <div className="w-24 h-24 animate-spin-slow" style={{ animationDuration: '25s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-pink-400" />
            <polygon points="50,30 40,60 60,60" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-400" />
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-pink-500" />
          </svg>
        </div>
      </div>
      
      {/* Floating Sacred Symbols */}
      <div className="absolute top-1/4 left-1/4 opacity-10 dark:opacity-20 animate-float">
        <div className="text-4xl text-red-400 dark:text-red-600 font-sanskrit">ॐ</div>
      </div>
      
      <div className="absolute top-3/4 right-1/4 opacity-10 dark:opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="text-3xl text-pink-400 dark:text-pink-600 font-sanskrit">श्रीं</div>
      </div>
      
      <div className="absolute top-1/2 right-1/6 opacity-10 dark:opacity-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="text-2xl text-rose-400 dark:text-rose-600 font-sanskrit">ह्रीं</div>
      </div>
    </div>
  )
}
