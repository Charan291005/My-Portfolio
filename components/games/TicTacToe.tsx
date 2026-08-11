'use client';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import MagneticWrapper from '../MagneticWrapper';
import { X, Circle, RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'Draw'>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    if (!squares.includes(null)) {
      return { winner: 'Draw' as const, line: null };
    }
    return null;
  };

  const triggerConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#000000', '#2563EB', '#16A34A']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#000000', '#2563EB', '#16A34A']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleClick = useCallback((index: number) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (result.winner === 'X') triggerConfetti();
    }
  }, [board, isXNext, winner]);

  // Simple computer move
  useEffect(() => {
    if (!isXNext && !winner) {
      const timeout = setTimeout(() => {
        const availableSpots = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
        if (availableSpots.length > 0) {
          const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
          const newBoard = [...board];
          newBoard[randomSpot] = 'O';
          setBoard(newBoard);
          setIsXNext(true);

          const result = checkWinner(newBoard);
          if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
            if (result.winner === 'O') {
              // Optional: play some lose animation/effect
            }
          }
        }
      }, 600); // 600ms delay for realism
      return () => clearTimeout(timeout);
    }
  }, [isXNext, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="flex justify-center w-full">
      <motion.div
        className="bg-white p-6 sm:p-8 w-full max-w-lg min-h-[420px] flex flex-col items-center relative"
        style={{ 
          borderRadius: '10px 255px 15px 225px / 255px 15px 225px 15px',
          border: '2px solid var(--ink)',
          rotate: '1deg',
          backgroundImage: 'radial-gradient(var(--ink-faint) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        whileHover={{ rotate: '0deg', scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div className="absolute -top-3 -left-3 text-3xl rotate-[-20deg]">📌</div>

        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
          Tic-Tac-Toe ❌⭕
        </h3>
        <p className="text-sm font-body text-ink-light mb-6">
          {winner ? (
            winner === 'Draw' ? "It's a draw!" : `${winner} wins!`
          ) : (
            isXNext ? "Your turn (X)" : "Computer's turn (O)"
          )}
        </p>

        <div className="relative w-64 h-64 sm:w-72 sm:h-72">
          {/* Grid lines drawn with divs to look sketchy */}
          <div className="absolute top-1/3 left-0 w-full h-[3px] bg-ink rounded-[50%]" style={{ transform: 'rotate(-0.5deg)' }}></div>
          <div className="absolute top-2/3 left-0 w-full h-[3px] bg-ink rounded-[50%]" style={{ transform: 'rotate(0.5deg)' }}></div>
          <div className="absolute top-0 left-1/3 w-[3px] h-full bg-ink rounded-[50%]" style={{ transform: 'rotate(1deg)' }}></div>
          <div className="absolute top-0 left-2/3 w-[3px] h-full bg-ink rounded-[50%]" style={{ transform: 'rotate(-1deg)' }}></div>

          <div className="grid grid-cols-3 grid-rows-3 w-full h-full relative z-10">
            {board.map((cell, index) => {
              const isWinningCell = winningLine?.includes(index);
              return (
                <div 
                  key={index} 
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  <AnimatePresence>
                    {cell && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: cell === 'X' ? -45 : 45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className={isWinningCell ? 'text-crayon-green' : 'text-ink'}
                      >
                        {cell === 'X' ? (
                          <X size={54} strokeWidth={2.5} />
                        ) : (
                          <Circle size={46} strokeWidth={3} />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <MagneticWrapper strength={10}>
                <button 
                  onClick={resetGame}
                  className="btn-primary py-2 px-6 flex items-center gap-2"
                >
                  <RotateCcw size={16} /> Play Again
                </button>
              </MagneticWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
