'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HackerTerminal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ text: string, type: 'user' | 'system' }[]>([
    { text: 'NEXUS-OS v2.0.4 loaded.', type: 'system' },
    { text: 'Type "help" for a list of commands.', type: 'system' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `visitor@nexus:~$ ${cmd}`, type: 'user' as const }];
    
    if (cleanCmd === 'help') {
      newHistory.push({ text: 'Available commands:', type: 'system' });
      newHistory.push({ text: '  whoami    - Display user identity', type: 'system' });
      newHistory.push({ text: '  projects  - List secret projects', type: 'system' });
      newHistory.push({ text: '  contact   - Show contact info', type: 'system' });
      newHistory.push({ text: '  clear     - Clear terminal', type: 'system' });
      newHistory.push({ text: '  exit      - Close terminal', type: 'system' });
    } else if (cleanCmd === 'whoami') {
      newHistory.push({ text: 'You are an unauthorized visitor trying to access a secure Cybersecurity portfolio.', type: 'system' });
    } else if (cleanCmd === 'projects') {
      newHistory.push({ text: 'ACCESS DENIED: Clearance level too low.', type: 'system' });
      newHistory.push({ text: 'Just kidding. Scroll down the main page!', type: 'system' });
    } else if (cleanCmd === 'contact') {
      newHistory.push({ text: 'Email: shreecharan5277443@gmail.com', type: 'system' });
    } else if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    } else if (cleanCmd === 'exit') {
      onClose();
      return;
    } else if (cleanCmd === '') {
      // do nothing
    } else {
      newHistory.push({ text: `Command not found: ${cleanCmd}`, type: 'system' });
    }
    
    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed top-0 left-0 w-full h-[50vh] bg-black/95 backdrop-blur-md z-[9999] border-b-4 border-[#0f0] shadow-2xl flex flex-col"
          style={{ fontFamily: 'monospace' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b border-[#0f0]/30 pb-2 mb-2 p-4 shrink-0">
            <span className="text-[#0f0] font-bold">NEXUS TERMINAL // UNAUTHORIZED ACCESS</span>
            <button onClick={onClose} className="text-[#0f0] hover:text-black hover:bg-[#0f0] px-2 font-bold transition-colors">
              [X] CLOSE
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pt-0" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className={`mb-1 text-sm sm:text-base ${line.type === 'user' ? 'text-white' : 'text-[#0f0]'}`}>
                {line.text}
              </div>
            ))}
            
            <div className="flex items-center mt-2 text-sm sm:text-base">
              <span className="text-white mr-2">visitor@nexus:~$</span>
              <input 
                id="hacker-input"
                name="hacker-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#0f0] caret-[#0f0]"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} className="h-4" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
