'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface HypertextProps {
  text: string;
  className?: string;
  animationDuration?: number;
  framerProps?: any;
}

export const Hypertext = ({ text, className = '', animationDuration = 0.5, framerProps }: HypertextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, (animationDuration * 1000) / text.length);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, animationDuration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...framerProps}
    >
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className='inline-block'
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
};

interface HypertextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()';

export const HypertextReveal = ({ text, className = '', delay = 0 }: HypertextRevealProps) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const startAnimation = () => {
      let iteration = 0;
      const scrambleInterval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return char;
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(scrambleInterval);
          setDisplayText(text);
        }

        iteration += 1;
      }, 50);
    };

    const timer = setTimeout(startAnimation, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: 'easeOut',
      }}
    >
      {displayText}
    </motion.span>
  );
};
