'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BookOpen } from 'lucide-react';
import { spiritualQuotes } from '@/data/sahasranamData';

export default function SpiritualQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % spiritualQuotes.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  const nextQuote = () => {
    setCurrentQuote(prev => (prev + 1) % spiritualQuotes.length);
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/10 dark:bg-black/20 border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-yellow-400">Sacred Wisdom</h3>
        </div>
        <Button
          onClick={nextQuote}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-yellow-400"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2 leading-relaxed">
              {spiritualQuotes[currentQuote].sanskrit}
            </div>
            <div className="text-lg text-gray-300 italic mb-3">
              {spiritualQuotes[currentQuote].transliteration}
            </div>
            <div className="text-gray-100 leading-relaxed mb-2">
              {spiritualQuotes[currentQuote].meaning}
            </div>
            <div className="text-sm text-gray-400">
              — {spiritualQuotes[currentQuote].source}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-4 space-x-2">
        {spiritualQuotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentQuote ? 'bg-yellow-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </Card>
  );
}