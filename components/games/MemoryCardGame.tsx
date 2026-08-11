'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import MagneticWrapper from '../MagneticWrapper';
import { Code2, Cpu, Database, Globe, Smartphone, Cloud, Terminal, Coffee } from 'lucide-react';

const icons = [
  { id: 1, icon: Code2, name: 'Code' },
  { id: 2, icon: Cpu, name: 'CPU' },
  { id: 3, icon: Database, name: 'Database' },
  { id: 4, icon: Globe, name: 'Web' },
  { id: 5, icon: Smartphone, name: 'Mobile' },
  { id: 6, icon: Cloud, name: 'Cloud' },
  { id: 7, icon: Terminal, name: 'Terminal' },
  { id: 8, icon: Coffee, name: 'Coffee' },
];

interface Card {
  id: number;
  iconId: number;
  icon: any;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryCardGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = useCallback(() => {
    const duplicatedIcons = [...icons, ...icons];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        iconId: item.id,
        icon: item.icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    setIsLocked(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].iconId === newCards[secondIndex].iconId) {
        // Match found
        newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
        newCards[secondIndex] = { ...newCards[secondIndex], isMatched: true };
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
        checkWinCondition(newCards);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) => {
            const resetCards = [...prevCards];
            resetCards[firstIndex] = { ...resetCards[firstIndex], isFlipped: false };
            resetCards[secondIndex] = { ...resetCards[secondIndex], isFlipped: false };
            return resetCards;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const checkWinCondition = (currentCards: Card[]) => {
    if (currentCards.every((card) => card.isMatched)) {
      setIsWon(true);
      triggerConfetti();
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
        className="bg-paper-dark p-6 sm:p-8 w-full max-w-lg min-h-[420px] flex flex-col items-center relative"
        style={{ 
          borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
          border: '2px solid var(--ink)',
          rotate: '-1deg'
        }}
        whileHover={{ rotate: '0deg', scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div className="absolute top-2 right-4 text-2xl rotate-45">📎</div>
        
        <div className="flex justify-between items-center w-full mb-6 mt-2">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink">
            Memory Match 🧠
          </h3>
          <div className="text-sm font-accent text-ink bg-marker-yellow/40 px-2 py-1 rounded">
            Moves: {moves}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {!isWon ? (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-4 gap-2 sm:gap-4 w-full"
            >
              {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    className={`relative w-full aspect-square cursor-pointer flex items-center justify-center rounded-sm ${
                      card.isFlipped || card.isMatched ? 'bg-white' : 'bg-pencil-blue'
                    } border-2 border-ink shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors`}
                    style={{ borderRadius: '10px 5px 10px 5px / 5px 10px 5px 10px' }}
                    onClick={() => handleCardClick(index)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${card.isMatched ? 'text-crayon-green' : 'text-ink'}`} />
                    </div>
                    {!card.isFlipped && !card.isMatched && (
                      <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xl font-bold backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                        ?
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="win"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center flex-grow text-center py-6 w-full"
            >
              <div className="text-6xl mb-4">🏆</div>
              <h4 className="text-2xl font-heading font-bold text-crayon-green mb-2">
                Perfect Memory!
              </h4>
              <p className="font-body text-ink-light mb-6">
                You matched all icons in <span className="font-bold text-ink">{moves} moves</span>!
              </p>
              <MagneticWrapper strength={10}>
                <button 
                  onClick={initializeGame}
                  className="btn-primary py-2 px-6"
                >
                  Play Again 🔄
                </button>
              </MagneticWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
