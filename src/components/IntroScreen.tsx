'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // After 2 seconds, start the transition
    const timer = setTimeout(() => {
      setIsAnimating(true);
      // Complete the intro after the animation finishes
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 1200);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden'
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3 }
          }}
        >
          <motion.h1
            className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black absolute'
            style={{ 
              fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
            }}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={isAnimating ? {
              opacity: 1,
              scale: [1, 0.15], // Scale down to match Hero section size
              x: [0, 0], // Move to center-left where Hero title is
              y: [0, -100], // Move up slightly to match Hero position
              color: '#ffffff' // Change to white to match Hero text
            } : {
              opacity: 1, 
              scale: 1
            }}
            transition={isAnimating ? {
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 1]
            } : {
              duration: 0.8, 
              ease: 'easeOut' 
            }}
          >
            William Ji
          </motion.h1>

          {/* Sliding panels to hide the page */}
          <motion.div
            className='absolute top-0 left-0 w-1/2 h-full bg-white z-10'
            initial={{ x: 0 }}
            animate={isAnimating ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
          <motion.div
            className='absolute top-0 right-0 w-1/2 h-full bg-white z-10'
            initial={{ x: 0 }}
            animate={isAnimating ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};