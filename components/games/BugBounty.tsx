'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hand-drawn Bug SVG
const BugDoodle = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" className="w-full h-full pointer-events-none drop-shadow-md">
    <circle cx="20" cy="22" r="10" fill="none" stroke={color} strokeWidth="2"/>
    <path d="M20,12 L20,32" stroke={color} strokeWidth="2"/>
    <circle cx="20" cy="8" r="4" fill={color} stroke={color} strokeWidth="2"/>
    <path d="M16,6 Q12,2 8,6 M24,6 Q28,2 32,6" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10,22 L4,22 M30,22 L36,22 M12,16 L6,12 M28,16 L34,12 M12,28 L6,32 M28,28 L34,32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GAME_TIME = 15;
const TOTAL_BUGS = 10;

export default function BugBounty() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number; active: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('lost');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameState('playing');
    
    // Generate random bugs
    const newBugs = Array.from({ length: TOTAL_BUGS }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 80 + 10,
      active: true
    }));
    setBugs(newBugs);
  };

  const squashBug = (id: number) => {
    if (gameState !== 'playing') return;
    
    setBugs(prev => prev.map(b => b.id === id ? { ...b, active: false } : b));
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore === TOTAL_BUGS) {
        setGameState('won');
      }
      return newScore;
    });
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-[420px] border-[3px] border-ink border-dashed rounded-xl bg-[#faf6ec] relative overflow-hidden flex flex-col hover:scale-[1.01] transition-transform duration-300 shadow-sm hover:shadow-md cursor-crosshair"
    >
      {/* Header UI */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
        <div className="font-heading font-bold text-2xl text-ink">
          Bugs Patched: <span className="text-pencil-red">{score}/{TOTAL_BUGS}</span>
        </div>
        <div className="font-heading font-bold text-2xl text-ink">
          Time: <span className={timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-pencil-blue'}>{timeLeft}s</span>
        </div>
      </div>

      {/* Start / Result Screen */}
      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            {gameState === 'idle' && (
              <>
                <h3 className="font-display text-4xl text-ink mb-2">Bug Bounty</h3>
                <p className="font-heading text-xl text-ink-light mb-6 text-center max-w-sm">Patch all the vulnerabilities (squash the bugs) before time runs out!</p>
              </>
            )}
            
            {gameState === 'won' && (
              <>
                <h3 className="font-display text-5xl text-crayon-green mb-2">System Secured!</h3>
                <p className="font-heading text-xl text-ink mb-6">You patched all {TOTAL_BUGS} bugs in time.</p>
              </>
            )}

            {gameState === 'lost' && (
              <>
                <h3 className="font-display text-5xl text-pencil-red mb-2">System Compromised</h3>
                <p className="font-heading text-xl text-ink mb-6">You only patched {score} out of {TOTAL_BUGS} bugs.</p>
              </>
            )}

            <button 
              onClick={startGame}
              className="px-8 py-3 bg-marker-yellow text-ink font-bold font-heading text-2xl rounded-lg border-[3px] border-ink shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {gameState === 'idle' ? 'Start Patching' : 'Try Again'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bug rendering area */}
      <div className="flex-grow relative">
        <AnimatePresence>
          {bugs.map((bug) => (
            bug.active && (
              <motion.div
                key={bug.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: [0, Math.random() * 40 - 20, Math.random() * -40 + 20, 0],
                  y: [0, Math.random() * 40 - 20, Math.random() * -40 + 20, 0],
                  rotate: [0, 45, -45, 0]
                }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{
                  x: { repeat: Infinity, duration: 2 + Math.random() * 2, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 2 + Math.random() * 2, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 1.5, ease: "linear" }
                }}
                className="absolute w-12 h-12 cursor-pointer pointer-events-auto"
                style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                onMouseDown={() => squashBug(bug.id)}
                onTouchStart={(e) => { e.preventDefault(); squashBug(bug.id); }}
              >
                <div className="w-full h-full hover:scale-110 active:scale-75 transition-transform bg-white rounded-full">
                  <BugDoodle color="#e74c3c" />
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
