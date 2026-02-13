'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { SectionProps } from '@/types';


const SciFiGlobe = dynamic(() => import('@/components/SciFiGlobe'), { ssr: false });

// ── Animated counter hook ──
function useCountUp(target: number, duration: number, started: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return count;
}

const HERO_STATS = [
  { value: new Date().getFullYear() - 2022, suffix: '', label: 'Experience' },
  { value: 12, suffix: '', label: 'Projects' },
  { value: 40, suffix: '+', label: 'AI Tutorials' },
  { value: 21, suffix: '', label: 'Countries' },
];

const StatItem: React.FC<{
  value: number; suffix: string; label: string; delay: number; started: boolean;
}> = ({ value, suffix, label, delay, started }) => {
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1800, visible);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [started, delay]);

  return (
    <motion.div
      className='flex flex-col items-center gap-1'
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span
        className='text-2xl sm:text-3xl md:text-4xl text-white'
        style={{
          fontFamily: 'var(--font-urbanist), system-ui, sans-serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        {count}{suffix}
      </span>
      <span
        className='text-[10px] sm:text-xs tracking-[0.15em] uppercase text-neutral-500'
        style={{ fontFamily: 'var(--font-brandon), system-ui, sans-serif' }}
      >
        {label}
      </span>
    </motion.div>
  );
};

// ── Year to Roman numeral ──
function toRoman(num: number): string {
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
}

// ── Button with L-shaped corner brackets that expand into full border on hover ──
const CornerBracketButton: React.FC<{
  children: React.ReactNode;
  variant?: 'outline' | 'filled';
  onClick?: () => void;
  href?: string;
}> = ({ children, variant = 'outline', onClick, href }) => {
  const [hovered, setHovered] = useState(false);
  const isOutline = variant === 'outline';
  const bracketColor = isOutline ? 'rgba(255,255,255,0.7)' : 'rgba(0,212,255,0.85)';
  const cornerThickness = hovered ? 2.5 : 2;

  // Each edge is a span that starts as a short line (corner piece) and grows to 100% on hover
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

  // Mirror edges anchored to opposite corners
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
    'relative cursor-pointer px-8 py-3 text-sm tracking-[0.2em] uppercase font-medium',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    isOutline
      ? 'text-white/90 bg-white/[0.04] hover:bg-white/[0.08]'
      : 'text-white hover:brightness-110',
  ].join(' ');

  const inner = (
    <>
      {/* Top-left corner: top edge + left edge */}
      <span aria-hidden='true' style={edgeStyle('top')} />
      <span aria-hidden='true' style={edgeStyle('left')} />
      {/* Bottom-right corner: bottom edge + right edge */}
      <span aria-hidden='true' style={edgeStyleMirrored('bottom')} />
      <span aria-hidden='true' style={edgeStyleMirrored('right')} />
      {/* Top-right corner: top edge + right edge */}
      <span aria-hidden='true' style={edgeStyleMirrored('top')} />
      <span aria-hidden='true' style={edgeStyle('right')} />
      {/* Bottom-left corner: bottom edge + left edge */}
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

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        style={btnStyle}
        whileTap={{ scale: 0.97 }}
        {...handlers}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClass}
      style={btnStyle}
      whileTap={{ scale: 0.97 }}
      {...handlers}
    >
      {inner}
    </motion.button>
  );
};

// ── System ID → Role tag with scramble transition ──────────
const HEX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ROLES = ['Full-stack Developer', 'Data Analyst', 'Vibe Coder'];

function scrambleString(len: number): string {
  let s = '';
  for (let i = 0; i < len; i++) s += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
  return s;
}

