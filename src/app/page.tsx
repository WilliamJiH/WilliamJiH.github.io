'use client';

import LoadingWrapper from '@/components/loading-wrapper';
import { useState, useEffect, useRef, useCallback } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WorkExperienceSection } from '@/components/sections/WorkExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress, MousePosition } from '@/types';

export default function Home() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [, setScrollDirection] = useState<'down' | 'up'>('down');
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    aboutSectionProgress: 0,
    skillsProgress: 0,
    homePageProgress: 0,
  });
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToNext = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

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
      const homePageProgress = Math.min(currentScrollY / documentHeight, 1);

      // Calculate about section scroll progress
      let aboutSectionProgress = 0;
      let skillsProgress = 0;

      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress based on how much of the section is visible
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          // Section is at least partially visible
          if (rect.top <= 0 && rect.bottom >= windowHeight) {
            // Section completely fills viewport
            aboutSectionProgress = 1;
          } else if (rect.top > 0) {
            // Section is entering from bottom
            aboutSectionProgress = Math.max(0, (windowHeight - rect.top) / windowHeight);
          } else {
            // Section is exiting from top
            aboutSectionProgress = Math.max(0, rect.bottom / windowHeight);
          }
        }

        // Add delay for skills animation - triggers after about section is mostly visible
        if (aboutSectionProgress > 0.6) {
          skillsProgress = Math.min((aboutSectionProgress - 0.6) / 0.4, 1);
        }
      }

      setScrollProgress({
        aboutSectionProgress,
        skillsProgress,
        homePageProgress,
      });
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
        <HeroSection onScrollToNext={handleScrollToNext} />

        <AboutSection ref={aboutSectionRef} scrollProgress={scrollProgress} />

        <WorkExperienceSection />

        <ProjectsSection />

        <Footer />
      </LoadingWrapper>
    </>
  );
}
