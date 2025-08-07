"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react'

interface QuizQuestion {
  id: number
  sanskrit: string
  options: string[]
  correct: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    sanskrit: "श्री माता",
    options: ["The Divine Mother", "The Great Queen", "The Sacred Fire", "The Lotus Goddess"],
    correct: 0,
    explanation: "श्री माता means 'The Divine Mother' - She who is the supreme mother of all creation."
  },
  {
    id: 2,
    sanskrit: "श्री महाराज्ञी",
    options: ["The Divine Mother", "The Great Queen", "The Sacred Throne", "The Cosmic Fire"],
    correct: 1,
    explanation: "श्री महाराज्ञी means 'The Great Queen' - She who rules over all the three worlds."
  },
  {
    id: 3,
    sanskrit: "चिदग्निकुण्डसम्भूता",
    options: ["Born from lotus", "Born from fire of consciousness", "Born from sacred water", "Born from divine light"],
    correct: 1,
    explanation: "चिदग्निकुण्डसम्भूता means 'Born from the fire of consciousness' - representing divine emergence."
  },
  {
    id: 4,
    sanskrit: "देवकार्यसमुद्यता",
    options: ["Divine beauty", "Sacred knowledge", "Ready for divine work", "Cosmic dancer"],
    correct: 2,
    explanation: "देवकार्यसमुद्यता means 'Ready for divine work' - always prepared to help and protect."
  },
  {
    id: 5,
    sanskrit: "उद्यद्भानुसहस्राभा",
    options: ["Thousand-armed goddess", "Radiant as thousand suns", "Thousand-eyed deity", "Thousand-petaled lotus"],
    correct: 1,
    explanation: "उद्यद्भानुसहस्राभा means 'Radiant as a thousand rising suns' - describing Her luminous form."
  }
]

interface QuizModeProps {
  isOpen: boolean
  onClose: () => void
}

export function QuizMode({ isOpen, onClose }: QuizModeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setAnswered(false)
    setUserAnswers([])
  }

  const handleAnswer = (answerIndex: number) => {
    if (answered) return
    
    setSelectedAnswer(answerIndex)
    setAnswered(true)
    
    const newAnswers = [...userAnswers, answerIndex]
    setUserAnswers(newAnswers)
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 90) return "🏆 Excellent! You are a true devotee!"
    if (percentage >= 70) return "🌟 Very Good! Your knowledge is impressive!"
    if (percentage >= 50) return "🙏 Good effort! Keep studying the sacred names!"
    return "📚 Keep learning! The Divine Mother's names are infinite wisdom!"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/90 dark:to-orange-900/90 border-amber-200 dark:border-amber-800 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-6 w-6" />
              <CardTitle className="text-xl">Sacred Knowledge Quiz</CardTitle>
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

        <CardContent className="p-8">
          {!showResult ? (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <Badge variant="outline" className="border-amber-300 dark:border-amber-700">
                    Score: {score}/{quizQuestions.length}
                  </Badge>
                </div>
                <Progress 
                  value={((currentQuestion + 1) / quizQuestions.length) * 100} 
                  className="h-2"
                />
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-2xl font-sanskrit text-amber-800 dark:text-amber-200 mb-4 text-center">
                  {quizQuestions[currentQuestion].sanskrit}
                </h3>
                <p className="text-center text-amber-600 dark:text-amber-400 mb-6">
                  What does this sacred name mean?
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full p-4 h-auto text-left justify-start ${
                        answered
                          ? index === quizQuestions[currentQuestion].correct
                            ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-200'
                            : selectedAnswer === index
                            ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-200'
                            : 'opacity-50'
                          : 'hover:bg-amber-50 dark:hover:bg-amber-900/20 border-amber-300 dark:border-amber-700'
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                    >
                      <div className="flex items-center space-x-3">
                        {answered && index === quizQuestions[currentQuestion].correct && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {answered && selectedAnswer === index && index !== quizQuestions[currentQuestion].correct && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Explanation */}
                {answered && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Next Button */}
              {answered && (
                <div className="text-center">
                  <Button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Show Results'}
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Results */
            <div className="text-center space-y-6">
              <div className="mb-6">
                <Trophy className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                  Quiz Complete!
                </h3>
                <p className="text-lg text-amber-600 dark:text-amber-400">
                  {getScoreMessage()}
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <div className="text-3xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                  {score} / {quizQuestions.length}
                </div>
                <div className="text-amber-600 dark:text-amber-400">
                  {Math.round((score / quizQuestions.length) * 100)}% Correct
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-amber-300 dark:border-amber-700"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  Continue Reading
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
