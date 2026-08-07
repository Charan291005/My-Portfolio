'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import MagneticWrapper from './MagneticWrapper';

export default function CipherGame() {
  const [guess, setGuess] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Simple Caesar cipher shift +3
  // "HACK THE PLANET" -> "KDFN WKH SODQHW"
  const cipherText = "KDFN WKH SODQHW";
  const plainText = "HACK THE PLANET";

  const checkAnswer = () => {
    if (guess.toUpperCase() === plainText) {
      setIsSolved(true);
      triggerConfetti();
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <div className="flex justify-center w-full">
      <motion.div
        className="sticky-note-pink p-8 w-full h-[420px] flex flex-col justify-center"
        style={{ rotate: '2deg' }}
        whileHover={{ rotate: '0deg', scale: 1.02 }}
        animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl">📌</div>
        
        <h3 className="text-3xl font-heading font-bold text-ink mb-4 text-center mt-2">
          Cipher Crack 🕵️‍♂️
        </h3>
        
        {!isSolved ? (
          <div className="space-y-4">
            <p className="text-ink-light font-body text-sm text-center">
              Decrypt the message below to unlock an achievement.
            </p>
            
            <div className="bg-paper-dark p-4 rounded-md border-2 border-dashed border-ink font-mono text-center text-xl text-ink font-bold tracking-widest">
              {cipherText}
            </div>

            <div className="relative">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                placeholder="Enter decrypted text..."
                className="w-full bg-white border-2 border-ink p-3 rounded-md font-mono text-ink placeholder:text-ink-faint focus:outline-none focus:border-pencil-blue"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="text-sm font-accent text-pencil-blue hover:underline"
              >
                {showHint ? "Hide Hint" : "Need a Hint? 💡"}
              </button>
              
              <MagneticWrapper strength={10}>
                <button 
                  onClick={checkAnswer}
                  className="btn-primary py-2 px-4 text-sm"
                >
                  Decrypt 🔓
                </button>
              </MagneticWrapper>
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-marker-yellow/30 p-3 mt-2 rounded border border-marker-yellow text-sm font-accent text-ink"
                >
                  "Caesar shifted by 3. Look backwards."
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-2xl font-heading font-bold text-crayon-green mb-2">
              System Hacked!
            </h4>
            <p className="font-body text-ink-light">
              You've successfully decrypted: <br/>
              <span className="font-mono font-bold text-ink mt-2 block bg-white/50 py-1 rounded">HACK THE PLANET</span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
