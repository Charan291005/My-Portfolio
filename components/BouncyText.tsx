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
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,    // slightly faster stagger
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
        if (char === ' ') {
          return <span key={`space-${index}`}>&nbsp;</span>;
        }
        
        const charCode = char.charCodeAt(0) || 1;
        const pseudoRandom = ((charCode * index * 13) % 100) / 100;
        const defaultRotate = +((index % 2 === 0 ? 1 : -1) * (pseudoRandom * baseRotate)).toFixed(2);

        // Hand-drawn entrance: slight rotation + Y overshoot + scale settle
        let initialAnimation: any = { rotate: defaultRotate, y: 0, scale: 1, opacity: 1 };
        if (revealAnimation === 'drop') {
          // Irregular rotation per character for hand-drawn feel
          const dropRotate = (index % 3 === 0 ? -3 : index % 3 === 1 ? 2.5 : -1.5);
          initialAnimation = { rotate: dropRotate, y: -35, scale: 0.9, opacity: 0 };
        } else if (revealAnimation === 'pop') {
          const popRotate = (index % 2 === 0 ? -4 : 3);
          initialAnimation = { rotate: popRotate, scale: 0.3, opacity: 0 };
        }

        const animateAnimation = { rotate: defaultRotate, y: 0, scale: 1, opacity: 1 };

        return (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            style={{
              '--char-rest-rotate': `${defaultRotate}deg`,
            } as React.CSSProperties}
            variants={revealAnimation !== 'none' ? { hidden: initialAnimation, visible: animateAnimation } : undefined}
            initial={revealAnimation === 'none' ? { rotate: defaultRotate, y: 0 } : undefined}
            animate={revealAnimation === 'none' ? { rotate: defaultRotate, y: 0 } : undefined}
            whileHover={{
              scale: hoverScale,
              rotate: defaultRotate > 0 ? defaultRotate + 8 : defaultRotate - 8,
              y: -5,
              color: '#4a90d9',
              transition: { type: 'spring', stiffness: 500, damping: 8 },
            }}
            transition={{
              type: 'spring',
              stiffness: 200,    // softer spring for hand-drawn feel
              damping: 10,       // more bounce / overshoot
              mass: 0.6,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
