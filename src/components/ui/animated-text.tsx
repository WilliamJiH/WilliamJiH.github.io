'use client';

import React from 'react';
import { motion } from 'motion/react';
import { AnimatedTextProps } from '@/types';
import { ANIMATION_CONFIGS } from '@/constants';

export const AuroraText: React.FC<AnimatedTextProps> = ({ 
  text, 
  delay = 0, 
  className = '' 
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        backgroundImage: [
          'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
          'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
          'linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b, #10b981)',
          'linear-gradient(45deg, #ec4899, #f59e0b, #10b981, #3b82f6)',
          'linear-gradient(45deg, #f59e0b, #10b981, #3b82f6, #8b5cf6)',
          'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
        ],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay, ease: 'easeOut' },
        y: { duration: 0.5, delay: delay, ease: 'easeOut' },
        backgroundImage: ANIMATION_CONFIGS.AURORA,
      }}
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'aurora 6s ease-in-out infinite',
      }}
    >
      {text}
    </motion.span>
  );
};

export const OutlineText: React.FC<AnimatedTextProps & { strokeColor?: string }> = ({
  text,
  delay = 0,
  className = '',
  strokeColor = 'white'
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className={className}
      style={{
        color: 'transparent',
        WebkitTextStroke: `2px ${strokeColor}`,
      }}
    >
      {text}
    </motion.span>
  );
};

export const FadeInText: React.FC<AnimatedTextProps & { direction?: 'x' | 'y' }> = ({
  text,
  delay = 0,
  className = '',
  direction = 'x'
}) => {
  const initialDirection = direction === 'x' ? { x: -100 } : { y: 50 };
  const animateDirection = direction === 'x' ? { x: 0 } : { y: 0 };

  return (
    <motion.span
      initial={{ opacity: 0, ...initialDirection }}
      animate={{ opacity: 1, ...animateDirection }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className={className}
    >
      {text}
    </motion.span>
  );
};