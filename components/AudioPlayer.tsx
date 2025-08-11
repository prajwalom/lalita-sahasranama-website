'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  currentVerse: number;
  onVerseChange: (verse: number) => void;
  totalVerses: number;
  volume: number;
}

export default function AudioPlayer({ currentVerse, onVerseChange, totalVerses, volume }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [localVolume, setLocalVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Update local volume when prop changes
  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);

  // Simulated audio tracks (in a real app, these would be actual audio files)
  const audioTracks = [
    { title: "Sri Mata", duration: 45 },
    { title: "Sri Maharajni", duration: 52 },
    { title: "Srimat Simhasaneshvari", duration: 48 },
    // Add more tracks as needed
  ];

  useEffect(() => {
    // Simulate audio playback
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const trackDuration = audioTracks[currentVerse % audioTracks.length]?.duration || 45;
          if (prev >= trackDuration) {
            // Auto-advance to next verse
            onVerseChange((currentVerse + 1) % totalVerses);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentVerse, onVerseChange, totalVerses]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTrack = audioTracks[currentVerse % audioTracks.length];
  const progress = currentTrack ? (currentTime / currentTrack.duration) * 100 : 0;

  return (
    <Card className="p-4 backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20">
      <div className="space-y-4">
        {/* Track Info */}
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 dark:text-white truncate">
            {currentTrack?.title || `Verse ${currentVerse + 1}`}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Lalita Sahasranama • Verse {currentVerse + 1} of {totalVerses}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-yellow-400 dark:to-orange-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack?.duration || 0)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={() => onVerseChange(Math.max(0, currentVerse - 1))}
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            onClick={togglePlay}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-yellow-400 dark:to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-full w-12 h-12"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>

          <Button
            onClick={() => onVerseChange(Math.min(totalVerses - 1, currentVerse + 1))}
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            {isMuted || localVolume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          
          <Slider
            value={[isMuted ? 0 : localVolume]}
            onValueChange={([value]) => {
              setLocalVolume(value);
              setIsMuted(value === 0);
            }}
            max={100}
            step={1}
            className="flex-1"
          />
          
          <span className="text-xs text-gray-600 dark:text-gray-400 w-8 text-right">
            {isMuted ? 0 : localVolume}
          </span>
        </div>

        {/* Visualization */}
        <div className="flex justify-center space-x-1 h-8 items-end">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-t from-amber-500 to-orange-600 dark:from-yellow-400 dark:to-orange-600 w-1 rounded-full"
              animate={{
                height: isPlaying ? [4, Math.random() * 24 + 4, 4] : 4,
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: isPlaying ? Infinity : 0,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}