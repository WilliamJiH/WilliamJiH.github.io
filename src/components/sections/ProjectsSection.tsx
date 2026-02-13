'use client';

import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { OutlineText } from '@/components/ui/animated-text';
import { PROJECT_CARDS } from '@/constants/projects';
import { SectionProps } from '@/types';

export const ProjectsSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ className = '', id = 'projects-section' }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={`w-full min-h-screen relative bg-black antialiased py-20 ${className}`}
        aria-label="Projects showcase section"
      >
        <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16'>
          {/* Section Title */}
          <motion.header
            className='text-center mb-8'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 
              className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white mb-4'
              style={{ fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif' }}
            >
              MY{' '}
              <OutlineText text="PROJECTS" />
            </h2>
            <p 
              className='text-neutral-400 text-lg max-w-2xl mx-auto'
              style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
            >
              A showcase of my latest work and creative projects
            </p>
          </motion.header>

          {/* Apple Cards Carousel */}
          <div role="region" aria-label="Project showcase carousel">
            <Carousel items={PROJECT_CARDS.map((card, index) => (
              <Card key={card.src} card={card} index={index} />
            ))} />
          </div>
        </div>
      </section>
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';