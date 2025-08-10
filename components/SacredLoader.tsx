'use client';

import { motion } from 'framer-motion';

export default function SacredLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black flex items-center justify-center">
      <div className="text-center">
        {/* Sacred Om Symbol */}
        <motion.div
          className="text-8xl text-yellow-400 mb-8"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ॐ
        </motion.div>
        
        {/* Loading text */}
        <motion.div
          className="text-2xl text-white mb-8 font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          श्री ललिता सहस्रनाम
        </motion.div>
        
        <motion.div
          className="text-lg text-gray-300 mb-8"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          Invoking Divine Presence...
        </motion.div>
        
        {/* Sacred geometry loader */}
        <div className="relative w-32 h-32 mx-auto">
          <motion.div
            className="absolute inset-0 border-4 border-yellow-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ borderTopColor: 'transparent' }}
          />
          
          <motion.div
            className="absolute inset-2 border-4 border-orange-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ borderRightColor: 'transparent' }}
          />
          
          <motion.div
            className="absolute inset-4 border-4 border-red-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ borderBottomColor: 'transparent' }}
          />
          
          {/* Central lotus */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full flex items-center justify-center">
              <motion.div
                className="w-4 h-4 bg-white rounded-full"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Blessing text */}
        <motion.div
          className="mt-8 text-sm text-gray-400 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          "She who is the embodiment of pure consciousness and bliss"
        </motion.div>
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}