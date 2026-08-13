'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface ScoreContextType {
  score: number;
  incrementScore: (amount: number) => void;
}

const ScoreContext = createContext<ScoreContextType>({
  score: 0,
  incrementScore: () => {},
});

export const useScore = () => useContext(ScoreContext);

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('hackerScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  const incrementScore = (amount: number) => {
    setScore(prev => {
      const newScore = prev + amount;
      localStorage.setItem('hackerScore', newScore.toString());
      return newScore;
    });
  };

  return (
    <ScoreContext.Provider value={{ score, incrementScore }}>
      {children}
    </ScoreContext.Provider>
  );
}
