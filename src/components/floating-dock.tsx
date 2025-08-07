'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { IconBrandGithub, IconBrandLinkedin, IconHome, IconTerminal2, IconUser, IconBriefcase, IconMail } from '@tabler/icons-react';

export function MyFloatingDock() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show dock if scrolling up after 50px or if we're past 200px
      if (currentScrollY > 50) {
        if (currentScrollY < lastScrollY || currentScrollY > 200) {
          setIsVisible(true);

          // Clear existing timer
          if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
          }

          // Set new timer to hide dock after 1 seconds of no scrolling
          // Only hide if not hovered
          scrollTimerRef.current = setTimeout(() => {
            if (!isHovered) {
              setIsVisible(false);
            }
          }, 1000);
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [lastScrollY, isHovered, isMounted]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Clear any existing timer when hovering
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Start timer to hide dock after mouse leaves
    scrollTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  // Email protection - simple obfuscation
  const getEmailAddress = () => {
    const parts = ['williamji123456', 'gmail', 'com'];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  };

  const handleEmailClick = () => {
    const email = getEmailAddress();
    window.location.href = `mailto:${email}`;
  };

  const links = [
    {
      title: 'Home',
      icon: <IconHome className='h-full w-full text-neutral-500 dark:text-neutral-300' />,
      href: '#',
      onClick: scrollToTop,
    },
    {
      title: 'About',
      icon: <IconUser className='h-full w-full text-neutral-500 dark:text-neutral-300' />,
      href: '#about',
      onClick: () => scrollToSection('about-section'),
    },
    {
      title: 'Experience',
      icon: <IconBriefcase className='h-full w-full text-neutral-500 dark:text-neutral-300' />,
      href: '#work-experience',
      onClick: () => scrollToSection('work-experience-section'),
    },
    {
      title: 'Projects',
      icon: <IconTerminal2 className='h-full w-full text-neutral-500 dark:text-neutral-300' />,
      href: '#projects',
      onClick: () => scrollToSection('projects-section'),
    },
    {
      title: 'LinkedIn',
      icon: <IconBrandLinkedin className='h-full w-full text-neutral-500 dark:text-neutral-300' />,
      href: 'https://www.linkedin.com/in/williamji/',
      target: '_blank',
    },
    {
      title: 'GitHub',
      icon: <IconBrandGithub className='h-full w-full text-neutral-500 dark:text-neutral-300' />,
      href: 'https://github.com/WilliamJiH',
      target: '_blank',
    },
    {
      title: 'Email',
      icon: <IconMail className='h-full w-full text-neutral-500 dark:text-neutral-300' />,
      href: '#',
      onClick: handleEmailClick,
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FloatingDock desktopClassName='hidden md:flex' mobileClassName='flex md:hidden' items={links} />
    </div>
  );
}
