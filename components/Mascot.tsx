'use client';
import { motion } from 'framer-motion';

interface MascotProps {
  className?: string;
  pose?: 'floating' | 'peeking' | 'typing';
}

export default function Mascot({ className = '', pose = 'floating' }: MascotProps) {
  // A hand-drawn hacker/ninja with a laptop.
  // Uses stroke-dasharray animations on load, then looping bob animations.
  
  const drawAnim = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  const floatAnim = {
    y: [0, -12, 0],
    rotate: [-1, 2, -1],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  };

  const peekAnim = {
    y: [20, 0, 20],
    rotate: [0, 5, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  const currentAnim = pose === 'peeking' ? peekAnim : floatAnim;

  return (
    <motion.div 
      className={`relative z-20 pointer-events-none ${className}`}
      animate={currentAnim}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Hoodie Body */}
        <motion.path 
          d="M 30 90 C 20 60 30 30 50 25 C 70 30 80 60 70 90" 
          fill="none" 
          stroke="#2d2d2d" 
          strokeWidth="3" 
          strokeLinecap="round"
          variants={drawAnim}
          initial="hidden"
          animate="visible"
        />
        {/* Head/Face shape */}
        <motion.path 
          d="M 40 45 C 35 30 45 20 50 20 C 55 20 65 30 60 45 Z" 
          fill="#faf5e4" 
          stroke="#2d2d2d" 
          strokeWidth="2.5" 
          strokeLinejoin="round"
          variants={drawAnim}
          initial="hidden"
          animate="visible"
        />
        {/* Hacker mask/goggles */}
        <motion.rect 
          x="38" y="30" width="24" height="8" rx="4" 
          fill="#2d2d2d"
          variants={drawAnim}
          initial="hidden"
          animate="visible"
        />
        {/* Glowing eyes inside mask */}
        <motion.circle cx="45" cy="34" r="1.5" fill="#4a90d9" />
        <motion.circle cx="55" cy="34" r="1.5" fill="#4a90d9" />
        
        {/* Laptop base */}
        <motion.path 
          d="M 20 75 L 80 75 L 85 85 L 15 85 Z" 
          fill="none" 
          stroke="#2d2d2d" 
          strokeWidth="3" 
          strokeLinejoin="round"
          variants={drawAnim}
          initial="hidden"
          animate="visible"
        />
        {/* Laptop screen */}
        <motion.path 
          d="M 25 75 L 30 50 L 70 50 L 75 75" 
          fill="rgba(74, 144, 217, 0.1)" 
          stroke="#2d2d2d" 
          strokeWidth="2.5" 
          strokeLinejoin="round"
          variants={drawAnim}
          initial="hidden"
          animate="visible"
        />
        {/* Little code scribbles on screen */}
        <motion.path 
          d="M 35 55 L 45 55 M 35 60 L 55 60 M 35 65 L 50 65" 
          stroke="#4a90d9" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          variants={drawAnim}
          initial="hidden"
          animate="visible"
        />
        {/* Hands typing */}
        <motion.circle cx="35" cy="73" r="4" fill="#faf5e4" stroke="#2d2d2d" strokeWidth="2" />
        <motion.circle cx="65" cy="73" r="4" fill="#faf5e4" stroke="#2d2d2d" strokeWidth="2" />
      </svg>
    </motion.div>
  );
}
