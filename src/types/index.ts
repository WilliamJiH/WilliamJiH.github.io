// Core types for the portfolio website
export interface Technology {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
}

export interface ProjectCard {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  titleAction?: React.ReactNode;
}

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  target?: string;
  onClick?: () => void;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

export interface SectionConfig {
  id: string;
  className?: string;
  animationConfig?: AnimationConfig;
}

// Component prop types
export interface IconProps {
  className?: string;
}

export interface SectionProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

export interface AnimatedTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export interface ScrollProgress {
  aboutSectionProgress: number;
  skillsProgress: number;
  homePageProgress: number;
}

export interface MousePosition {
  x: number;
  y: number;
}