'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[5px] z-[100] pointer-events-none">
      <motion.div
        className="h-full bg-pencil-blue origin-left"
        style={{ 
          scaleX,
          borderBottom: '1.5px solid #2d2d2d',
          borderRight: '1.5px solid #2d2d2d',
          borderBottomRightRadius: '10px'
        }}
      />
    </div>
  );
}
