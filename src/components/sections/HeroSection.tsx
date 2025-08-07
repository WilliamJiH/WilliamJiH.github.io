'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SectionProps } from '@/types';
import { OutlineText } from '@/components/ui/animated-text';

interface HeroSectionProps extends SectionProps {
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ children, onScrollToNext, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const greeting = "Hello, I'm ";
  const name = 'William Ji.';
  const subtitle = 'Moving fast. Breaking nothing.';

  return (
    <section
      className={`h-screen w-full flex items-center justify-center relative overflow-hidden bg-black ${className}`}
      aria-label='Hero section'
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        className='absolute inset-0 w-full h-full object-cover'
        style={{ zIndex: 1 }}
      >
        <source src='/hero-video.mp4' type='video/mp4' />
      </video>

      {/* Dark overlay for contrast */}
      <div className='absolute inset-0 bg-black/70' style={{ zIndex: 2 }} />

      {/* Interactive cursor glow */}
      <motion.div
        className='absolute pointer-events-none z-10'
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className='w-96 h-96 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-xl' />
      </motion.div>

      <div className='px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-20 w-full h-full flex flex-col'>
        <div className='flex-1 flex flex-col justify-center items-center text-center'>
          <header className='mb-8'>
            <motion.h1
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative cursor-pointer'
              style={{
                fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                perspective: '1000px',
              }}
              variants={wordVariants}
              initial='hidden'
              animate='visible'
            >
              <span className='text-white'>
                {greeting.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    custom={i}
                    className='inline-block'
                    style={{
                      transformOrigin: 'center bottom',
                      display: char === ' ' ? 'inline' : 'inline-block',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              <OutlineText text={name} delay={greeting.length * 0.1 + 0.2} />
            </motion.h1>

            <motion.div
              className='text-xl sm:text-2xl md:text-3xl text-neutral-300 font-medium relative overflow-hidden'
              style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <motion.p
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{
                  delay: 2.2,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
                className='whitespace-nowrap overflow-hidden'
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </header>

          <motion.div
            className='max-w-2xl mx-auto mb-16'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 3.5 }}
          >
            <motion.p
              className='text-lg md:text-xl text-neutral-400 leading-relaxed'
              style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
            >
              Full-stack developer, financial derivatives specialist, and recent CS & Stats graduate from the University
              of Toronto.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className='flex justify-center pb-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 4 }}
        >
          <div className='animate-bounce'>
            <motion.button
              onClick={onScrollToNext}
              className='w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:border-white/60 hover:bg-white/10 transition-all duration-300 focus:outline-none'
              aria-label='Scroll to about section'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                strokeWidth='2'
                aria-hidden='true'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19 14l-7 7m0 0l-7-7m7 7V3' />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {children}
    </section>
  );
};
