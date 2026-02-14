'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Instagram, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [terminalText, setTerminalText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoClearTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTerminalType = (text: string) => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (autoClearTimerRef.current) clearTimeout(autoClearTimerRef.current);
    setDisplayText('');
    setTerminalText(''); // Clear first to force useEffect re-run if text is the same
    setTimeout(() => {
      setTerminalText(text);
      setIsTyping(true);
    }, 10);
  };

  useEffect(() => {
    if (!isTyping || !terminalText) return;

    let i = 0;
    const type = () => {
      if (i < terminalText.length) {
        const char = terminalText.charAt(i);
        setDisplayText(prev => prev + char);
        i++;
        typingTimerRef.current = setTimeout(type, 50);
      } else {
        setIsTyping(false);
        // Start 1-minute auto-clear timer after typing finishes
        autoClearTimerRef.current = setTimeout(() => {
          setDisplayText('');
          setTerminalText('');
        }, 60000);
      }
    };

    type();
    
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (autoClearTimerRef.current) clearTimeout(autoClearTimerRef.current);
    };
  }, [terminalText, isTyping]);

  return (
    <footer id="initialize-contact" className="w-full bg-[#050b10] border-t border-[#00d4ff]/10 pt-6 pb-20 md:py-8 lg:py-12 xl:py-16 px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <h2 
              className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase"
              style={{ fontFamily: 'var(--font-urbanist), system-ui, sans-serif' }}
            >
              INITIALIZE_CONTACT
            </h2>
            
            <p className="text-neutral-400 text-sm md:text-base max-w-md font-mono tracking-tight leading-relaxed">
              Available for high-bandwidth collaborative architectural development. 
              Current response latency: <span className="text-[#00d4ff]">&lt; 120ms</span>.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/williamjiH", type: 'link' },
                { icon: Instagram, href: "https://www.instagram.com/itswilliam.j/", type: 'link' },
                { icon: Mail, type: 'terminal', text: 'williamji12345(AT)gmail.com' },
                { icon: MapPin, type: 'terminal', text: 'Toronto, ON' }
              ].map((item, i) => (
                item.type === 'link' ? (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-[#0a111a]/70 border border-[#00d4ff]/20 hover:border-[#00d4ff] hover:shadow-[inset_0_0_15px_rgba(0,212,255,0.2)] transition-all duration-300"
                  >
                    <item.icon className="w-5 h-5 text-[#00d4ff]" />
                  </a>
                ) : (
                  <button
                    key={i}
                    onClick={() => handleTerminalType(item.text!)}
                    className="w-12 h-12 flex items-center justify-center bg-[#0a111a]/70 border border-[#00d4ff]/20 hover:border-[#00d4ff] hover:shadow-[inset_0_0_15px_rgba(0,212,255,0.2)] transition-all duration-300 cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-[#00d4ff]" />
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Right: Terminal UI */}
          <div className="relative group block">
            <div className="absolute -inset-1 bg-[#00d4ff]/10 blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-black border border-[#00d4ff]/20 p-4 md:p-6 font-mono text-[12px] md:text-sm min-h-[160px]">
              <div className="flex gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-neutral-600 uppercase tracking-widest text-[12px]">TERMINAL - bash</span>
              </div>
              <div className="space-y-2">
                <p className="text-neutral-400">guest@portfolio:~$ <span className="text-white">ping -c 1 user@contact</span></p>
                <p className="text-green-500/80 line-clamp-1">64 bytes from root.domain: icmp_seq=1 ttl=64 time=0.045 ms</p>
                <div className="flex items-start gap-2">
                  <p className="text-neutral-400 whitespace-nowrap">guest@portfolio:~$</p>
                  <div className="flex flex-wrap items-center">
                    <span className="text-white break-all">{displayText}</span>
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        times: [0, 0.5, 1],
                        ease: "linear"
                      }}
                      className="w-2 h-4 bg-[#00d4ff] inline-block ml-1 flex-shrink-0" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[#00d4ff]/5 font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
          <p className="text-center md:text-left">© {currentYear} WJ // Designed & Developed with Love</p>
          <p className="text-[#00d4ff]/60 text-center md:text-right">V2.0.0-STABLE</p>
        </div>
      </div>
    </footer>
  );
};
