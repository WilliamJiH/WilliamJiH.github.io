'use client';

import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { FadeInText, OutlineText } from '@/components/ui/animated-text';
import { 
  PythonIcon, 
  GitIcon, 
  TypeScriptIcon, 
  ReactIcon, 
  NodeIcon, 
  NextIcon 
} from '@/components/icons/TechnologyIcons';
import { Technology, ScrollProgress, SectionProps } from '@/types';

interface AboutSectionProps extends SectionProps {
  scrollProgress: ScrollProgress;
}

const technologies: Technology[] = [
  { name: 'Python', icon: PythonIcon },
  { name: 'Git', icon: GitIcon },
  { name: 'TypeScript', icon: TypeScriptIcon },
  { name: 'React', icon: ReactIcon },
  { name: 'Node.js', icon: NodeIcon },
  { name: 'Next.js', icon: NextIcon },
];

export const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ scrollProgress, className = '', id = 'about-section' }, ref) => {
    const { aboutSectionProgress, skillsProgress, homePageProgress } = scrollProgress;

    return (
      <section
        id={id}
        ref={ref}
        className={`w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] px-6 md:px-8 lg:px-12 xl:px-16 overflow-x-hidden ${className}`}
        aria-label="About me section"
      >
        <div className='min-h-screen flex flex-col pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20'>
          {/* About Me Content */}
          <div className='flex items-start justify-center mb-8 md:mb-10 lg:mb-12'>
            <div className='flex flex-col md:flex-col lg:flex-row gap-8 lg:gap-8 xl:gap-12 items-start md:items-start lg:items-start'>
              
              {/* Title Section */}
              <header className='flex-shrink-0 lg:w-auto'>
                <motion.h2
                  className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 text-center sm:text-left md:text-left lg:text-left'
                  style={{
                    fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    transform: `translateX(${-100 + aboutSectionProgress * 100}px)`,
                    opacity: aboutSectionProgress,
                  }}
                >
                  <FadeInText text="ABOUT" />
                </motion.h2>
                <motion.h2
                  className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-center sm:text-left md:text-left lg:text-left'
                  style={{
                    fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    transform: `translateX(${100 - aboutSectionProgress * 100}px)`,
                    opacity: aboutSectionProgress,
                  }}
                >
                  <OutlineText text="ME" />
                </motion.h2>
              </header>

              {/* Avatar Section */}
              <div className='flex-shrink-0 flex justify-center lg:justify-start items-start'>
                <motion.div
                  className='relative transition-opacity duration-500 ease-in-out'
                  style={{ opacity: aboutSectionProgress }}
                  role="img"
                  aria-label="William Ji's avatar"
                >
                  <Image
                    src='/avatar.png'
                    alt='William Ji Avatar'
                    width={320}
                    height={320}
                    className='w-56 sm:w-60 md:w-64 lg:w-56 xl:w-64 h-auto rounded-2xl'
                    priority
                  />
                </motion.div>
              </div>

              {/* Content Section */}
              <div className='flex-1 relative max-w-2xl'>
                {/* Progress Bar */}
                <div 
                  className='absolute right-0 top-0 bottom-0 w-0.5 bg-neutral-800 rounded-full hidden lg:block'
                  role="progressbar"
                  aria-label="Page scroll progress"
                  aria-valuenow={Math.round(homePageProgress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className='rounded-full transition-all duration-300 ease-out'
                    style={{
                      height: `${homePageProgress * 100}%`,
                      width: '100%',
                      background: 'linear-gradient(to bottom, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                    }}
                  />
                </div>

                <div className='lg:pr-12'>
                  <p
                    className='text-base sm:text-lg md:text-xl lg:text-base xl:text-lg text-neutral-300 leading-relaxed text-justify mb-8 lg:mb-10'
                    style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif !important' }}
                  >
                    I&apos;m William (Haohua) Ji. I recently graduate from the University of Toronto (June 2025) with a
                    double major in Computer Science and Statistics. I currently work at{' '}
                    <span
                      className='font-bold bg-clip-text text-transparent'
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                        backgroundSize: '200% 200%',
                        animation: 'aurora 6s ease-in-out infinite',
                      }}
                    >
                      CIBC Mellon and pursue a CFA Level I
                    </span>
                    . Previously, I worked as a{' '}
                    <span
                      className='font-bold bg-clip-text text-transparent'
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                        backgroundSize: '200% 200%',
                        animation: 'aurora 6s ease-in-out infinite',
                      }}
                    >
                      Performance Test Analyst at CIBC
                    </span>{' '}
                    and{' '}
                    <span
                      className='font-bold bg-clip-text text-transparent'
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                        backgroundSize: '200% 200%',
                        animation: 'aurora 6s ease-in-out infinite',
                      }}
                    >
                      co-founded Campus Eats
                    </span>
                    , a student-focused food delivery platform that helped local vendors grow.
                  </p>

                  <p
                    className='text-base sm:text-lg md:text-xl lg:text-base xl:text-lg text-neutral-300 leading-relaxed text-justify'
                    style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif !important' }}
                  >
                    I am expertise in{' '}
                    <span
                      className='font-bold bg-clip-text text-transparent'
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                        backgroundSize: '200% 200%',
                        animation: 'aurora 6s ease-in-out infinite',
                      }}
                    >
                      Full-Stack Web Development, Software Business, and UI/UX Design
                    </span>
                    . Besides, I am actively contributing to a diverse range of 10+ projects, software business
                    startups, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className='flex-1 w-full'>
            <header className='flex justify-end mb-4 lg:mb-6'>
              <div className='text-right'>
                <motion.h2
                  className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white'
                  style={{
                    fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    transform: `translateX(${100 - skillsProgress * 100}px)`,
                    opacity: skillsProgress,
                  }}
                >
                  TECH{' '}
                  <OutlineText text="STACK" />
                </motion.h2>
              </div>
            </header>

            {/* Tech Stack Marquees */}
            <div className='w-full space-y-2' role="region" aria-label="Technology skills">
              <InfiniteMovingCards
                items={technologies}
                direction='right'
                speed='fast'
                pauseOnHover={false}
                className='w-full'
              />
              <InfiniteMovingCards
                items={technologies}
                direction='left'
                speed='fast'
                pauseOnHover={false}
                className='w-full'
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

AboutSection.displayName = 'AboutSection';