'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ElegantIntroTransitionProps {
  onComplete: () => void;
}

const ACCENT = '#00d4ff';
const ACCENT_DIM = 'rgba(0, 212, 255, 0.15)';
const ACCENT_LABEL = 'rgba(0, 212, 255, 0.5)';
const GLOW = 'rgba(0, 212, 255, 0.6)';

const LOAD_DURATION = 2800; // ms 0 → 100 %
const EXIT_DELAY = 350; // pause at 100 %
const EXIT_DURATION = 700; // fade-out

const BAR_HEIGHTS = [0.35, 0.55, 0.75, 1, 0.6]; // normalised signal bar heights

export const ElegantIntroTransition: React.FC<ElegantIntroTransitionProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exit' | 'complete'>('loading');
  const startRef = useRef(0);
  const rafRef = useRef(0);

  // Check reduced-motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finish = useCallback(() => {
    setPhase('complete');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Skip animation entirely for reduced-motion users
    if (prefersReducedMotion) {
      setProgress(100);
      finish();
      return;
    }

    startRef.current = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startRef.current) / LOAD_DURATION, 1);
      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase('exit'), EXIT_DELAY);
        setTimeout(finish, EXIT_DELAY + EXIT_DURATION);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReducedMotion, finish]);

  if (phase === 'complete') return null;

  return (
    <AnimatePresence>
      {(
        <motion.div
          className='fixed inset-0 z-50 flex flex-col select-none'
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION / 1000, ease: 'easeInOut' }}
          style={{
            backgroundColor: '#050508',
            backgroundImage: [
              `linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px)`,
              `linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)`,
            ].join(','),
            backgroundSize: '48px 48px',
          }}
          aria-live='polite'
          aria-label={`Loading ${progress}%`}
        >
          {/* Spacer pushes content to the bottom */}
          <div className='flex-1' />

          {/* ── Bottom HUD ── */}
          <div className='px-6 sm:px-8 md:px-12 lg:px-16 pb-8 sm:pb-10 md:pb-12'>
            {/* Percentage + label row */}
            <div className='flex items-end justify-between mb-5 md:mb-6'>
              {/* Left: percentage counter */}
              <div className='flex items-baseline gap-0.5'>
                <span
                  className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tabular-nums leading-none'
                  style={{
                    color: ACCENT,
                    fontFamily: 'var(--font-geist), system-ui, monospace',
                    textShadow: `0 0 30px ${GLOW}, 0 0 60px rgba(0,212,255,0.25)`,
                  }}
                >
                  {progress}
                </span>
                <span
                  className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none'
                  style={{
                    color: ACCENT,
                    fontFamily: 'var(--font-geist), system-ui, monospace',
                  }}
                >
                  %
                </span>
              </div>

              {/* Right: label + signal bars */}
              <div className='flex flex-col items-end gap-2'>
                <span
                  className='text-[10px] md:text-xs tracking-[0.25em] uppercase hidden sm:block'
                  style={{
                    color: ACCENT_LABEL,
                    fontFamily: 'var(--font-geist), system-ui, monospace',
                  }}
                >
                  Data Stream Bandwidth
                </span>

                {/* Signal bars */}
                <div className='flex items-end gap-[3px]'>
                  {BAR_HEIGHTS.map((h, i) => {
                    const lit = progress >= (i + 1) * 20;
                    return (
                      <motion.div
                        key={i}
                        className='w-[4px] md:w-[5px] rounded-[1px]'
                        style={{
                          height: `${h * 28}px`,
                          backgroundColor: lit ? ACCENT : ACCENT_DIM,
                          boxShadow: lit ? `0 0 6px ${GLOW}` : 'none',
                          transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
                        }}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Progress bar ── */}
            <div
              className='relative w-full h-[3px] rounded-full overflow-hidden'
              role='progressbar'
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ backgroundColor: ACCENT_DIM }}
            >
              <div
                className='absolute inset-y-0 left-0 rounded-full'
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${ACCENT}, #00e5ff)`,
                  boxShadow: `0 0 12px ${GLOW}, 0 0 4px rgba(0,212,255,0.4)`,
                  transition: 'width 0.08s linear',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
