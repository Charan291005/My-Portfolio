'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

// Generates a hand-drawn looking SVG rectangle path
function sketchyRect(w: number, h: number, seed: number = 0) {
  const jitter = (v: number) => v + (Math.sin(seed + v) * 2);
  return `M ${jitter(2)},${jitter(2)} 
          L ${jitter(w - 2)},${jitter(2)} 
          L ${jitter(w - 2)},${jitter(h - 2)} 
          L ${jitter(2)},${jitter(h - 2)} Z`;
}

function sketchyCircle(cx: number, cy: number, r: number) {
  const points = 36;
  let d = '';
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const jitter = Math.sin(i * 7) * 3;
    const x = cx + (r + jitter) * Math.cos(angle);
    const y = cy + (r + jitter) * Math.sin(angle);
    d += i === 0 ? `M ${x},${y} ` : `L ${x},${y} `;
  }
  return d + 'Z';
}

interface ScribbleBorderProps {
  children: React.ReactNode;
  variant?: 'box' | 'circle' | 'cloud';
  color?: string;
  strokeWidth?: number;
  className?: string;
  animate?: boolean;
}

export default function ScribbleBorder({
  children,
  variant = 'box',
  color = '#2d2d2d',
  strokeWidth = 2.5,
  className = '',
  animate = true,
}: ScribbleBorderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const seed = useMemo(() => Math.random() * 100, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <motion.path
          d={
            variant === 'circle'
              ? sketchyCircle(50, 50, 48)
              : variant === 'cloud'
              ? 'M 10,50 Q 10,10 30,10 Q 40,0 55,10 Q 70,5 80,15 Q 95,15 95,35 Q 100,55 85,60 Q 90,80 70,85 Q 55,95 40,85 Q 20,90 15,75 Q 2,70 5,55 Q 0,40 10,50 Z'
              : sketchyRect(100, 100, seed)
          }
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      {children}
    </div>
  );
}

// Simple scribble underline component
export function ScribbleUnderline({
  color = '#4a90d9',
  width = '100%',
  className = '',
}: {
  color?: string;
  width?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 12"
      className={`${className}`}
      style={{ width, height: '12px' }}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 2,6 Q 30,2 50,6 T 100,6 T 150,6 T 198,6"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}

// Scribble circle highlight
export function ScribbleCircleHighlight({
  children,
  color = '#e74c3c',
  className = '',
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <path
          d={sketchyCircle(50, 20, 45)}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </span>
  );
}
