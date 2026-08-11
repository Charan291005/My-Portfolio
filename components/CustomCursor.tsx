'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface InkSplash {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [inkSplashes, setInkSplashes] = useState<InkSplash[]>([]);
  const splashIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailXSpring = useSpring(cursorX, { damping: 40, stiffness: 150 });
  const trailYSpring = useSpring(cursorY, { damping: 40, stiffness: 150 });

  // Second trail dot — even more delayed for a longer tail
  const trail2XSpring = useSpring(cursorX, { damping: 55, stiffness: 100 });
  const trail2YSpring = useSpring(cursorY, { damping: 55, stiffness: 100 });

  const addInkSplash = useCallback((x: number, y: number) => {
    const id = splashIdRef.current++;
    setInkSplashes(prev => [...prev.slice(-5), { id, x, y }]);
    setTimeout(() => {
      setInkSplashes(prev => prev.filter(s => s.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      addInkSplash(e.clientX, e.clientY);
    };
    const handleMouseUp = () => setIsClicking(false);

    // Detect interactive elements for cursor state change
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], .card, .sticky-note, .doodle-tag, .btn-primary, .btn-secondary, input, textarea');
      setIsHoveringInteractive(!!interactive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, addInkSplash]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main pencil cursor */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[99999] drop-shadow-md text-ink"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHoveringInteractive ? 40 : 32,
          height: isHoveringInteractive ? 40 : 32,
        }}
        animate={{
          scale: isClicking ? 0.7 : isHoveringInteractive ? 1.2 : 1,
          rotate: isClicking ? -30 : isHoveringInteractive ? -5 : -10,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      </motion.div>
      
      {/* Primary ink trail dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[99998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          width: isHoveringInteractive ? 8 : 5,
          height: isHoveringInteractive ? 8 : 5,
          backgroundColor: isHoveringInteractive ? '#4a90d9' : '#4a90d9',
        }}
        animate={{
          scale: isClicking ? 2.5 : isHoveringInteractive ? 1.5 : 1,
          opacity: isClicking ? 0.9 : isHoveringInteractive ? 0.7 : 0.4,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Secondary trail dot — longer tail */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-pencil-red pointer-events-none z-[99997]"
        style={{
          x: trail2XSpring,
          y: trail2YSpring,
        }}
        animate={{
          opacity: isHoveringInteractive ? 0.5 : 0.2,
          scale: isClicking ? 2 : 1,
        }}
      />

      {/* Ink splash particles on click */}
      <AnimatePresence>
        {inkSplashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="fixed pointer-events-none z-[99996]"
            style={{ left: splash.x, top: splash.y }}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Expanding ink ring */}
            <svg width="60" height="60" viewBox="0 0 60 60" className="absolute -translate-x-1/2 -translate-y-1/2">
              <motion.circle
                cx="30" cy="30" r="25"
                fill="none"
                stroke="#4a90d9"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ r: 3, opacity: 0.8, strokeWidth: 3 }}
                animate={{ r: 28, opacity: 0, strokeWidth: 0.5 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </svg>
            {/* Small ink dots splatter */}
            {[...Array(5)].map((_, i) => {
              const angle = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
              const dist = 12 + Math.random() * 18;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-ink"
                  style={{ left: 0, top: 0 }}
                  initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.5 + Math.random() * 0.3, ease: 'easeOut' }}
                />
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
