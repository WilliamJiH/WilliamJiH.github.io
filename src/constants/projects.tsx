import React from 'react';
import { ProjectCard } from '@/types';

export const PROJECT_CARDS: ProjectCard[] = [
  {
    src: '/Portfolio Site.png',
    title: 'Personal Website',
    category: 'Web Application',
    content: (
      <div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          A comprehensive personal website with animations. Built Next.js, TypeScript, and Tailwind CSS. Features
          include a floating dock navigation, bento grid projects showcase, spotlight background effects, and typewriter
          animations.
        </p>
      </div>
    ),
  },
  {
    src: '/Campus Eats.png',
    title: 'Campus Eats',
    category: 'Food Delivery Platform',
    content: (
      <div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          A student-focused food delivery platform that helped local vendors grow their business. Built with modern web
          technologies including real-time order tracking and seamless payment integration.
        </p>
      </div>
    ),
  },
  {
    src: '/Savi Finance.png',
    title: 'Savi Finance',
    category: 'Financial Platform',
    content: (
      <div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          A comprehensive financial platform designed to help users manage their finances efficiently. Features include
          budgeting tools, expense tracking, and investment portfolio management.
        </p>
      </div>
    ),
  },
];
