'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

// ... (SVG shapes are same as before)
const doodleShapes = [
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,2 L24,14 L38,14 L27,22 L31,36 L20,28 L9,36 L13,22 L2,14 L16,14 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  (color: string) => <svg viewBox="0 0 30 40" className="w-full h-full"><path d="M18,2 L8,18 L16,18 L12,38 L26,16 L18,16 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,35 Q5,25 5,15 Q5,5 15,5 Q20,5 20,12 Q20,5 25,5 Q35,5 35,15 Q35,25 20,35 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,20 Q20,14 24,14 Q30,14 30,20 Q30,28 20,28 Q10,28 10,20 Q10,8 20,8 Q34,8 34,20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  (color: string) => <svg viewBox="0 0 40 30" className="w-full h-full"><path d="M2,15 Q20,15 35,15 M28,8 L35,15 L28,22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M14,5 L6,20 L14,35 M26,5 L34,20 L26,35" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  (color: string) => <svg viewBox="0 0 36 40" className="w-full h-full"><path d="M18,3 L4,10 L4,22 Q4,35 18,38 Q32,35 32,22 L32,10 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M14,18 L18,22 L24,14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  (color: string) => <svg viewBox="0 0 50 20" className="w-full h-full"><path d="M2,10 Q8,2 14,10 T26,10 T38,10 T48,10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
];

const doodleColors = ['#4a90d9', '#e74c3c', '#66bb6a', '#9c6ade', '#f48fb1', '#ffb74d'];

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

// Interactive individual doodle component
function InteractiveDoodle({ doodle }: { doodle: any }) {
  const { scrollY } = useScroll();
  // We use the doodle id and size to determine scroll speed/direction to create parallax depth
  const speed = (doodle.size / 20) * (doodle.id % 2 === 0 ? 0.3 : -0.2);
  const yParallax = useTransform(scrollY, [0, 3000], [0, 3000 * speed]);
  const ySpring = useSpring(yParallax, { damping: 50, stiffness: 200 });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-none z-0"
      style={{
        left: `${doodle.left}%`,
        top: `${doodle.top}%`,
        width: doodle.size,
        height: doodle.size,
        y: ySpring,
      }}
      initial={{ rotate: doodle.rotation, opacity: 0 }}
      animate={{ 
        rotate: isHovered ? doodle.rotation + 45 : [doodle.rotation, doodle.rotation + 15, doodle.rotation - 10, doodle.rotation],
        scale: isHovered ? 1.4 : 1,
        opacity: isHovered ? 0.3 : 0.15,
        x: isHovered ? 0 : [0, 10, -10, 0],
        y: isHovered ? -10 : [0, -10, 10, 0]
      }}
      transition={{
        rotate: isHovered ? { type: "spring", stiffness: 300, damping: 10 } : { duration: doodle.duration * 1.5, repeat: Infinity, ease: 'easeInOut', delay: doodle.delay },
        x: { duration: doodle.duration * 1.2, repeat: Infinity, ease: 'easeInOut', delay: doodle.delay },
        y: { duration: doodle.duration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: doodle.delay },
        scale: { type: "spring", stiffness: 300, damping: 15 },
        opacity: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {doodle.shape(doodle.color)}
    </motion.div>
  );
}

export default function DoodleDecorations({ count = 8, className = '', seed = 42 }: { count?: number; className?: string; seed?: number; }) {
  const rand = seededRandom(seed);
  
  const doodles = Array.from({ length: count }, (_, i) => {
    const shapeIndex = Math.floor(rand() * doodleShapes.length);
    const colorIndex = Math.floor(rand() * doodleColors.length);
    const left = rand() * 90 + 5;
    const top = rand() * 80 + 10;
    const size = 20 + rand() * 25;
    const rotation = rand() * 40 - 20;
    const delay = rand() * 4;
    const duration = 5 + rand() * 4;

    return { id: i, shape: doodleShapes[shapeIndex], color: doodleColors[colorIndex], left, top, size, rotation, delay, duration };
  });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {doodles.map(doodle => (
        <InteractiveDoodle key={doodle.id} doodle={doodle} />
      ))}
    </div>
  );
}
