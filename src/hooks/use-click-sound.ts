'use client';

import { useCallback, useRef } from 'react';

export const useClickSound = (volume: number = 0.4) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClick = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (!audioRef.current) {
      audioRef.current = new Audio('/scifi-click.wav');
    }

    // Reset and play
    audioRef.current.volume = volume;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      // Ignore errors from browser autoplay policies
      console.warn('Audio playback failed:', err);
    });
  }, [volume]);

  return playClick;
};
