'use client';

import { Spotlight } from '@/components/ui/spotlight';
import LoadingWrapper from '@/components/loading-wrapper';
import { HypertextReveal } from '@/components/ui/hypertext';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { CardSpotlight } from '@/components/ui/card-spotlight';

export default function Home() {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showSentence, setShowSentence] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [aboutSectionProgress, setAboutSectionProgress] = useState(0);
  const [homePageProgress, setHomePageProgress] = useState(0);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const sentences = [
    'Full-stack Web Developer.',
    'Financial Derivatives Specialist.',
    'CS Grad from University of Toronto.',
    'Moving fast. Breaking nothing.',
  ];

  const cycleSentences = () => {
    setShowSentence(true);

    setTimeout(() => {
      setShowSentence(false);

      setTimeout(() => {
        setCurrentSentence((prev) => (prev + 1) % sentences.length);
        cycleSentences();
      }, 2000); // Wait 2s for fade out to complete
    }, 4000); // Show for 4s
  };

  useEffect(() => {
    const startSentences = setTimeout(() => {
      cycleSentences();
    }, 3500);

    return () => clearTimeout(startSentences);
  }, [cycleSentences]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      // Calculate overall home page progress
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(currentScrollY / documentHeight, 1);
      setHomePageProgress(scrollProgress);

      // Calculate about section scroll progress
      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress based on how much of the section is visible
        let progress = 0;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
          // Section is at least partially visible
          if (rect.top <= 0 && rect.bottom >= windowHeight) {
            // Section completely fills viewport
            progress = 1;
          } else if (rect.top > 0) {
            // Section is entering from bottom
            progress = Math.max(0, (windowHeight - rect.top) / windowHeight);
          } else {
            // Section is exiting from top
            progress = Math.max(0, rect.bottom / windowHeight);
          }
        }

        setAboutSectionProgress(progress);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Cursor Light Effect */}
      <div
        ref={cursorLightRef}
        className='cursor-light'
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      <LoadingWrapper>
        <div className='h-screen w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden'>
          {/* Beam */}
          <div className='beam rounded-full pointer-events-none'></div>
          <Spotlight className='-top-40 left-0 md:left-60 md:-top-20' fill='white' />
          <div className='p-4 sm:p-6 md:p-8 max-w-7xl mx-auto relative z-10 w-full'>
            <div className='text-center'>
              <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold'>
                <HypertextReveal
                  text='Hello, '
                  className='bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700'
                  delay={0.5}
                  duration={1}
                />
                <HypertextReveal
                  text="I'm "
                  className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'
                  delay={1.5}
                  duration={0.5}
                />
                <motion.span
                  animate={{
                    backgroundImage: [
                      'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
                      'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
                      'linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b, #10b981)',
                      'linear-gradient(45deg, #ec4899, #f59e0b, #10b981, #3b82f6)',
                      'linear-gradient(45deg, #f59e0b, #10b981, #3b82f6, #8b5cf6)',
                      'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
                    ],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className='bg-clip-text text-transparent'
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'aurora 6s ease-in-out infinite',
                  }}
                >
                  <HypertextReveal
                    text='William Ji.'
                    className='bg-clip-text text-transparent'
                    delay={2}
                    duration={1}
                  />
                </motion.span>
              </h1>

              <div className='mt-4 md:mt-6 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold flex justify-center items-center px-4'>
                <motion.div
                  key={currentSentence}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showSentence ? 1 : 0 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  className='h-8 md:h-12 flex items-center justify-center text-neutral-300 text-center'
                >
                  {sentences[currentSentence]}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Tech Stack Marquee */}
          {/* <div className='absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none'>
          <InfiniteMovingCards
            items={technologies}
            direction='right'
            speed='fast'
            pauseOnHover={false}
            className='max-w-4xl'
          />
        </div> */}

          <div className='absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2'>
            <div className='animate-bounce'>
              <div
                className='arrow-button w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:border-white/60 hover:bg-white/10 transition-all duration-300'
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <svg
                  className='w-5 h-5 md:w-6 md:h-6 text-white'
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

        <div
          ref={aboutSectionRef}
          className='min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] px-6 md:px-8 lg:px-12 xl:px-16'
        >
          <div className='pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20'>
            {/* Flexible Layout */}
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-8 xl:gap-12 items-start lg:items-start'>
              {/* Left Section - ABOUT ME Title */}
              <div className='flex-shrink-0 lg:w-auto'>
                <motion.h2
                  className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 text-center lg:text-left'
                  style={{
                    fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    transform: `translateX(${-100 + aboutSectionProgress * 100}px)`,
                    opacity: aboutSectionProgress,
                  }}
                >
                  ABOUT
                </motion.h2>
                <motion.h2
                  className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-center lg:text-left'
                  style={{
                    fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    transform: `translateX(${100 - aboutSectionProgress * 100}px)`,
                    opacity: aboutSectionProgress,
                    color: 'transparent',
                    WebkitTextStroke: '2px white',
                  }}
                >
                  ME
                </motion.h2>
              </div>

              {/* Middle Section - Avatar */}
              <div className='flex-shrink-0 flex justify-center lg:justify-start items-start'>
                <div
                  className='relative transition-opacity duration-500 ease-in-out'
                  style={{
                    opacity: aboutSectionProgress,
                  }}
                >
                  <Image
                    src='/avatar.png'
                    alt='William Ji Avatar'
                    width={320}
                    height={320}
                    className='w-56 sm:w-60 md:w-64 lg:w-56 xl:w-64 h-auto rounded-2xl'
                    priority
                  />
                </div>
              </div>

              {/* Right Section - Combined Paragraphs */}
              <div className='flex-1 relative max-w-2xl'>
                {/* Vertical Progress Line */}
                <div className='absolute right-0 top-0 bottom-0 w-1 bg-neutral-800 rounded-full hidden lg:block'>
                  <div
                    className='bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 rounded-full transition-all duration-300 ease-out'
                    style={{
                      height: `${homePageProgress * 100}%`,
                      width: '100%',
                    }}
                  />
                </div>
                <div className='lg:pr-12'>
                  <p
                    className='text-base sm:text-lg md:text-xl lg:text-base xl:text-lg text-neutral-300 leading-relaxed text-justify mb-8 lg:mb-10'
                    style={{
                      fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    }}
                  >
                    {(() => {
                      const text =
                        "I'm William (Haohua) Ji. I recently graduate from the University of Toronto (June 2025) with a double major in Computer Science and Statistics. I currently work at CIBC Mellon and pursue a CFA Level I. Previously, I worked as a Performance Test Analyst at CIBC and co-founded Campus Eats, a student-focused food delivery platform that helped local vendors grow.";
                      const highlights = [
                        {
                          text: 'CIBC Mellon and pursue a CFA Level I',
                          start: text.indexOf('CIBC Mellon and pursue a CFA Level I'),
                        },
                        {
                          text: 'Performance Test Analyst at CIBC',
                          start: text.indexOf('Performance Test Analyst at CIBC'),
                        },
                        { text: 'co-founded Campus Eats', start: text.indexOf('co-founded Campus Eats') },
                      ];

                      return text.split('').map((char, index) => {
                        const totalChars = 364;
                        const charProgress =
                          scrollDirection === 'up'
                            ? aboutSectionProgress
                            : Math.max(0, Math.min(1, (aboutSectionProgress * totalChars - index) / 5));

                        const isHighlighted = highlights.some(
                          (highlight) => index >= highlight.start && index < highlight.start + highlight.text.length
                        );

                        return (
                          <span
                            key={index}
                            className={isHighlighted ? 'font-bold bg-clip-text text-transparent' : ''}
                            style={{
                              filter:
                                scrollDirection === 'up' ? 'blur(0px)' : `blur(${Math.max(0, 5 - charProgress * 5)}px)`,
                              opacity: Math.max(0.2, charProgress),
                              transition: 'filter 0.3s ease, opacity 0.3s ease',
                              ...(isHighlighted && {
                                backgroundImage: 'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
                                backgroundSize: '200% 200%',
                                animation: 'aurora 6s ease-in-out infinite',
                              }),
                            }}
                          >
                            {char}
                          </span>
                        );
                      });
                    })()}
                  </p>

                  <p
                    className='text-base sm:text-lg md:text-xl lg:text-base xl:text-lg text-neutral-300 leading-relaxed text-justify'
                    style={{
                      fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    }}
                  >
                    {(() => {
                      const text =
                        'I am expertise in Full-Stack Web Development, Software Business, and UI/UX Design. Besides, I am actively contributing to a diverse range of 10+ projects, software business startups, and more.';
                      const highlights = [
                        {
                          text: 'Full-Stack Web Development, Software Business, and UI/UX Design',
                          start: text.indexOf('Full-Stack Web Development, Software Business, and UI/UX Design'),
                        },
                      ];

                      return text.split('').map((char, index) => {
                        const firstParagraphLength = 364;
                        const totalChars = 227;
                        const adjustedIndex = index + firstParagraphLength + 20;
                        const charProgress =
                          scrollDirection === 'up'
                            ? aboutSectionProgress
                            : Math.max(
                                0,
                                Math.min(
                                  1,
                                  (aboutSectionProgress * (firstParagraphLength + totalChars + 20) - adjustedIndex) / 5
                                )
                              );

                        const isHighlighted = highlights.some(
                          (highlight) => index >= highlight.start && index < highlight.start + highlight.text.length
                        );

                        return (
                          <span
                            key={index}
                            className={isHighlighted ? 'font-bold bg-clip-text text-transparent' : ''}
                            style={{
                              filter:
                                scrollDirection === 'up' ? 'blur(0px)' : `blur(${Math.max(0, 5 - charProgress * 5)}px)`,
                              opacity: Math.max(0.2, charProgress),
                              transition: 'filter 0.3s ease, opacity 0.3s ease',
                              ...(isHighlighted && {
                                backgroundImage: 'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
                                backgroundSize: '200% 200%',
                                animation: 'aurora 6s ease-in-out infinite',
                              }),
                            }}
                          >
                            {char}
                          </span>
                        );
                      });
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </>
  );
}
