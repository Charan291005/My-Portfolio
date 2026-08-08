'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function EasterEggs() {
  const [, setKeys] = useState<string[]>([]);
  const [activeEgg, setActiveEgg] = useState<string | null>(null);

  useEffect(() => {
    let keyBuffer: string[] = [];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer = [...keyBuffer, e.key].slice(-20); // Keep last 20 keys
      setKeys(keyBuffer); // trigger re-render just in case, though not strictly needed here if we only use keyBuffer
      
      const keyString = keyBuffer.join('').toLowerCase();
      
      if (keyString.endsWith('coffee')) {
        setActiveEgg('coffee');
        keyBuffer = [];
      } else if (keyString.endsWith('sudo')) {
        setActiveEgg('sudo');
        keyBuffer = [];
      } else if (keyString.endsWith('matrix')) {
        document.body.classList.toggle('matrix-mode');
        keyBuffer = [];
      }
      
      // Check konami
      if (keyBuffer.length >= KONAMI_CODE.length) {
        const lastKeys = keyBuffer.slice(-KONAMI_CODE.length);
        if (lastKeys.join(',') === KONAMI_CODE.join(',')) {
            document.body.classList.add('barrel-roll');
            setTimeout(() => document.body.classList.remove('barrel-roll'), 2000);
            keyBuffer = [];
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside handler to dismiss coffee
  useEffect(() => {
    if (activeEgg === 'coffee') {
       const timer = setTimeout(() => setActiveEgg(null), 8000);
       return () => clearTimeout(timer);
    }
  }, [activeEgg]);

  return (
    <AnimatePresence>
      {activeEgg === 'coffee' && (
        <motion.div 
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.85, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          {/* SVG Coffee stain - rotated randomly */}
          <motion.svg 
             width="400" height="400" viewBox="0 0 100 100" 
             style={{ filter: 'drop-shadow(3px 5px 8px rgba(70,40,20,0.5))', rotate: Math.random() * 360 }}
             initial={{ rotate: Math.random() * 360 - 20 }}
             animate={{ rotate: Math.random() * 360 }}
          >
             {/* Outer ring */}
             <path d="M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5 Z" fill="none" stroke="#6f4e37" strokeWidth="2.5" opacity="0.7"/>
             {/* Inner blobby ring */}
             <path d="M52,15 C68,12 85,28 82,48 C79,68 68,85 52,82 C35,79 18,68 20,48 C22,28 35,18 52,15 Z" fill="none" stroke="#5c3a21" strokeWidth="4" opacity="0.5"/>
             <path d="M48,20 C60,18 75,32 72,50 C69,65 60,78 48,75 C35,72 22,65 25,50 C28,32 35,22 48,20 Z" fill="none" stroke="#6f4e37" strokeWidth="1.5" opacity="0.8"/>
             {/* Some splashes */}
             <circle cx="85" cy="20" r="3.5" fill="#6f4e37" opacity="0.6" />
             <circle cx="15" cy="80" r="2.5" fill="#5c3a21" opacity="0.7" />
             <circle cx="90" cy="75" r="4" fill="#6f4e37" opacity="0.5" />
             <circle cx="20" cy="30" r="1.5" fill="#6f4e37" opacity="0.8" />
             <circle cx="45" cy="90" r="2" fill="#5c3a21" opacity="0.6" />
          </motion.svg>
        </motion.div>
      )}
      
      {activeEgg === 'sudo' && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveEgg(null)}
        >
          <motion.div 
            className="max-w-lg w-full bg-[#111] text-[#0f0] p-6 shadow-[10px_10px_0_rgba(0,0,0,0.8)]"
            initial={{ scale: 0.8, y: 50, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              border: '4px solid #333', 
              borderRadius: '12px',
              fontFamily: 'monospace'
            }}
          >
            {/* Fake terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#333]">
              <div className="w-4 h-4 rounded-full bg-[#ff5f56]"></div>
              <div className="w-4 h-4 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-4 h-4 rounded-full bg-[#27c93f]"></div>
              <span className="ml-2 text-[#888] text-sm">visitor@shree-portfolio:~</span>
            </div>
            
            <div className="text-base space-y-2">
              <p><span className="text-[#0f0] font-bold">visitor@shree-portfolio</span><span className="text-white">:</span><span className="text-[#5555ff] font-bold">~</span>$ sudo hack-main-frame</p>
              <p className="text-red-400">[sudo] password for visitor: *********</p>
              
              <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 transition={{ delay: 0.8 }}
                 className="space-y-1 mt-4"
              >
                <p className="font-bold">visitor is not in the sudoers file.</p>
                <p className="font-bold">This incident will be reported.</p>
                <p className="text-[#888] mt-6 italic">&gt; Just kidding. But seriously, no hacking my portfolio! Return to browsing...</p>
              </motion.div>
            </div>
            
            <motion.button 
              className="mt-8 px-6 py-2 border-2 border-[#0f0] text-[#0f0] font-bold hover:bg-[#0f0] hover:text-black transition-colors rounded-md"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.5 }}
              onClick={() => setActiveEgg(null)}
            >
              Acknowledge & Exit
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
