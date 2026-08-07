'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Spring-smooth the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll 0→1 to line height 0→100vh
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0vh', '100vh']);
  // Pencil tip moves along with the line
  const pencilY = useTransform(smoothProgress, [0, 1], ['0vh', 'calc(100vh - 20px)']);
  // Fade in once scrolling starts
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <div
      className="fixed left-0 top-0 bottom-0 z-[100] pointer-events-none"
      style={{ width: '4px' }}
      aria-hidden="true"
    >
      {/* Pencil line track (faint) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(to bottom, rgba(74,144,217,0.08) 0px, rgba(74,144,217,0.08) 4px, transparent 4px, transparent 8px)',
        }}
      />

      {/* Drawing line */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          height: lineHeight,
          opacity,
          background: 'linear-gradient(to bottom, #4a90d9, #66bb6a)',
          boxShadow: '0 0 6px rgba(74,144,217,0.5)',
        }}
      />

      {/* Pencil tip SVG at the leading edge */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: pencilY, opacity }}
      >
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pencil body */}
          <rect x="2" y="0" width="10" height="13" rx="1.5" fill="#4a90d9" stroke="#2d2d2d" strokeWidth="1.2"/>
          {/* Pencil ferrule (band) */}
          <rect x="2" y="10" width="10" height="3" fill="#e8e0d0" stroke="#2d2d2d" strokeWidth="1"/>
          {/* Pencil tip (wood cone) */}
          <path d="M3,13 L7,20 L11,13 Z" fill="#f5d5a0" stroke="#2d2d2d" strokeWidth="1"/>
          {/* Pencil tip point */}
          <path d="M5.5,17 L7,20 L8.5,17" fill="#2d2d2d" stroke="#2d2d2d" strokeWidth="0.5"/>
          {/* Pencil stripe */}
          <line x1="2" y1="4" x2="12" y2="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        </svg>
      </motion.div>
    </div>
  );
}
