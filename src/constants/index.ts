import { WorkExperience } from '@/types';

export const SENTENCES = [
  'Full-stack Web Developer.',
  'Financial Derivatives Specialist.',
  'CS Grad from University of Toronto.',
  'Moving fast. Breaking nothing.',
] as const;

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'cibc-mellon',
    role: 'Financial Derivatives Specialist',
    company: 'CIBC MELLON',
    duration: 'Jul 2025 - Present',
    description: 'Implemented and managed trade reconciliation processes while serving as a client-facing specialist, ensuring accuracy in derivative transactions and prompt resolution of trade discrepancies.',
    logoSrc: '/CIBC_Mellon_logo.png',
    logoAlt: 'CIBC Mellon Logo',
  },
  {
    id: 'campus-eats',
    role: 'Co-Founder and Web Development Lead',
    company: 'CAMPUS EATS',
    duration: 'Sep 2023 - Aug 2024',
    description: 'Co-founded and led the full-stack development and strategic growth of a student-focused food delivery platform, driving adoption through cross-functional collaboration, scalable architecture, and user-centered feature prioritization.',
    logoSrc: '/campus_eats_logo.jpeg',
    logoAlt: 'Campus Eats Logo',
  },
  {
    id: 'cibc',
    role: 'Performance Test Analyst',
    company: 'CIBC',
    duration: 'Sep 2022 - Aug 2023',
    description: 'Led performance testing and optimization initiatives across 21 API and capital markets teams, developing automated pipelines that improved test speed and reliability while enhancing system integration and API efficiency.',
    logoSrc: '/CIBC_logo.png',
    logoAlt: 'CIBC Logo',
  },
];


export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/williamji/',
  },
  {
    name: 'GitHub', 
    url: 'https://github.com/WilliamJiH',
  },
] as const;

export const ANIMATION_CONFIGS = {
  DEFAULT: { duration: 0.8, ease: 'easeOut' },
  FAST: { duration: 0.3, ease: 'easeOut' },
  SLOW: { duration: 1.2, ease: 'easeOut' },
  AURORA: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
} as const;