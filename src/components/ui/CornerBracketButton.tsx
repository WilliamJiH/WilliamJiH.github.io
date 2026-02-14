'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useClickSound } from '@/hooks/use-click-sound';

interface CornerBracketButtonProps {
  children: React.ReactNode;
  variant?: 'outline' | 'filled';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const CornerBracketButton: React.FC<CornerBracketButtonProps> = ({ 
  children, 
  variant = 'outline', 
  onClick, 
  href,
  className = ''
}) => {
  const playClick = useClickSound(0.2);
  const [hovered, setHovered] = useState(false);
  const isOutline = variant === 'outline';
  const bracketColor = isOutline ? 'rgba(255,255,255,0.7)' : 'rgba(0,212,255,0.85)';
  const cornerThickness = hovered ? 2.5 : 2;

  const edgeStyle = (
    edge: 'top' | 'bottom' | 'left' | 'right'
  ): React.CSSProperties => {
    const isHorizontal = edge === 'top' || edge === 'bottom';
    const cornerLen = '12px';

    return {
      position: 'absolute',
      backgroundColor: bracketColor,
      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: 'none',
      zIndex: 1,
      ...(isHorizontal
        ? {
            height: `${cornerThickness}px`,
            left: 0,
            width: hovered ? '100%' : cornerLen,
            ...(edge === 'top' ? { top: 0 } : { bottom: 0 }),
          }
        : {
            width: `${cornerThickness}px`,
            top: 0,
            height: hovered ? '100%' : cornerLen,
            ...(edge === 'left' ? { left: 0 } : { right: 0 }),
          }),
    };
  };

  const edgeStyleMirrored = (
    edge: 'top' | 'bottom' | 'left' | 'right'
  ): React.CSSProperties => {
    const isHorizontal = edge === 'top' || edge === 'bottom';
    const cornerLen = '12px';

    return {
      position: 'absolute',
      backgroundColor: bracketColor,
      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: 'none',
      zIndex: 1,
      ...(isHorizontal
        ? {
            height: `${cornerThickness}px`,
            right: 0,
            width: hovered ? '100%' : cornerLen,
            ...(edge === 'top' ? { top: 0 } : { bottom: 0 }),
          }
        : {
            width: `${cornerThickness}px`,
            bottom: 0,
            height: hovered ? '100%' : cornerLen,
            ...(edge === 'left' ? { left: 0 } : { right: 0 }),
          }),
    };
  };

  const borderColor = isOutline ? 'rgba(255,255,255,0.12)' : 'rgba(0,212,255,0.2)';

  const baseClass = [
    'relative cursor-pointer px-8 py-3 text-sm tracking-[0.2em] uppercase font-medium inline-block text-center',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    isOutline
      ? 'text-white/90 bg-white/[0.04] hover:bg-white/[0.08]'
      : 'text-white hover:brightness-110',
    className
  ].join(' ');

  const inner = (
    <>
      <span aria-hidden='true' style={edgeStyle('top')} />
      <span aria-hidden='true' style={edgeStyle('left')} />
      <span aria-hidden='true' style={edgeStyleMirrored('bottom')} />
      <span aria-hidden='true' style={edgeStyleMirrored('right')} />
      <span aria-hidden='true' style={edgeStyleMirrored('top')} />
      <span aria-hidden='true' style={edgeStyle('right')} />
      <span aria-hidden='true' style={edgeStyle('bottom')} />
      <span aria-hidden='true' style={edgeStyleMirrored('left')} />
      {children}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  const btnStyle: React.CSSProperties = {
    fontFamily: 'var(--font-brandon), system-ui, sans-serif',
    border: `1px solid ${borderColor}`,
    ...(isOutline ? {} : { backgroundColor: 'rgba(0,35,45,0.95)' }),
  };

  const handleClick = (e: React.MouseEvent) => {
    playClick();
    if (onClick) onClick();
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        style={btnStyle}
        whileTap={{ scale: 0.97 }}
        onClick={playClick}
        {...handlers}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      className={baseClass}
      style={btnStyle}
      whileTap={{ scale: 0.97 }}
      {...handlers}
    >
      {inner}
    </motion.button>
  );
};
