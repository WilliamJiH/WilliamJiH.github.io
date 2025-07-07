'use client';

import { Spotlight } from '@/components/ui/spotlight';
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <div className='h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden'>
      <Spotlight className='-top-40 left-0 md:left-60 md:-top-20' fill='white' />
      <div className='p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0'>
        <div className='text-center'>
          <h1 className='text-3xl md:text-6xl font-normal'>
            <span className='bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700'>
              Hello
            </span>
            <span className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
              , Welcome to my website!
            </span>
          </h1>
          <h1 className='text-3xl md:text-5xl font-normal mt-6'>
            <span className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
              I'm{' '}
            </span>
            <span className='bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700'>
              Haohua (William) Ji
            </span>
          </h1>

          <div className='mt-6 text-2xl md:text-4xl flex justify-center items-center'>
            <span className='bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-600 mr-1'>&gt;</span>
            <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
              <Typewriter
                options={{
                  strings: [
                    'Full-stack Web Developer',
                    'Quantitative Financial Analyst',
                    'CS Grad from University of Toronto',
                    'Co-Founder of Campus Eats',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 75,
                  cursor: '_',
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
      
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        <div className='animate-bounce'>
          <div 
            className='w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:border-white/60 hover:bg-white/10 transition-all duration-300'
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <svg 
              className='w-6 h-6 text-white'
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
              strokeWidth='2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 5v14m7-7l-7 7-7-7' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
