'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackgroundEffectsProps {
  theme: 'sri-yantra' | 'temple' | 'lotus' | 'cosmic';
  timeTheme: 'dawn' | 'noon' | 'dusk' | 'night' | 'auto';
  showParticles: boolean;
  reducedMotion: boolean;
}

const SriYantra = ({ timeTheme }: { timeTheme: string }) => {
  const getColors = () => {
    switch (timeTheme) {
      case 'dawn':
        return ['#FF6B6B', '#FFA500', '#FFD700'];
      case 'noon':
        return ['#FFD700', '#FFA500', '#FF4500'];
      case 'dusk':
        return ['#8A2BE2', '#FF1493', '#FF6347'];
      case 'night':
        return ['#000080', '#4B0082', '#8A2BE2'];
      default:
        return ['#FFD700', '#FFA500', '#FF4500'];
    }
  };

  const colors = getColors();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        className="absolute inset-0"
      >
        <defs>
          <radialGradient id="yantraGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="0.3" />
            <stop offset="50%" stopColor={colors[1]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors[2]} stopOpacity="0.1" />
          </radialGradient>
        </defs>
        
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          transform="translate(400, 400)"
        >
          {/* Outer triangles */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
            <motion.polygon
              key={`outer-${i}`}
              points="0,-200 -173,100 173,100"
              fill="none"
              stroke={colors[0]}
              strokeWidth="2"
              opacity="0.6"
              transform={`rotate(${rotation})`}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          
          {/* Middle triangles */}
          {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
            <motion.polygon
              key={`middle-${i}`}
              points="0,-150 -130,75 130,75"
              fill="none"
              stroke={colors[1]}
              strokeWidth="1.5"
              opacity="0.7"
              transform={`rotate(${rotation})`}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          
          {/* Inner triangles */}
          {[0, 72, 144, 216, 288].map((rotation, i) => (
            <motion.polygon
              key={`inner-${i}`}
              points="0,-100 -87,50 87,50"
              fill="none"
              stroke={colors[2]}
              strokeWidth="1"
              opacity="0.8"
              transform={`rotate(${rotation})`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          
          {/* Central bindu */}
          <motion.circle
            cx="0"
            cy="0"
            r="8"
            fill={colors[0]}
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

const Temple = ({ timeTheme }: { timeTheme: string }) => {
  const getGradient = () => {
    switch (timeTheme) {
      case 'dawn':
        return 'from-orange-900 via-red-800 to-pink-700';
      case 'noon':
        return 'from-blue-600 via-cyan-500 to-blue-400';
      case 'dusk':
        return 'from-purple-900 via-pink-800 to-orange-700';
      case 'night':
        return 'from-indigo-900 via-purple-900 to-black';
      default:
        return 'from-blue-600 via-cyan-500 to-blue-400';
    }
  };

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${getGradient()}`}>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <svg
          width="600"
          height="400"
          viewBox="0 0 600 400"
          className="opacity-30"
        >
          {/* Temple silhouette */}
          <motion.path
            d="M50 400 L50 300 L100 250 L150 200 L200 150 L250 100 L300 80 L350 100 L400 150 L450 200 L500 250 L550 300 L550 400 Z"
            fill="#000"
            opacity="0.7"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Temple towers */}
          {[150, 300, 450].map((x, i) => (
            <motion.rect
              key={i}
              x={x - 25}
              y={200 - i * 20}
              width="50"
              height={200 + i * 20}
              fill="#000"
              opacity="0.6"
              animate={{ scaleY: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, delay: i }}
            />
          ))}
          
          {/* Golden glow effects */}
          <motion.circle
            cx="300"
            cy="80"
            r="40"
            fill="url(#templeGlow)"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <defs>
            <radialGradient id="templeGlow">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const Lotus = ({ timeTheme }: { timeTheme: string }) => {
  const getPetalColor = () => {
    switch (timeTheme) {
      case 'dawn':
        return '#FFB6C1';
      case 'noon':
        return '#FF69B4';
      case 'dusk':
        return '#FF1493';
      case 'night':
        return '#8B008B';
      default:
        return '#FF69B4';
    }
  };

  const petalColor = getPetalColor();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating lotus petals */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 100 }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <ellipse
              cx="15"
              cy="15"
              rx="12"
              ry="6"
              fill={petalColor}
              opacity="0.6"
              transform="rotate(45 15 15)"
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Central lotus */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg width="400" height="400" viewBox="0 0 400 400">
          {[...Array(8)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx="200"
              cy="200"
              rx="80"
              ry="20"
              fill={petalColor}
              opacity="0.4"
              transform={`rotate(${i * 45} 200 200)`}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          
          <motion.circle
            cx="200"
            cy="200"
            r="15"
            fill="#FFD700"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </div>
    </div>
  );
};

const Cosmic = ({ timeTheme }: { timeTheme: string }) => {
  const [stars] = useState(() =>
    [...Array(100)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * 3 + 2,
    }))
  );

  const getBgColor = () => {
    switch (timeTheme) {
      case 'dawn':
        return 'from-purple-900 to-pink-900';
      case 'noon':
        return 'from-blue-900 to-cyan-900';
      case 'dusk':
        return 'from-indigo-900 to-purple-900';
      case 'night':
        return 'from-black to-gray-900';
      default:
        return 'from-black to-gray-900';
    }
  };

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${getBgColor()}`}>
      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3] }}
          transition={{ duration: star.twinkle, repeat: Infinity }}
        />
      ))}
      
      {/* Nebula effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,105,180,0.3) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Galaxy spiral */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg width="256" height="256" viewBox="0 0 256 256">
          <defs>
            <radialGradient id="galaxyGradient">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FF69B4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <path
            d="M128,128 Q128,64 192,128 Q128,192 64,128 Q128,64 128,128"
            stroke="url(#galaxyGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
        </svg>
      </motion.div>
    </div>
  );
};

const Particles = ({ count = 50, color = '#FFD700' }: { count?: number; color?: string }) => {
  const [particles] = useState(() =>
    [...Array(count)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            backgroundColor: color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

export default function BackgroundEffects({ 
  theme, 
  timeTheme, 
  showParticles, 
  reducedMotion 
}: BackgroundEffectsProps) {
  const renderBackground = () => {
    if (reducedMotion) {
      return <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black opacity-80" />;
    }

    switch (theme) {
      case 'sri-yantra':
        return <SriYantra timeTheme={timeTheme} />;
      case 'temple':
        return <Temple timeTheme={timeTheme} />;
      case 'lotus':
        return <Lotus timeTheme={timeTheme} />;
      case 'cosmic':
        return <Cosmic timeTheme={timeTheme} />;
      default:
        return <SriYantra timeTheme={timeTheme} />;
    }
  };

  return (
    <div className="fixed inset-0 z-0">
      {renderBackground()}
      {showParticles && !reducedMotion && (
        <Particles count={30} color="#FFD700" />
      )}
    </div>
  );
}