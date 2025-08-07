'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

interface VideoPopupProps {
  imageSrc: string;
  imageAlt: string;
  youtubeEmbedUrl: string;
  hoverText?: string;
  className?: string;
}

export const VideoPopup: React.FC<VideoPopupProps> = ({
  imageSrc,
  imageAlt,
  youtubeEmbedUrl,
  hoverText = "Watch Demo",
  className = ""
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Image with hover effect */}
      <div 
        className={`relative cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsVideoOpen(true)}
      >
        <Image 
          src={imageSrc} 
          alt={imageAlt}
          width={800}
          height={600}
          className='w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105'
        />
        
        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center'
            >
              <div className='text-center'>
                <div className='bg-white/20 backdrop-blur-sm rounded-full p-4 mb-2 mx-auto w-fit'>
                  <svg 
                    className='w-8 h-8 text-white' 
                    fill='currentColor' 
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z'/>
                  </svg>
                </div>
                <p className='text-white font-medium text-lg'>{hoverText}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video popup modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className='relative max-w-4xl w-full'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className='absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10'
              >
                <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
              
              {/* Video iframe */}
              <div className='relative w-full' style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className='absolute inset-0 w-full h-full rounded-lg'
                  src={`${youtubeEmbedUrl}&autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};