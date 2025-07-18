'use client';

import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { FadeInText, OutlineText } from '@/components/ui/animated-text';
import { WORK_EXPERIENCES } from '@/constants';
import { SectionProps } from '@/types';

export const WorkExperienceSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ className = '', id = 'work-experience-section' }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={`w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
        aria-label="Work experience section"
      >
        <div className='min-h-screen flex items-center justify-center py-12 md:py-16 lg:py-20'>
          <div className='flex flex-col md:flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center md:items-center max-w-7xl mx-auto'>
            {/* Left Section - WORK EXPERIENCE Title */}
            <header className='flex-shrink-0 md:w-full lg:w-auto'>
              <motion.h2
                className='text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 text-center md:text-center lg:text-left'
                style={{
                  fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <FadeInText text="WORK" delay={0} />
              </motion.h2>
              <motion.h2
                className='text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-center lg:text-left'
                style={{
                  fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                }}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <OutlineText text="EXPERIENCE" delay={0.2} />
              </motion.h2>
            </header>

            {/* Timeline and Cards Container for md screens */}
            <div className='flex flex-col md:flex-row lg:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center md:items-center lg:items-center'>
              {/* Middle Section - Timeline */}
              <div className='flex-shrink-0 relative hidden sm:block'>
                <div 
                  className='h-80 w-0.5 bg-neutral-800 rounded-full relative'
                  role="img"
                  aria-label="Timeline visualization"
                >
                  {/* Animated smaller line inside */}
                  <motion.div
                    className='absolute w-0.5 rounded-full'
                    style={{ 
                      height: '50px',
                      background: 'linear-gradient(to bottom, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                      boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)',
                    }}
                    animate={{
                      y: [0, 270, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    aria-hidden="true"
                  />
                  
                  {/* Timeline markers - equally spaced */}
                  {WORK_EXPERIENCES.map((_, index) => (
                    <div
                      key={index}
                      className='absolute -left-1 w-2.5 h-2.5 rounded-full shadow-lg'
                      style={{
                        top: `calc(${16.67 + (index * 33.33)}% - 5px)`,
                        background: index === 0 
                          ? 'linear-gradient(to bottom right, #f59e0b, #ec4899)'
                          : index === 1
                          ? 'linear-gradient(to bottom right, #8b5cf6, #3b82f6)'
                          : 'linear-gradient(to bottom right, #3b82f6, #10b981)',
                        boxShadow: index === 0
                          ? '0 0 10px rgba(245, 158, 11, 0.5)'
                          : index === 1
                          ? '0 0 10px rgba(139, 92, 246, 0.5)'
                          : '0 0 10px rgba(59, 130, 246, 0.5)',
                      }}
                      role="img"
                      aria-label={`Timeline marker for ${WORK_EXPERIENCES[index].company}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Section - Work Experience Cards */}
              <div className='flex-1 space-y-8 max-w-2xl' role="list" aria-label="Work experience list">
              {WORK_EXPERIENCES.map((experience, index) => (
                <motion.article
                  key={experience.id}
                  className='relative'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                  viewport={{ once: true, amount: 0.3 }}
                  role="listitem"
                >
                  <GlowingEffect
                    disabled={false}
                    borderWidth={1}
                    proximity={100}
                    spread={15}
                    blur={0}
                    className='rounded-lg'
                  />
                  <div className='flex items-center gap-4 p-4 rounded-lg bg-neutral-900/50 transition-colors relative z-10'>
                    <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1'>
                      <Image
                        src={experience.logoSrc}
                        alt={experience.logoAlt}
                        width={40}
                        height={40}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3
                        className='text-lg font-semibold text-white mb-1'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        {experience.role}
                      </h3>
                      <p
                        className='text-neutral-400 text-sm'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        {experience.company} • {experience.duration}
                      </p>
                      <p
                        className='text-neutral-300 text-sm mt-2 text-justify'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

WorkExperienceSection.displayName = 'WorkExperienceSection';