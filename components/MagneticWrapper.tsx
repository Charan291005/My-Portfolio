'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticWrapper({ children, strength = 40 }: { children: React.ReactNode, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rafRef = useRef<number | null>(null);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    
    if (rafRef.current) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) {
        rafRef.current = null;
        return;
      }
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      
      x.set((middleX / width) * strength);
      y.set((middleY / height) * strength);
      rafRef.current = null;
    });
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
