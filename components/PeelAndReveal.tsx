'use client';
import { useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

export default function PeelAndReveal({ secretContent, title }: { secretContent: React.ReactNode, title?: string }) {
  const [isPeeled, setIsPeeled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(y, [0, 200], [1, 0]); // Fade out as it goes down
  const controls = useAnimation();

  const handleDragEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 120) {
      // Fly away
      controls.start({ x: info.offset.x * 2, y: info.offset.y * 2, opacity: 0 }).then(() => {
        setIsPeeled(true);
      });
    } else {
      controls.start({ x: 0, y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[250px]">
      {/* Secret Layer (Bottom) */}
      <div className="absolute inset-0 bg-[#faf6ec] border-4 border-dashed border-ink/40 p-6 flex flex-col items-center justify-center text-center shadow-inner rounded-xl">
        <div className="font-heading text-3xl font-bold text-pencil-red mb-3">Secret Unlocked! 🔓</div>
        <div className="font-body text-lg text-ink font-bold leading-relaxed">{secretContent}</div>
        {isPeeled && (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              setIsPeeled(false);
              controls.start({ x: 0, y: 0, opacity: 1 });
            }}
            className="mt-4 text-sm font-accent text-pencil-blue hover:underline cursor-pointer"
          >
            Put it back
          </motion.button>
        )}
      </div>

      {/* Peelable Layer (Top) */}
      {!isPeeled && (
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x, y, rotate, opacity }}
          whileHover={{ scale: 1.02, rotate: -2 }}
          whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
          className="absolute inset-0 sticky-note-blue cursor-grab shadow-[6px_8px_0_rgba(0,0,0,0.2)] flex flex-col items-center justify-center p-6 text-center z-10"
        >
          {/* Folded dog-ear corner effect */}
          <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-[#f0e6c8] z-20 shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)]"></div>

          <div className="text-5xl mb-4">🤫</div>
          <h3 className="font-heading text-3xl font-bold text-ink">{title || "Top Secret"}</h3>
          <p className="font-accent text-ink mt-3 text-lg font-bold">Drag and peel me away to reveal the truth!</p>
        </motion.div>
      )}
    </div>
  );
}
