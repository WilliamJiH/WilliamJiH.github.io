'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { WorldMapSection } from '@/components/sections/WorldMapSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { Footer } from '@/components/layout/Footer';
import { ElegantIntroTransition } from '@/components/ElegantIntroTransition';
import { MyFloatingDock } from '@/components/floating-dock';
import { ScrollProgress } from '@/types';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [, setScrollDirection] = useState<'down' | 'up'>('down');
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    homePageProgress: 0,
  });
  const lastScrollY = useRef(0);

  const handleScrollToNext = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);

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

      setScrollProgress({
        homePageProgress,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Elegant Intro Transition */}
      {showIntro && (
        <ElegantIntroTransition 
          onComplete={() => setShowIntro(false)} 
        />
      )}

      {/* Navbar — hidden during intro */}
      {!showIntro && <MyFloatingDock />}

      <HeroSection onScrollToNext={handleScrollToNext} />

      <TechStackSection />

      <WorldMapSection />

      <ProjectsSection />

      <Footer />
    </>
  );
}
