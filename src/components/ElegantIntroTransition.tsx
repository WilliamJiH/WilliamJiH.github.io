'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ElegantIntroTransitionProps {
  onComplete: () => void;
}

export const ElegantIntroTransition: React.FC<ElegantIntroTransitionProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'fade-in' | 'display' | 'fade-out' | 'split' | 'complete'>('fade-in');

  useEffect(() => {
    // Fade in text
    const timer1 = setTimeout(() => {
      setPhase('display');
    }, 600);

    // Display for 2 seconds then start fade out
    const timer2 = setTimeout(() => {
      setPhase('fade-out');
    }, 2000);

    // Start page split after text fades out
    const timer3 = setTimeout(() => {
      setPhase('split');
    }, 2500);

    // Complete transition
    const timer4 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <>
          {/* White Background - disappears when split starts */}
          <motion.div
            className='fixed inset-0 z-40 bg-white'
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'split' ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Centered Text */}
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center pointer-events-none'
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 'fade-in' || phase === 'display' ? 1 : 0,
            }}
            transition={{
              duration: phase === 'fade-in' ? 0.6 : 0.5,
              ease: 'easeOut',
            }}
          >
            <motion.h1
              className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-bold tracking-tight text-black'
              style={{
                fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
              }}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.9,
              }}
              animate={
                phase === 'fade-in' || phase === 'display'
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }
              }
              transition={{
                duration: phase === 'fade-in' ? 0.8 : 0.4,
                ease: 'easeOut',
              }}
            >
              William Ji
            </motion.h1>
          </motion.div>

          {/* Left Half - always present, slides out left during split */}
          <motion.div
            className='fixed top-0 left-0 w-1/2 h-full z-45 bg-white'
            initial={{ x: 0 }}
            animate={{
              x: phase === 'split' ? '-100%' : 0,
            }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Right Half - always present, slides out right during split */}
          <motion.div
            className='fixed top-0 right-0 w-1/2 h-full z-45 bg-white'
            initial={{ x: 0 }}
            animate={{
              x: phase === 'split' ? '100%' : 0,
            }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