const SystemIdTag: React.FC<{ startDelay?: number }> = ({ startDelay = 0 }) => {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState<'system' | 'role'>('system');
  const [display, setDisplay] = useState('_________');
  const [label, setLabel] = useState('SYSTEM_ID');
  const [roleIdx, setRoleIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isCyan = phase === 'role';
  const accentColor = isCyan ? '#00d4ff' : 'rgba(255,255,255,0.5)';
  const labelColor = isCyan ? '#ffffff' : 'rgba(255,255,255,0.7)';
  const textColor = isCyan ? '#00d4ff' : 'rgba(255,255,255,0.7)';
  const borderColor = isCyan ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.15)';
  const outerBg = isCyan ? 'rgba(0,35,45,0.95)' : 'transparent';
  const bgColor = isCyan ? 'rgba(0,45,58,0.95)' : 'rgba(255,255,255,0.08)';
  const cornerLen = 8;
  const cornerThick = 1.5;

  // Wait for intro to finish before starting
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setPhase('role');
      setLabel("Hi, I'm");
      setDisplay(ROLES[0]);
      return;
    }

    const SCRAMBLE_DURATION = 2000;
    const ROLE_DURATION = 5000;
    const HEX_LEN = 9;
    let idx = 0;

    // Cycle: scramble phase → role phase → scramble phase → next role → ...
    const startScramblePhase = () => {
      setPhase('system');
      setLabel('SYSTEM_ID');
      intervalRef.current = setInterval(() => setDisplay(scrambleString(HEX_LEN)), 60);

      timeoutRef.current = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        // Instantly switch to role phase (no animation)
        setPhase('role');
        setLabel("Hi, I'm");
        setDisplay(ROLES[idx % ROLES.length]);
        setRoleIdx(idx % ROLES.length);

        // Hold role for ROLE_DURATION, then go back to scramble
        timeoutRef.current = setTimeout(() => {
          idx++;
          startScramblePhase();
        }, ROLE_DURATION);
      }, SCRAMBLE_DURATION);
    };

    startScramblePhase();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [started]);

  void roleIdx; // used indirectly via showRole closure

  // Edge spans: L-shaped corners in system phase, full border in role phase
  const edgeBase: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: accentColor,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    zIndex: 1,
  };

  const hEdge = (top: boolean, fromLeft: boolean): React.CSSProperties => ({
    ...edgeBase,
    height: cornerThick,
    ...(top ? { top: 0 } : { bottom: 0 }),
    ...(fromLeft ? { left: 0 } : { right: 0 }),
    width: isCyan ? '100%' : cornerLen,
  });

  const vEdge = (left: boolean, fromTop: boolean): React.CSSProperties => ({
    ...edgeBase,
    width: cornerThick,
    ...(left ? { left: 0 } : { right: 0 }),
    ...(fromTop ? { top: 0 } : { bottom: 0 }),
    height: isCyan ? '100%' : cornerLen,
  });

  return (
    <motion.div
      className='relative inline-flex items-center mb-6'
      style={{
        fontFamily: 'var(--font-brandon), system-ui, sans-serif',
        border: `1px solid ${borderColor}`,
        backgroundColor: outerBg,
        transition: 'border-color 0.5s, background-color 0.5s',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top-left corner */}
      <span aria-hidden='true' style={hEdge(true, true)} />
      <span aria-hidden='true' style={vEdge(true, true)} />
      {/* Top-right corner */}
      <span aria-hidden='true' style={hEdge(true, false)} />
      <span aria-hidden='true' style={vEdge(false, true)} />
      {/* Bottom-left corner */}
      <span aria-hidden='true' style={hEdge(false, true)} />
      <span aria-hidden='true' style={vEdge(true, false)} />
      {/* Bottom-right corner */}
      <span aria-hidden='true' style={hEdge(false, false)} />
      <span aria-hidden='true' style={vEdge(false, false)} />

      {/* Label */}
      <span
        className='text-xs tracking-[0.15em] uppercase px-4 py-2.5 font-bold'
        style={{ color: labelColor, transition: 'color 0.5s' }}
      >
        {label}
      </span>

      {/* Inner value box */}
      <span
        className='text-xs tracking-[0.1em] uppercase py-2.5 inline-block text-center font-bold'
        style={{
          color: textColor,
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
          fontFamily: 'var(--font-brandon), system-ui, sans-serif',
          transition: 'color 0.5s, background-color 0.5s, border-color 0.5s',
          marginRight: '-1px',
          width: isCyan ? 'auto' : '110px',
          paddingLeft: isCyan ? '16px' : '0',
          paddingRight: isCyan ? '16px' : '0',
        }}
      >
        {display}
      </span>
    </motion.div>
  );
};

// ── Hardware acceleration diagnostic ──
const HardwareDiagnostic: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Software renderers typically contain "SwiftShader", "llvmpipe", or "Software"
          const isSoftware = /swiftshader|llvmpipe|software/i.test(renderer);
          setEnabled(!isSoftware);
        } else {
          setEnabled(true);
        }
      } else {
        setEnabled(false);
      }
    } catch {
      setEnabled(false);
    }
  }, []);

  if (enabled === null) return null;

  return (
    <motion.div
      className='absolute left-8 z-10 select-none'
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        bottom: '2rem',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 0.8 }}
    >
      <p className='text-[9px] tracking-[0.2em] uppercase leading-none font-bold'>
        <span className='text-neutral-500'>HARDWARE ACCELERATION:&nbsp;&nbsp;</span>
        <span className={enabled ? 'text-neutral-500' : ''} style={enabled ? {} : { color: '#991b1b' }}>
          {enabled ? 'ENABLED' : 'DISABLED'}
        </span>
      </p>
    </motion.div>
  );
};

