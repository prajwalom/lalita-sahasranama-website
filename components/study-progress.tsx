"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Calendar, Flame, BookOpen, Star, TrendingUp, Award, Clock } from 'lucide-react'

interface StudyProgressProps {
  versesStudiedToday: number
  dailyGoal: number
  studyStreak: number
  totalVersesStudied: number
  favoriteCount: number
  readingTime: number
  onGoalChange: (goal: number) => void
}

export function StudyProgress({ 
  versesStudiedToday, 
  dailyGoal, 
  studyStreak, 
  totalVersesStudied,
  favoriteCount,
  readingTime,
  onGoalChange 
}: StudyProgressProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  const progressPercentage = Math.min((versesStudiedToday / dailyGoal) * 100, 100)
  const isGoalMet = versesStudiedToday >= dailyGoal
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  const getStreakMessage = () => {
    if (studyStreak >= 30) return "🏆 Devotion Master!"
    if (studyStreak >= 14) return "🔥 On Fire!"
    if (studyStreak >= 7) return "⭐ Great Progress!"
    if (studyStreak >= 3) return "📈 Building Habit!"
    return "🌱 Getting Started!"
  }

  return (
    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-red-200 dark:border-red-700 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-red-800 dark:text-red-200 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Daily Progress
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-red-600 dark:text-red-400"
          >
            {showDetails ? 'Less' : 'More'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Daily Goal Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              Today's Goal: {versesStudiedToday}/{dailyGoal} verses
            </span>
            {isGoalMet && <Badge className="bg-green-500 text-white">✓ Complete!</Badge>}
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-xs text-red-600 dark:text-red-400 text-center">
            {progressPercentage.toFixed(0)}% Complete
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-100/50 dark:bg-red-900/20 rounded-lg p-3 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center mb-1">
              <Flame className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-xs text-red-600 dark:text-red-400">Streak</span>
            </div>
            <div className="text-lg font-bold text-red-800 dark:text-red-200">{studyStreak}</div>
            <div className="text-xs text-red-600 dark:text-red-400">days</div>
          </div>
          
          <div className="bg-pink-100/50 dark:bg-pink-900/20 rounded-lg p-3 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center mb-1">
              <BookOpen className="h-4 w-4 text-pink-500 mr-1" />
              <span className="text-xs text-pink-600 dark:text-pink-400">Total</span>
            </div>
            <div className="text-lg font-bold text-pink-800 dark:text-pink-200">{totalVersesStudied}</div>
            <div className="text-xs text-pink-600 dark:text-pink-400">verses</div>
          </div>
        </div>

        {/* Streak Message */}
        <div className="text-center p-2 bg-gradient-to-r from-red-200/50 to-pink-200/50 dark:from-red-800/30 dark:to-pink-800/30 rounded-lg backdrop-blur-sm">
          <span className="text-sm font-medium text-red-800 dark:text-red-200">
            {getStreakMessage()}
          </span>
        </div>

        {/* Detailed Stats */}
        {showDetails && (
          <div className="space-y-3 pt-3 border-t border-red-200 dark:border-red-800">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-red-600 dark:text-red-400">Reading Time:</span>
                <span className="font-medium text-red-800 dark:text-red-200">{formatTime(readingTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600 dark:text-red-400">Favorites:</span>
                <span className="font-medium text-red-800 dark:text-red-200">{favoriteCount}</span>
              </div>
            </div>
            
            {/* Goal Adjustment */}
            <div className="space-y-2">
              <label className="text-xs text-red-600 dark:text-red-400">Adjust Daily Goal:</label>
              <div className="flex space-x-2">
                {[5, 10, 15, 20, 25].map((goal) => (
                  <Button
                    key={goal}
                    variant={dailyGoal === goal ? "default" : "outline"}
                    size="sm"
                    onClick={() => onGoalChange(goal)}
                    className={`text-xs flex-1 ${
                      dailyGoal === goal 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                        : 'border-red-300 dark:border-red-700'
                    }`}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
