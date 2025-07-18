'use client';

import React from 'react';
import { AuroraText } from '@/components/ui/animated-text';
import { SectionProps } from '@/types';

interface FooterProps extends Omit<SectionProps, 'children'> {
  year?: number;
}

export const Footer: React.FC<FooterProps> = ({ 
  className = '',
  year = new Date().getFullYear()
}) => {
  return (
    <footer 
      className={`w-full bg-black/[0.96] border-t border-neutral-800 py-8 ${className}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p 
            className='text-sm md:text-base'
            style={{ 
              fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            }}
          >
            <AuroraText text="Designed and Developed by William Ji" />
          </p>
          
          <p 
            className='text-sm md:text-base'
            style={{ 
              fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            }}
          >
            <AuroraText text={`Copyright © ${year} WJ`} delay={1} />
          </p>
        </div>
      </div>
    </footer>
  );
};