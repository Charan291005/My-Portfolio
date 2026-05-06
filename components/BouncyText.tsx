'use client';
import { motion } from 'framer-motion';

interface BouncyTextProps {
  text: string;
  className?: string;
  hoverScale?: number;
  baseRotate?: number;
  revealAnimation?: 'none' | 'drop' | 'pop';
  delay?: number;
}

export default function BouncyText({ text, className = '', hoverScale = 1.2, baseRotate = 5, revealAnimation = 'none', delay = 0 }: BouncyTextProps) {
  // Split the text into characters
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      }
    }
  };

  return (
    <motion.span 
      key={revealAnimation}
      className={`inline-flex flex-wrap ${className}`}
      variants={revealAnimation !== 'none' ? containerVariants : undefined}
      initial={revealAnimation !== 'none' ? 'hidden' : undefined}
      animate={revealAnimation !== 'none' ? 'visible' : undefined}
    >
      {characters.map((char, index) => {
        // Skip spaces, just render them
        if (char === ' ') {
          return <span key={`space-${index}`}>&nbsp;</span>;
        }
        
        // Use a deterministic pseudo-random value to avoid SSR hydration mismatch
        const charCode = char.charCodeAt(0) || 1;
        const pseudoRandom = ((charCode * index * 13) % 100) / 100; // Value between 0 and 1
        const defaultRotate = (index % 2 === 0 ? 1 : -1) * (pseudoRandom * baseRotate);

        let initialAnimation: any = { rotate: defaultRotate, y: 0, scale: 1, opacity: 1 };
        if (revealAnimation === 'drop') {
          initialAnimation = { rotate: defaultRotate, y: -50, opacity: 0 };
        } else if (revealAnimation === 'pop') {
          initialAnimation = { rotate: defaultRotate, scale: 0, opacity: 0 };
        }

        const animateAnimation = { rotate: defaultRotate, y: 0, scale: 1, opacity: 1 };

        return (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            variants={revealAnimation !== 'none' ? { hidden: initialAnimation, visible: animateAnimation } : undefined}
            initial={revealAnimation === 'none' ? { rotate: defaultRotate, y: 0 } : undefined}
            animate={revealAnimation === 'none' ? { rotate: defaultRotate, y: 0 } : undefined}
            whileHover={{
              scale: hoverScale,
              rotate: defaultRotate > 0 ? defaultRotate + 10 : defaultRotate - 10,
              y: -5,
              color: '#4a90d9', // Highlight blue on hover
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 10,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
