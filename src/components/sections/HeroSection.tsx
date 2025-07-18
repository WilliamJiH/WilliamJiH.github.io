'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Spotlight } from '@/components/ui/spotlight';
import { HypertextReveal } from '@/components/ui/hypertext';
import { AuroraText } from '@/components/ui/animated-text';
import { SENTENCES } from '@/constants';
import { SectionProps } from '@/types';

interface HeroSectionProps extends SectionProps {
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  children,
  onScrollToNext,
  className = ''
}) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showSentence, setShowSentence] = useState(false);

  const cycleSentences = useCallback(() => {
    setShowSentence(true);

    setTimeout(() => {
      setShowSentence(false);

      setTimeout(() => {
        setCurrentSentence((prev) => (prev + 1) % SENTENCES.length);
        cycleSentences();
      }, 1500);
    }, 4000);
  }, []);

  useEffect(() => {
    const startSentences = setTimeout(() => {
      cycleSentences();
    }, 3500);

    return () => clearTimeout(startSentences);
  }, [cycleSentences]);

  return (
    <section 
      className={`h-screen w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden ${className}`}
      aria-label="Hero section"
    >
      {/* Beam */}
      <div className='beam rounded-full pointer-events-none' aria-hidden="true"></div>
      <Spotlight className='-top-40 left-0 md:left-60 md:-top-20' />
      
      <div className='p-4 sm:p-6 md:p-8 max-w-7xl mx-auto relative z-10 w-full h-full flex flex-col'>
        {/* Title section - 25% height on phones, vertically centered on other screens */}
        <header className='text-center flex-shrink-0 h-[25vh] sm:h-auto sm:flex-1 flex flex-col justify-center'>
          <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold'>
            <HypertextReveal
              text='Hello, '
              className='bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700'
              delay={0.5}
              duration={1}
            />
            <HypertextReveal
              text="I'm "
              className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'
              delay={1.5}
              duration={0.5}
            />
            <AuroraText text='William Ji.' delay={2} />
          </h1>

          <div className='mt-4 md:mt-6 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold flex justify-center items-center px-4'>
            <motion.div
              key={currentSentence}
              initial={{ opacity: 0 }}
              animate={{ opacity: showSentence ? 1 : 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className='h-8 md:h-12 flex items-center justify-center text-neutral-300 text-center'
              aria-live="polite"
              aria-atomic="true"
            >
              {SENTENCES[currentSentence]}
            </motion.div>
          </div>
        </header>

        {/* Down arrow button section - 75% height on phones, positioned at 85% on other screens */}
        <div className='flex-1 h-[75vh] sm:h-auto sm:absolute sm:top-[85vh] sm:left-1/2 sm:transform sm:-translate-x-1/2 flex items-center justify-center'>
          <div className='animate-bounce'>
            <button
              onClick={onScrollToNext}
              className='arrow-button w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:border-white/60 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50'
              aria-label="Scroll to next section"
            >
              <svg
                className='w-5 h-5 md:w-6 md:h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                strokeWidth='2'
                aria-hidden="true"
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 5v14m7-7l-7 7-7-7' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
};