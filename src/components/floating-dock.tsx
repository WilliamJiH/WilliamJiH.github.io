'use client';

import React, { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
  { label: 'CORE', sectionId: null },
  { label: 'Experience', sectionId: 'work-experience-section' },
  { label: 'Projects', sectionId: 'projects-section' },
] as const;

export function MyFloatingDock() {
  const [activeSection, setActiveSection] = useState('CORE');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      // Determine which section is currently in view
      let current = 'CORE';
      for (const item of NAV_ITEMS) {
        if (!item.sectionId) continue;
        const el = document.getElementById(item.sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = item.label;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const handleClick = useCallback((sectionId: string | null) => {
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  if (!isMounted) return null;

  return (
    <nav
      className='fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/[0.06]'
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16'>
        <ul className='flex items-center justify-center h-14 md:h-16 gap-8 md:gap-12 list-none m-0 p-0'>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item.sectionId)}
                  className={`relative text-xs md:text-sm tracking-[0.2em] uppercase font-medium cursor-pointer
                    transition-colors duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                    rounded-sm px-1 py-1
                    ${isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-200'}`}
                  style={{ fontFamily: 'var(--font-brandon), system-ui, sans-serif' }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
