'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PIN_LENGTH = 3;
const MAX_ATTEMPTS = 5;

type Feedback = 'correct' | 'wrong_place' | 'incorrect';

interface Guess {
  digits: string[];
  feedback: Feedback[];
}

export default function PasswordCracker() {
  const [targetPin, setTargetPin] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [history, setHistory] = useState<Guess[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');

  const generatePin = () => {
    // Generate 3 unique digits
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const pin = [];
    for (let i = 0; i < PIN_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      pin.push(digits[randomIndex]);
      digits.splice(randomIndex, 1); // ensure unique digits for easier gameplay
    }
    return pin;
  };

  const startGame = () => {
    setTargetPin(generatePin());
    setCurrentGuess([]);
    setHistory([]);
    setGameState('playing');
  };

  const handleKeyPress = (key: string) => {
    if (gameState !== 'playing') return;
    
    if (key === 'delete') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < PIN_LENGTH) {
      setCurrentGuess(prev => [...prev, key]);
    }
  };

  const submitGuess = () => {
    if (currentGuess.length !== PIN_LENGTH || gameState !== 'playing') return;

    const feedback: Feedback[] = [];
    let correctCount = 0;

    currentGuess.forEach((digit, index) => {
      if (digit === targetPin[index]) {
        feedback.push('correct');
        correctCount++;
      } else if (targetPin.includes(digit)) {
        feedback.push('wrong_place');
      } else {
        feedback.push('incorrect');
      }
    });

    const newHistory = [...history, { digits: currentGuess, feedback }];
    setHistory(newHistory);
    setCurrentGuess([]);

    if (correctCount === PIN_LENGTH) {
      setGameState('won');
    } else if (newHistory.length >= MAX_ATTEMPTS) {
      setGameState('lost');
    }
  };

  // Allow keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleKeyPress('delete');
      } else if (e.key === 'Enter') {
        submitGuess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  const getFeedbackColor = (f: Feedback) => {
    if (f === 'correct') return '#66bb6a'; // crayon-green
    if (f === 'wrong_place') return '#ffb300'; // marker-yellow
    return '#e74c3c'; // pencil-red
  };

  return (
    <div className="w-full h-[420px] border-[3px] border-ink border-dashed rounded-xl bg-[#faf6ec] relative flex flex-col hover:scale-[1.01] transition-transform duration-300 shadow-sm hover:shadow-md overflow-hidden p-4">
      
      {/* Title */}
      <div className="text-center mb-2">
        <h3 className="font-display font-bold text-2xl text-ink">Brute Force</h3>
        <p className="font-heading text-sm text-ink-light">Crack the 3-digit PIN</p>
      </div>

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
          >
            {gameState === 'idle' && (
              <>
                <svg className="w-16 h-16 text-ink mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p className="font-heading text-lg text-ink-light mb-6 max-w-[200px] text-center">Guess the PIN in {MAX_ATTEMPTS} attempts. Digits are unique.</p>
              </>
            )}
            
            {gameState === 'won' && (
              <>
                <div className="text-5xl mb-2">🔓</div>
                <h3 className="font-display text-3xl text-crayon-green mb-2">Access Granted!</h3>
              </>
            )}

            {gameState === 'lost' && (
              <>
                <div className="text-5xl mb-2">🔒</div>
                <h3 className="font-display text-3xl text-pencil-red mb-2">Lockout Initiated</h3>
                <p className="font-heading text-lg text-ink mb-4">The PIN was: {targetPin.join('')}</p>
              </>
            )}

            <button 
              onClick={startGame}
              className="px-6 py-2 bg-marker-yellow text-ink font-bold font-heading text-xl rounded-lg border-[3px] border-ink shadow-[3px_3px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {gameState === 'idle' ? 'Start Hacking' : 'Try Again'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow flex flex-col items-center justify-between z-10 w-full max-w-[280px] mx-auto">
        
        {/* History Area */}
        <div className="w-full flex-grow flex flex-col gap-1.5 justify-end mb-2">
          {history.map((h, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center gap-3"
            >
              <div className="flex gap-1.5">
                {h.digits.map((d, di) => (
                  <div key={di} className="w-8 h-8 border-2 border-ink rounded flex items-center justify-center font-heading text-xl font-bold bg-white text-ink">
                    {d}
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {h.feedback.map((f, fi) => (
                  <div key={fi} className="w-3.5 h-3.5 rounded-full border-2 border-ink" style={{ backgroundColor: getFeedbackColor(f) }} title={f} />
                ))}
              </div>
            </motion.div>
          ))}
          {/* Empty slots for visual balance */}
          {Array.from({ length: Math.max(0, MAX_ATTEMPTS - history.length - (gameState === 'playing' ? 1 : 0)) }).map((_, i) => (
            <div key={`empty-${i}`} className="flex justify-center items-center gap-3 opacity-20">
              <div className="flex gap-1.5">
                {[1,2,3].map(n => <div key={n} className="w-8 h-8 border-2 border-dashed border-ink rounded"></div>)}
              </div>
              <div className="flex gap-1">
                {[1,2,3].map(n => <div key={n} className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-ink"></div>)}
              </div>
            </div>
          ))}
        </div>

        {/* Current Input */}
        <div className="flex justify-center gap-2 mb-3">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <div 
              key={i} 
              className={`w-10 h-12 border-[3px] ${currentGuess.length === i ? 'border-pencil-blue scale-110' : 'border-ink'} rounded-lg flex items-center justify-center font-heading text-2xl font-bold bg-white transition-all`}
            >
              {currentGuess[i] || ''}
            </div>
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-5 gap-1.5 w-full">
          {['1','2','3','4','5','6','7','8','9','0'].map(num => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-9 border-2 border-ink rounded bg-white font-heading text-lg font-bold hover:bg-gray-100 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleKeyPress('delete')} className="h-9 border-2 border-ink rounded bg-red-100 hover:bg-red-200 font-heading text-sm font-bold col-span-2 active:scale-95 transition-all">
            DEL
          </button>
          <button onClick={submitGuess} disabled={currentGuess.length !== PIN_LENGTH} className="h-9 border-2 border-ink rounded bg-green-100 hover:bg-green-200 font-heading text-sm font-bold col-span-3 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100">
            ENTER
          </button>
        </div>

      </div>
    </div>
  );
}
