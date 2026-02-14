'use client';

import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { PROJECT_CARDS } from '@/constants/projects';
import { SectionProps, ProjectCard } from '@/types';
import { CornerBracketButton } from '@/components/ui/CornerBracketButton';
import { Modal, ModalBody, ModalContent, ModalTrigger } from '@/components/ui/animated-modal';

const ProjectBox: React.FC<{ card: ProjectCard }> = ({ card }) => {
  return (
    <div className="group relative bg-[#0a111a]/70 border border-[#00d4ff]/20 p-4 transition-all duration-300 hover:border-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.15),inset_0_0_22px_rgba(0,212,255,0.1)] flex flex-col h-full overflow-hidden">
      {/* 1. Large Image Area */}
      <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 bg-[#0a111a] border border-[#00d4ff]/10">
        <img
          src={card.src}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
          draggable={false}
        />
        {/* CRT/Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-30 group-hover:opacity-10 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-transparent to-transparent opacity-60" />
      </div>

      <div className="flex flex-col flex-1 px-2 relative z-10">
        {/* 2. Project Title with Hover Glitch Effect */}
        <div className="relative mb-3">
          <h3 
            className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
          >
            {card.title}
          </h3>
          <div className="absolute -inset-1 bg-[#00d4ff]/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-[#00d4ff] border border-[#00d4ff]/30 px-2 py-0.5 bg-[#00d4ff]/5 tracking-widest uppercase">
            {card.category}
          </span>
        </div>

        {/* 4. Project Description */}
        <p 
          className="text-neutral-400 text-sm leading-relaxed mb-8 flex-1 font-light"
          style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
        >
          {card.shortDescription}
        </p>

        {/* 3. More Info Button */}
        <div className="mt-auto pt-4 border-t border-[#00d4ff]/10">
          <Modal>
            <ModalTrigger className="w-full group/modal-btn">
              <div className="w-full flex justify-start pointer-events-none">
                <CornerBracketButton variant="outline" className="w-full py-2.5 text-xs pointer-events-auto transition-all duration-300 group-hover/modal-btn:bg-[#00d4ff]/10">
                  EXPLORE_CORE_SYSTEM
                </CornerBracketButton>
              </div>
            </ModalTrigger>
            <ModalBody className="max-w-5xl border-[#00d4ff]/30">
              <ModalContent>
                <div className="py-10">
                  <div className="flex flex-col items-center mb-10 px-6 text-center">
                    <div className="w-16 h-1 bg-[#00d4ff] mb-6 shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
                    <h4 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-urbanist)' }}>
                      {card.title}
                    </h4>
                    <div className="flex flex-wrap justify-center items-center gap-4">
                      <span className="text-[#00d4ff] text-xs font-mono tracking-[0.3em] uppercase border border-[#00d4ff]/30 px-3 py-1.5 bg-[#00d4ff]/10">
                        {card.category}
                      </span>
                      {card.titleAction && (
                        <div className="flex items-center">
                          {card.titleAction}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none px-6 md:px-16 lg:px-24">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent mb-12" />
                    {card.content}
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent mt-12" />
                  </div>
                </div>
              </ModalContent>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ className = '', id = 'projects-section' }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={`w-full relative bg-black antialiased pt-8 pb-32 overflow-hidden scroll-mt-20 ${className}`}
        aria-label="Projects showcase section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* 5. Header: SELECTED_PROJECTS */}
          <div className="flex items-center gap-4 mb-10">
            <h2 
              className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase whitespace-nowrap"
              style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
            >
              SELECTED_PROJECTS
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#00d4ff]/40 to-transparent"></div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECT_CARDS.map((card, index) => (
              <motion.div
                key={card.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectBox card={card} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';