// ──────────────────────────────────────────

interface HeroSectionProps extends SectionProps {
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ children, onScrollToNext, className = '' }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const offsetX = ((e.clientX / window.innerWidth) - 0.5) * 20;
      const offsetY = ((e.clientY / window.innerHeight) - 0.5) * 15;
      if (gridRef.current) gridRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const firstName = 'William';
  const lastName = 'Ji';
  const subtitle = 'Building domain-focused intelligent agents that transform complex workflows into practical, scalable products.';

  return (
    <section
      className={`h-screen w-full flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ backgroundColor: '#000000' }}
      aria-label='Hero section'
    >
      {/* Background grid */}
      <div className='grid-perspective' aria-hidden='true'>
        <div
          ref={gridRef}
          className='grid-plane'
          style={{
            backgroundColor: '#000000',
            backgroundImage: [
              'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Content — two-column on desktop */}
      <div className='px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10 w-full h-full flex flex-col'>
        <div className='flex-1 flex flex-col lg:flex-row items-center'>
          {/* ── Left: text & buttons ── */}
          <div className='w-full lg:w-[55%] h-full pt-16 flex flex-col justify-center items-center lg:items-start text-center lg:text-left'>
            <SystemIdTag startDelay={4000} />
            <header className='mb-8'>
              <motion.h1
                className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal mb-6 relative cursor-pointer'
                style={{
                  fontFamily: 'var(--font-urbanist), system-ui, sans-serif',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                }}
                variants={wordVariants}
                initial='hidden'
                animate='visible'
              >
                <motion.span
                  className='text-white inline-block mr-4 sm:mr-5 md:mr-6'
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                >
                  {firstName}
                </motion.span>
                <motion.span
                  className='inline-block'
                  style={{ color: '#00d4ff' }}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
                >
                  {lastName}
                </motion.span>
              </motion.h1>

              <motion.p
                className='text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl'
                style={{
                  fontFamily: 'var(--font-urbanist), system-ui, sans-serif',
                  fontWeight: 500,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8, ease: 'easeOut' }}
              >
                {subtitle}
              </motion.p>
            </header>

            {/* CTA buttons */}
            <motion.div
              className='flex flex-wrap items-center justify-center lg:justify-start gap-6'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 4 }}
            >
              <CornerBracketButton
                variant='outline'
                onClick={() => {
                  const el = document.getElementById('projects-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                View Projects
              </CornerBracketButton>
              <CornerBracketButton
                variant='filled'
                href='mailto:jihaohua0816@gmail.com'
              >
                Contact Me
              </CornerBracketButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className='grid grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-10 w-full max-w-xl'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 4.5 }}
            >
              {HERO_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                >
                  <StatItem
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    delay={4500 + i * 150}
                    started
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D globe ── */}
          <motion.div
            className='hidden lg:flex lg:w-[45%] items-center justify-center h-full pt-16 overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.2 }}
          >
            <div className='w-full aspect-square max-w-[420px]'>
              <SciFiGlobe />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className='flex justify-center pb-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 4 }}
        >
          <button
            onClick={onScrollToNext}
            className='relative cursor-pointer focus:outline-none'
            aria-label='Scroll to about section'
          >
            <svg
              width='40'
              height='32'
              viewBox='0 0 40 32'
              fill='none'
              aria-hidden='true'
              className='block'
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.2))' }}
            >
              {/* top */}
              <motion.path
                d='M10 8 L20 16 L30 8'
                stroke='#00d4ff'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, delay: 0 }}
              />
              {/* middle */}
              <motion.path
                d='M10 14 L20 22 L30 14'
                stroke='#00d4ff'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
              />
              {/* bottom */}
              <motion.path
                d='M10 20 L20 28 L30 20'
                stroke='#00d4ff'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Bottom-left diagnostic */}
      <HardwareDiagnostic />

      {/* Bottom-right stamp */}
      <motion.div
        className='absolute bottom-8 right-8 z-10 text-right select-none'
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <p className='text-[9px] tracking-[0.25em] text-neutral-500'>
          EST.&nbsp;&nbsp;{toRoman(new Date().getFullYear())}
        </p>
        <p className='text-[9px] tracking-[0.2em] text-blue-500 font-bold mt-0.5'>
          BUILD 2.0.0-STABLE
        </p>
      </motion.div>

      {children}
    </section>
  );
};
