'use client';

import React from 'react';
import {
  PythonIcon,
  TypeScriptIcon,
  ReactIcon,
  NextIcon,
  AWSIcon,
  MySQLIcon,
  CplusIcon,
  FirebaseIcon,
  PostmanIcon,
  GitIcon,
} from '@/components/icons/TechnologyIcons';

interface TechItem {
  name: string;
  Icon?: React.FC<{ className?: string }>;
  logoSrc?: string;
  logoAlt?: string;
  logoMode?: 'normal' | 'white';
}

const TechCard: React.FC<TechItem> = ({ name, Icon, logoSrc, logoAlt, logoMode }) => {
  return (
    <div className="group flex items-center gap-4 bg-[#0a111a]/70 border border-[#00d4ff]/20 px-6 py-5 transition-all duration-300 flex-shrink-0 hover:border-[#00d4ff] hover:shadow-[inset_0_0_0_1px_rgba(0,212,255,0.35),inset_0_0_22px_rgba(0,212,255,0.18)]">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={logoAlt ?? name}
            className={`w-7 h-7 object-contain ${logoMode === 'white' ? 'brightness-0 invert' : ''}`}
            draggable={false}
          />
        ) : (
          Icon && <Icon className="w-7 h-7" />
        )}
      </div>
      <h3
        className="text-white font-bold tracking-wider text-sm md:text-base whitespace-nowrap"
        style={{ fontFamily: 'var(--font-urbanist)' }}
      >
        {name.toUpperCase()}
      </h3>
    </div>
  );
};

const CategoryHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-4 mb-6">
    <h2
      className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase"
      style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
    >
      {title}
    </h2>
    <div className="h-[1px] w-full bg-gradient-to-r from-[#00d4ff]/40 to-transparent"></div>
  </div>
);

export const TechStackSection: React.FC = () => {
  // Reordered by type: Frontend -> Backend -> DevOps/Infra/OS -> Tools/Design -> AI
  const frontendTech: TechItem[] = [
    { name: 'React JS', Icon: ReactIcon },
    { name: 'TypeScript', Icon: TypeScriptIcon },
    { name: 'Next JS', Icon: NextIcon },
    {
      name: 'Tailwind CSS',
      logoSrc: '/logos/tailwindcss-icon.svg',
      logoAlt: 'Tailwind CSS',
    },
  ];

  const backendTech: TechItem[] = [
    { name: 'Python v3', Icon: PythonIcon },
    {
      name: 'Java',
      logoSrc: '/logos/java-icon.svg',
      logoAlt: 'Java',
    },
    { name: 'C++', Icon: CplusIcon },
    { name: 'Firebase', Icon: FirebaseIcon },
    { name: 'MySQL', Icon: MySQLIcon },
  ];

  const infraTech: TechItem[] = [
    { name: 'AWS Cloud', Icon: AWSIcon },
    {
      name: 'Docker',
      logoSrc: '/logos/docker-icon.svg',
      logoAlt: 'Docker',
    },
    {
      name: 'Linux',
      logoSrc: '/logos/linux-icon.svg',
      logoAlt: 'Linux',
    },
  ];

  const toolsTech: TechItem[] = [
    { name: 'Git', Icon: GitIcon },
    { name: 'Postman', Icon: PostmanIcon },
    {
      name: 'Figma',
      logoSrc: '/logos/figma-icon.svg',
      logoAlt: 'Figma',
    },
  ];

  const aiTech: TechItem[] = [
    {
      name: 'Codex',
      logoSrc: '/logos/openai.svg',
      logoAlt: 'OpenAI',
      logoMode: 'white',
    },
    {
      name: 'Claude',
      logoSrc: '/logos/claude-color.svg',
      logoAlt: 'Claude',
    },
    {
      name: 'Gemini',
      logoSrc: '/logos/gemini-color.svg',
      logoAlt: 'Gemini',
    },
    {
      name: 'Cursor',
      logoSrc: '/logos/cursor.svg',
      logoAlt: 'Cursor',
      logoMode: 'white',
    },
    {
      name: 'Open Claw',
      logoSrc: '/logos/openclaw-color.svg',
      logoAlt: 'OpenClaw',
    },
  ];

  const allTech: TechItem[] = [...frontendTech, ...backendTech, ...infraTech, ...toolsTech, ...aiTech];

  return (
    <section id="tech-stack" className="w-full py-24 bg-black px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <CategoryHeader title="TECH_STACKS" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTech.map((tech, idx) => (
            <TechCard key={`${tech.name}-${idx}`} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
};
