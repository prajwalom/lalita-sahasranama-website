'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { chakraData } from '@/data/sahasranamData';

export default function ChakraVisualization() {
  const [activeChakra, setActiveChakra] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startChakraAnimation = () => {
    setIsAnimating(true);
    let currentChakra = 0;
    
    const interval = setInterval(() => {
      setActiveChakra(currentChakra);
      currentChakra++;
      
      if (currentChakra >= chakraData.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setActiveChakra(0);
      }
    }, 2000);
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20">
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-yellow-400">Chakra Meditation</h3>
        
        <div className="relative w-80 h-96 mx-auto">
          {/* Human silhouette */}
          <svg viewBox="0 0 200 300" className="w-full h-full">
            <path
              d="M100 20 C110 20 120 30 120 40 C120 50 110 60 100 60 C90 60 80 50 80 40 C80 30 90 20 100 20 Z
                 M100 60 L100 80 L90 100 L90 150 L85 200 L85 250 L90 280 L95 290
                 M100 60 L100 80 L110 100 L110 150 L115 200 L115 250 L110 280 L105 290
                 M100 80 L80 90 L70 100 L75 110 L90 100
                 M100 80 L120 90 L130 100 L125 110 L110 100"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
            />
            
            {/* Chakra points */}
            {chakraData.map((chakra, index) => {
              const positions = [
                { x: 100, y: 260 }, // Root
                { x: 100, y: 230 }, // Sacral
                { x: 100, y: 200 }, // Solar Plexus
                { x: 100, y: 160 }, // Heart
                { x: 100, y: 120 }, // Throat
                { x: 100, y: 80 },  // Third Eye
                { x: 100, y: 40 }   // Crown
              ];
              
              return (
                <motion.circle
                  key={index}
                  cx={positions[index].x}
                  cy={positions[index].y}
                  r={activeChakra === index ? 15 : 8}
                  fill={chakra.color}
                  opacity={activeChakra === index ? 1 : 0.6}
                  animate={{
                    scale: activeChakra === index ? [1, 1.3, 1] : 1,
                    opacity: activeChakra === index ? [0.6, 1, 0.6] : 0.6
                  }}
                  transition={{
                    duration: 2,
                    repeat: activeChakra === index ? Infinity : 0
                  }}
                  className="cursor-pointer"
                  onClick={() => setActiveChakra(index)}
                />
              );
            })}
          </svg>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-xl font-bold" style={{ color: chakraData[activeChakra].color }}>
              {chakraData[activeChakra].name}
            </h4>
            <p className="text-lg text-gray-300">{chakraData[activeChakra].sanskrit}</p>
            <p className="text-sm text-gray-400 mt-2">{chakraData[activeChakra].description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Element:</span>
              <span className="ml-2 text-white">{chakraData[activeChakra].element}</span>
            </div>
            <div>
              <span className="text-gray-400">Mantra:</span>
              <span className="ml-2 text-yellow-400 font-bold">{chakraData[activeChakra].mantra}</span>
            </div>
          </div>

          <Button
            onClick={startChakraAnimation}
            disabled={isAnimating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isAnimating ? 'Activating Chakras...' : 'Start Chakra Activation'}
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 mt-6">
          {chakraData.map((chakra, index) => (
            <Button
              key={index}
              variant={activeChakra === index ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChakra(index)}
              className="h-8 text-xs"
              style={{
                backgroundColor: activeChakra === index ? chakra.color : 'transparent',
                borderColor: chakra.color
              }}
            >
              {chakra.mantra}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}