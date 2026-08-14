'use client';
import { memo } from 'react';

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

const spotColors = ['#4a90d9', '#e74c3c', '#66bb6a', '#9c6ade', '#f48fb1', '#ffb74d', '#2d2d2d'];
const spotAnimClasses = ['ink-spot-breathe', 'ink-spot-flicker', 'ink-spot-bob', 'ink-spot-drift', 'ink-spot-spin'];
const SPOT_TYPES = ['dot', 'cross', 'x', 'dash', 'circle', 'tiny-star', 'squiggle', 'bracket'] as const;
type SpotType = typeof SPOT_TYPES[number];

interface Spot {
  id: number; left: number; top: number; type: SpotType;
  color: string; size: number; opacity: number;
  animClass: string; dur: number; delay: number; rotation: number;
}

const InkMark = memo(function InkMark({ spot }: { spot: Spot }) {
  const s = spot.size;
  const c = spot.color;
  const style = {
    left: `${spot.left}%`,
    top: `${spot.top}%`,
    opacity: spot.opacity,
    ['--spot-opacity' as string]: String(spot.opacity),
    ['--idle-dur' as string]: `${spot.dur}s`,
    ['--idle-delay' as string]: `${spot.delay}s`,
    transform: `rotate(${spot.rotation}deg)`,
  };
  return (
    <div className={`absolute pointer-events-none ${spot.animClass}`} style={style}>
      {spot.type === 'dot' && (
        <div style={{ width: s, height: s, borderRadius: '50%', background: c }} />
      )}
      {spot.type === 'cross' && (
        <svg width={s} height={s} viewBox="0 0 10 10" style={{ display: 'block' }}>
          <path d="M5,1 L5,9 M1,5 L9,5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      {spot.type === 'x' && (
        <svg width={s} height={s} viewBox="0 0 10 10" style={{ display: 'block' }}>
          <path d="M2,2 L8,8 M8,2 L2,8" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      {spot.type === 'dash' && (
        <svg width={s * 2} height={Math.max(4, s * 0.6)} viewBox="0 0 20 6" style={{ display: 'block' }}>
          <path d="M1,3 Q5,1 10,3 T19,3" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      )}
      {spot.type === 'circle' && (
        <svg width={s} height={s} viewBox="0 0 10 10" style={{ display: 'block' }}>
          <ellipse cx="5" cy="5" rx="4" ry="3.5" fill="none" stroke={c} strokeWidth="1.5" />
        </svg>
      )}
      {spot.type === 'tiny-star' && (
        <svg width={s} height={s} viewBox="0 0 10 10" style={{ display: 'block' }}>
          <path d="M5,1 L6,4 L9,4 L7,6 L8,9 L5,7 L2,9 L3,6 L1,4 L4,4 Z" fill="none" stroke={c} strokeWidth="1" strokeLinejoin="round" />
        </svg>
      )}
      {spot.type === 'squiggle' && (
        <svg width={s * 2.5} height={s} viewBox="0 0 25 10" style={{ display: 'block' }}>
          <path d="M1,5 Q4,1 7,5 T13,5 T19,5 T24,5" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )}
      {spot.type === 'bracket' && (
        <svg width={s} height={s * 1.5} viewBox="0 0 8 12" style={{ display: 'block' }}>
          <path d="M6,1 L3,1 L3,11 L6,11" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
});

export default function InkSpots({
  count = 50,
  seed = 99,
  className = '',
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const rand = seededRandom(seed);
  const spots: Spot[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    type: SPOT_TYPES[Math.floor(rand() * SPOT_TYPES.length)],
    color: spotColors[Math.floor(rand() * spotColors.length)],
    left: +(rand() * 97).toFixed(2),
    top: +(rand() * 97).toFixed(2),
    size: +(4 + rand() * 10).toFixed(1),
    opacity: +(0.18 + rand() * 0.32).toFixed(2),
    animClass: spotAnimClasses[Math.floor(rand() * spotAnimClasses.length)],
    dur: +(3 + rand() * 7).toFixed(2),
    delay: +(rand() * 8).toFixed(2),
    rotation: +(rand() * 360).toFixed(1),
  }));

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {spots.map(spot => <InkMark key={spot.id} spot={spot} />)}
    </div>
  );
}