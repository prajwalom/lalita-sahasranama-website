'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MeditationTimerProps {
  onComplete?: () => void;
}

export default function MeditationTimer({ onComplete }: MeditationTimerProps) {
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState('breath');

  const meditationGuides = {
    breath: {
      name: 'Breath Awareness',
      instructions: 'Focus on your natural breath. Observe each inhalation and exhalation without trying to change it.'
    },
    mantra: {
      name: 'Om Chanting',
      instructions: 'Silently repeat "Om" with each breath. Feel the vibration of this sacred sound within you.'
    },
    loving: {
      name: 'Loving Kindness',
      instructions: 'Send love and compassion to yourself, then extend it to all beings in the universe.'
    },
    yantra: {
      name: 'Sri Yantra Focus',
      instructions: 'Visualize the Sri Yantra in your mind\'s eye. Focus on the central point and feel its divine energy.'
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  const reset = () => {
    setTimeLeft(duration);
    setIsActive(false);
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20">
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-yellow-400">Meditation Timer</h3>
        
        <div className="space-y-4">
          <Select value={duration.toString()} onValueChange={(value) => {
            const newDuration = parseInt(value);
            setDuration(newDuration);
            setTimeLeft(newDuration);
            setIsActive(false);
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">5 minutes</SelectItem>
              <SelectItem value="600">10 minutes</SelectItem>
              <SelectItem value="900">15 minutes</SelectItem>
              <SelectItem value="1200">20 minutes</SelectItem>
              <SelectItem value="1800">30 minutes</SelectItem>
              <SelectItem value="3600">60 minutes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedGuide} onValueChange={setSelectedGuide}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(meditationGuides).map(([key, guide]) => (
                <SelectItem key={key} value={key}>{guide.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#timerGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {isActive ? 'Meditating...' : 'Ready'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setIsActive(!isActive)}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-600 hover:from-yellow-500 hover:to-orange-700"
          >
            {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <Button onClick={reset} variant="outline" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        <div className="text-left bg-white/5 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-400 mb-2">
            {meditationGuides[selectedGuide as keyof typeof meditationGuides].name}
          </h4>
          <p className="text-sm text-gray-300">
            {meditationGuides[selectedGuide as keyof typeof meditationGuides].instructions}
          </p>
        </div>

        {timeLeft === 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <Bell className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-lg font-semibold text-white">Meditation Complete!</p>
            <p className="text-sm text-gray-300">Take a moment to appreciate your practice</p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}