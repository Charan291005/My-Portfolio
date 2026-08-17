'use client';
import { memo, useEffect, useRef, useCallback } from 'react';

// ===== DOODLE SHAPES (unchanged) =====
const doodleShapes = [
  // Star
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,2 L24,14 L38,14 L27,22 L31,36 L20,28 L9,36 L13,22 L2,14 L16,14 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Lightning bolt
  (color: string) => <svg viewBox="0 0 30 40" className="w-full h-full"><path d="M18,2 L8,18 L16,18 L12,38 L26,16 L18,16 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Heart
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,35 Q5,25 5,15 Q5,5 15,5 Q20,5 20,12 Q20,5 25,5 Q35,5 35,15 Q35,25 20,35 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  // Spiral
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,20 Q20,14 24,14 Q30,14 30,20 Q30,28 20,28 Q10,28 10,20 Q10,8 20,8 Q34,8 34,20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  // Arrow
  (color: string) => <svg viewBox="0 0 40 30" className="w-full h-full"><path d="M2,15 Q20,15 35,15 M28,8 L35,15 L28,22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Code brackets
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M14,5 L6,20 L14,35 M26,5 L34,20 L26,35" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Shield with checkmark
  (color: string) => <svg viewBox="0 0 36 40" className="w-full h-full"><path d="M18,3 L4,10 L4,22 Q4,35 18,38 Q32,35 32,22 L32,10 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M14,18 L18,22 L24,14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Wavy line
  (color: string) => <svg viewBox="0 0 50 20" className="w-full h-full"><path d="M2,10 Q8,2 14,10 T26,10 T38,10 T48,10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  // Padlock
  (color: string) => <svg viewBox="0 0 32 40" className="w-full h-full"><rect x="4" y="18" width="24" height="18" rx="3" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10,18 L10,12 Q10,4 16,4 Q22,4 22,12 L22,18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="27" r="2.5" fill="none" stroke={color} strokeWidth="1.8"/><path d="M16,29.5 L16,33" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  // Magnifying glass
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><circle cx="16" cy="16" r="11" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M24,24 L36,36" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><path d="M12,12 Q16,10 20,12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>,
  // Compass rose
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><circle cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M20,4 L20,36 M4,20 L36,20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/><path d="M20,4 L23,18 L20,22 L17,18 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20,36 L23,22 L20,18 L17,22 Z" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/><circle cx="20" cy="20" r="2.5" fill="none" stroke={color} strokeWidth="1.5"/></svg>,
  // Binary stream 101
  (color: string) => <svg viewBox="0 0 48 30" className="w-full h-full"><text x="2" y="12" fontFamily="monospace" fontSize="10" fill="none" stroke={color} strokeWidth="0.8">101</text><text x="12" y="24" fontFamily="monospace" fontSize="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6">010</text><text x="28" y="16" fontFamily="monospace" fontSize="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.8">11</text></svg>,
  // F1 Racing Car
  (color: string) => <svg viewBox="0 0 80 40" className="w-full h-full"><path d="M8,28 L14,28 Q16,28 16,26 L18,20 L28,16 L42,14 L56,14 L64,16 L68,20 Q70,24 70,28 L74,28" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M42,14 L44,8 L54,8 L56,14" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="30" r="5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="22" cy="30" r="2" fill="none" stroke={color} strokeWidth="1"/><circle cx="62" cy="30" r="5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="62" cy="30" r="2" fill="none" stroke={color} strokeWidth="1"/><path d="M6,22 L14,22 M68,20 L76,18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Sports Car
  (color: string) => <svg viewBox="0 0 70 35" className="w-full h-full"><path d="M10,24 L14,24 L16,18 L24,12 L34,10 L46,10 L54,12 L58,18 L62,24 L66,24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="26" r="4.5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="56" cy="26" r="4.5" fill="none" stroke={color} strokeWidth="1.8"/><path d="M28,12 L30,18 L44,18 L46,12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4,22 L10,22 M62,22 L68,22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Gamepad / Controller
  (color: string) => <svg viewBox="0 0 50 35" className="w-full h-full"><path d="M14,10 Q25,8 36,10 Q44,12 46,22 Q48,30 40,28 Q36,26 32,20 L18,20 Q14,26 10,28 Q2,30 4,22 Q6,12 14,10 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M13,16 L13,22 M10,19 L16,19" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="34" cy="15" r="1.5" fill={color} opacity="0.4"/><circle cx="38" cy="19" r="1.5" fill={color} opacity="0.4"/></svg>,
  // Rocket ship
  (color: string) => <svg viewBox="0 0 30 50" className="w-full h-full"><path d="M15,4 Q22,12 22,28 L18,34 L18,28 L12,28 L12,34 L8,28 Q8,12 15,4 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="15" cy="18" r="3" fill="none" stroke={color} strokeWidth="1.5"/><path d="M8,28 Q4,26 3,32 L8,30" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M22,28 Q26,26 27,32 L22,30" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M12,38 L15,46 L18,38" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/></svg>,
  // Crown
  (color: string) => <svg viewBox="0 0 50 35" className="w-full h-full"><path d="M5,28 L5,12 L15,20 L25,6 L35,20 L45,12 L45,28 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="5" cy="10" r="2" fill="none" stroke={color} strokeWidth="1.5"/><circle cx="25" cy="4" r="2" fill="none" stroke={color} strokeWidth="1.5"/><circle cx="45" cy="10" r="2" fill="none" stroke={color} strokeWidth="1.5"/></svg>,
  // Headphones
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M8,24 Q8,10 20,10 Q32,10 32,24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><rect x="4" y="22" width="6" height="10" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><rect x="30" y="22" width="6" height="10" rx="2" fill="none" stroke={color} strokeWidth="1.8"/></svg>,
  // Skateboard
  (color: string) => <svg viewBox="0 0 60 25" className="w-full h-full"><path d="M12,12 Q6,12 4,8 M12,12 L48,12 Q54,12 56,8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx="18" cy="18" r="3.5" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="42" cy="18" r="3.5" fill="none" stroke={color} strokeWidth="1.8"/><path d="M18,14.5 L18,12 M42,14.5 L42,12" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  // Guitar
  (color: string) => <svg viewBox="0 0 25 55" className="w-full h-full"><path d="M11,4 L11,22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M8,22 Q4,28 4,34 Q4,42 8,46 Q12,50 16,46 Q20,42 20,34 Q20,28 16,22 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="36" r="3" fill="none" stroke={color} strokeWidth="1.5"/><path d="M8,4 L14,4" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M8,8 L14,8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Sunglasses
  (color: string) => <svg viewBox="0 0 50 25" className="w-full h-full"><path d="M2,10 L8,10 Q10,10 10,14 Q10,20 16,20 Q22,20 22,14 Q22,10 24,10 L26,10 Q28,10 28,14 Q28,20 34,20 Q40,20 40,14 Q40,10 42,10 L48,10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M2,10 Q2,6 6,6 L44,6 Q48,6 48,10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Racing flag
  (color: string) => <svg viewBox="0 0 35 45" className="w-full h-full"><path d="M6,4 L6,42" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M6,4 Q18,2 30,8 L30,22 Q18,16 6,18" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10,6 L10,12 L14,10 L14,16 L18,14 L18,20" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/></svg>,
  // Trophy
  (color: string) => <svg viewBox="0 0 40 45" className="w-full h-full"><path d="M12,6 L28,6 L26,24 Q24,30 20,30 Q16,30 14,24 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12,8 Q4,8 4,16 Q4,22 12,20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M28,8 Q36,8 36,16 Q36,22 28,20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M20,30 L20,36 M14,38 L26,38" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  // Sneaker
  (color: string) => <svg viewBox="0 0 50 30" className="w-full h-full"><path d="M10,8 L10,22 Q10,26 14,26 L42,26 Q48,26 48,22 L48,18 Q42,14 34,16 L28,18 L22,12 L16,8 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18,12 L24,18 M22,10 L28,16" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg>,
  // Fire / Flame
  (color: string) => <svg viewBox="0 0 30 40" className="w-full h-full"><path d="M15,4 Q22,12 22,20 Q22,28 15,32 Q8,28 8,20 Q8,12 15,4 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M15,14 Q18,18 18,22 Q18,26 15,28 Q12,26 12,22 Q12,18 15,14 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/></svg>,
  // Speed lines
  (color: string) => <svg viewBox="0 0 40 20" className="w-full h-full"><path d="M2,4 L20,4 M6,10 L30,10 M2,16 L24,16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/></svg>,
  // Coffee Cup
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M8,12 L32,12 L28,30 Q26,36 20,36 Q14,36 12,30 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M32,16 Q38,16 38,20 Q38,26 30,26" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M14,8 Q16,4 18,8 T22,4" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M22,8 Q24,4 26,8 T30,4" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Floppy Disk
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M8,4 L28,4 L36,12 L36,36 L8,36 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="14" y="4" width="12" height="10" fill="none" stroke={color} strokeWidth="1.5"/><rect x="12" y="22" width="16" height="14" fill="none" stroke={color} strokeWidth="1.5"/><line x1="16" y1="26" x2="24" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="30" x2="24" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Bug / Beetle
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><circle cx="20" cy="22" r="10" fill="none" stroke={color} strokeWidth="2"/><path d="M20,12 L20,32" stroke={color} strokeWidth="2"/><circle cx="20" cy="8" r="4" fill="none" stroke={color} strokeWidth="2"/><path d="M16,6 Q12,2 8,6 M24,6 Q28,2 32,6" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M10,22 L4,22 M30,22 L36,22 M12,16 L6,12 M28,16 L34,12 M12,28 L6,32 M28,28 L34,32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Terminal Prompt
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M6,10 L16,20 L6,30" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20,30 L34,30" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></svg>,
  // Eye
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M4,20 Q20,6 36,20 Q20,34 4,20 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="20" r="6" fill="none" stroke={color} strokeWidth="2"/><circle cx="20" cy="20" r="2" fill={color}/></svg>,
  // Key
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><circle cx="12" cy="20" r="6" fill="none" stroke={color} strokeWidth="2"/><path d="M18,20 L34,20 L34,26 L30,26 L30,20 L26,20 L26,26 L22,26 L22,20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Paint Palette
  (color: string) => <svg viewBox="0 0 50 40" className="w-full h-full"><path d="M15,35 Q5,35 5,20 Q5,5 25,5 Q45,5 45,20 Q45,35 30,35 Q25,35 25,25 Q25,20 20,20 Q15,20 15,35 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><circle cx="15" cy="15" r="2.5" fill={color} opacity="0.6"/><circle cx="25" cy="12" r="2.5" fill={color} opacity="0.6"/><circle cx="35" cy="18" r="2.5" fill={color} opacity="0.6"/><circle cx="12" cy="25" r="3" fill="none" stroke={color} strokeWidth="1.5"/></svg>,
  // Paint Brush
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M10,35 L18,27 L22,27 L26,23 Q35,14 36,6 Q28,7 19,16 L15,20 L15,24 L7,32 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18,27 L15,24 M22,27 L26,23" fill="none" stroke={color} strokeWidth="1.5"/><path d="M36,6 Q30,12 32,18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5"/><path d="M7,32 Q4,38 2,38 Q8,36 10,35" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  // Lightbulb
  (color: string) => <svg viewBox="0 0 30 45" className="w-full h-full"><path d="M15,4 Q24,4 24,14 Q24,22 19,28 L19,34 L11,34 L11,28 Q6,22 6,14 Q6,4 15,4 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M11,38 L19,38 M13,42 L17,42 M15,14 L15,22 M11,18 L15,14 L19,18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Abstract Geometric Swirl
  (color: string) => <svg viewBox="0 0 50 50" className="w-full h-full"><path d="M25,25 m0,-20 a20,20 0 1,1 0,40 a20,20 0 1,1 0,-40 M25,25 m0,-14 a14,14 0 1,1 0,28 a14,14 0 1,1 0,-28 M25,25 m0,-8 a8,8 0 1,1 0,16 a8,8 0 1,1 0,-16" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7"/></svg>,
  // Starburst
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,2 L20,38 M2,20 L38,20 M8,8 L32,32 M8,32 L32,8" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/><circle cx="20" cy="20" r="4" fill="none" stroke={color} strokeWidth="1.5"/></svg>,
  // Paper Plane
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M4,20 L36,4 L20,36 L18,22 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M36,4 L18,22 M18,22 L14,32 L16,24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Half Moon
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,4 A16,16 0 1,0 36,20 A12,12 0 0,1 20,4 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Diamond
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,4 L36,20 L20,36 L4,20 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12,12 L28,28 M12,28 L28,12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5"/></svg>,
  // Cloud
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M12,28 Q8,28 8,22 Q8,16 14,16 Q16,10 24,10 Q32,10 32,18 Q36,18 36,24 Q36,28 30,28 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Paperclip
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M16,28 L16,12 Q16,6 22,6 Q28,6 28,12 L28,30 Q28,36 20,36 Q12,36 12,30 L12,16 Q12,12 16,12 Q20,12 20,16 L20,28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Pencil
  (color: string) => <svg viewBox="0 0 12 50" className="w-full h-full"><path d="M3,4 L9,4 L9,38 L6,46 L3,38 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M3,38 L9,38" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M3,6 L9,6" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/><path d="M4,4 L4,1 L6,2 L8,1 L8,4" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Eraser
  (color: string) => <svg viewBox="0 0 50 28" className="w-full h-full"><path d="M8,24 L6,14 L30,4 L46,14 L38,24 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M38,24 L8,24" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><path d="M30,4 L38,24 M6,14 L46,14" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/></svg>,
  // Ruler
  (color: string) => <svg viewBox="0 0 60 22" className="w-full h-full"><path d="M2,4 L58,4 L58,18 L2,18 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10,4 L10,10 M18,4 L18,10 M26,4 L26,14 M34,4 L34,10 M42,4 L42,10 M50,4 L50,14" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>,
  // Compass
  (color: string) => <svg viewBox="0 0 30 50" className="w-full h-full"><path d="M15,2 L22,22 L15,48 L8,22 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="15" cy="22" r="3" fill="none" stroke={color} strokeWidth="1.5"/><path d="M15,2 L22,12 M15,2 L8,12" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/></svg>,
  // Thought bubble
  (color: string) => <svg viewBox="0 0 50 45" className="w-full h-full"><path d="M8,28 Q6,18 14,12 Q20,4 32,6 Q44,8 44,20 Q44,32 32,34 Q24,36 16,32 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="37" r="2.5" fill="none" stroke={color} strokeWidth="1.5"/><circle cx="8" cy="42" r="1.5" fill="none" stroke={color} strokeWidth="1.5"/></svg>,
  // Speech bubble
  (color: string) => <svg viewBox="0 0 50 45" className="w-full h-full"><path d="M6,6 L44,6 Q48,6 48,12 L48,28 Q48,34 44,34 L24,34 L12,42 L16,34 L6,34 Q2,34 2,28 L2,12 Q2,6 6,6 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Infinity loop
  (color: string) => <svg viewBox="0 0 60 30" className="w-full h-full"><path d="M20,15 Q20,6 30,6 Q40,6 40,15 Q40,24 30,24 Q20,24 20,15 Q20,6 30,6 Q20,6 10,15 Q4,15 4,15 Q4,6 14,6 Q24,6 30,15" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M30,15 Q36,24 46,24 Q56,24 56,15 Q56,6 46,6 Q36,6 30,15" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  // Wifi waves
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><circle cx="20" cy="32" r="2.5" fill="none" stroke={color} strokeWidth="2"/><path d="M12,26 Q16,20 20,20 Q24,20 28,26" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M6,20 Q12,10 20,10 Q28,10 34,20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M2,14 Q10,2 20,2 Q30,2 38,14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  // Flower
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><circle cx="20" cy="20" r="4" fill="none" stroke={color} strokeWidth="2"/><ellipse cx="20" cy="10" rx="3" ry="6" fill="none" stroke={color} strokeWidth="1.8"/><ellipse cx="20" cy="30" rx="3" ry="6" fill="none" stroke={color} strokeWidth="1.8"/><ellipse cx="10" cy="20" rx="6" ry="3" fill="none" stroke={color} strokeWidth="1.8"/><ellipse cx="30" cy="20" rx="6" ry="3" fill="none" stroke={color} strokeWidth="1.8"/><ellipse cx="13" cy="13" rx="3" ry="6" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(45 13 13)"/><ellipse cx="27" cy="27" rx="3" ry="6" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(45 27 27)"/></svg>,
  // Leaf
  (color: string) => <svg viewBox="0 0 30 50" className="w-full h-full"><path d="M15,46 Q4,36 4,22 Q4,6 15,4 Q26,6 26,22 Q26,36 15,46 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15,46 L15,4 M15,20 Q10,15 8,12 M15,20 Q20,15 22,12 M15,30 Q10,26 8,24 M15,30 Q20,26 22,24" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/></svg>,
  // Mountain peak
  (color: string) => <svg viewBox="0 0 60 40" className="w-full h-full"><path d="M2,36 L20,6 L38,36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M24,36 L38,12 L58,36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16,20 L20,16 L24,20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/></svg>,
  // Cactus
  (color: string) => <svg viewBox="0 0 30 50" className="w-full h-full"><path d="M14,46 L14,10 Q14,4 20,4 Q26,4 26,10 L26,22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14,18 L8,18 Q4,18 4,24 L4,30" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16,28 L22,28 Q26,28 26,22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10,46 L20,46" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
  // Mouse cursor / pointer
  (color: string) => <svg viewBox="0 0 30 40" className="w-full h-full"><path d="M4,4 L4,32 L12,24 L18,36 L22,34 L16,22 L26,22 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Fingerprint swirl
  (color: string) => <svg viewBox="0 0 40 40" className="w-full h-full"><path d="M20,20 Q20,16 22,14 Q26,12 28,14 Q32,18 28,24 Q24,30 18,28 Q12,26 12,18 Q12,8 22,6 Q34,4 36,16 Q36,28 24,34" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  // Exclamation mark
  (color: string) => <svg viewBox="0 0 20 50" className="w-full h-full"><path d="M10,4 Q12,20 10,34 Q8,20 10,4 Z" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><circle cx="10" cy="42" r="3" fill="none" stroke={color} strokeWidth="2"/></svg>,
  // Question mark
  (color: string) => <svg viewBox="0 0 30 50" className="w-full h-full"><path d="M6,14 Q6,4 16,4 Q26,4 26,14 Q26,22 16,26 L16,34" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="42" r="3" fill="none" stroke={color} strokeWidth="2"/></svg>,
  // Zig-zag
  (color: string) => <svg viewBox="0 0 60 20" className="w-full h-full"><path d="M2,4 L12,16 L22,4 L32,16 L42,4 L52,16 L58,10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Cross-hatch
  (color: string) => <svg viewBox="0 0 30 30" className="w-full h-full"><path d="M2,2 L28,28 M10,2 L28,20 M2,10 L20,28 M18,2 L28,12 M2,18 L12,28" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/><path d="M28,2 L2,28 M20,2 L2,20 M28,10 L10,28 M12,2 L2,12 M28,18 L18,28" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/></svg>,
  // Bookmark
  (color: string) => <svg viewBox="0 0 28 40" className="w-full h-full"><path d="M4,2 L24,2 L24,38 L14,30 L4,38 Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4,10 L24,10" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg>,
];

const doodleColors = ['#4a90d9', '#e74c3c', '#66bb6a', '#9c6ade', '#f48fb1', '#ffb74d', '#ff7043', '#26c6da'];

// 17 idle animation classes — distributed across all doodles
const idleClasses = [
  'idle-breathe', 'idle-rock', 'idle-drift', 'idle-sway',
  'idle-wobble-slow', 'idle-float', 'idle-pulse', 'idle-tilt',
  'idle-bob', 'idle-spin-slow', 'idle-jiggle', 'idle-bop',
  'idle-orbit', 'idle-flicker', 'idle-pendulum', 'idle-wag', 'idle-morph-scale',
];

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

// Organic Doodle — pure CSS with randomized idle, draw-in, and hover
const OrganicDoodle = memo(({ doodle }: { doodle: any }) => {
  const isLarge = doodle.size > 60;
  const hoverRotate = doodle.id % 2 === 0 ? '5deg' : '-4deg';
  
  return (
    <div
      className="absolute pointer-events-auto cursor-none z-0"
      style={{
        left: `${doodle.left}%`,
        top: `${doodle.top}%`,
        width: doodle.size,
        height: doodle.size,
        transform: `rotate(${doodle.rotation}deg)`,
        opacity: isLarge ? 0.15 : 0.35,
        '--doodle-opacity': isLarge ? '0.15' : '0.35',
        '--hover-rotate': hoverRotate,
        '--idle-dur': `${doodle.duration}s`,
        '--idle-delay': `${doodle.delay}s`,
        '--draw-delay': `${doodle.drawDelay}s`,
        '--path-length': '200',
      } as React.CSSProperties}
    >
      <div 
        className={`w-full h-full doodle-hover-interact doodle-svg-hidden ${doodle.idleClass}`}
        data-left={doodle.left}
        data-top={doodle.top}
        data-size={doodle.size}
      >
        {doodle.shape(doodle.color)}
      </div>
    </div>
  );
});

OrganicDoodle.displayName = 'OrganicDoodle';

export default function DoodleDecorations({ count = 45, className = '', seed = 42 }: { count?: number; className?: string; seed?: number; }) {
  const rand = seededRandom(seed);
  const containerRef = useRef<HTMLDivElement>(null);

  // Halve count on mobile to reduce paint cost (< 768px wide screens)
  const effectiveCount = typeof window !== 'undefined' && window.innerWidth < 768
    ? Math.ceil(count / 2)
    : count;

  const doodles = Array.from({ length: effectiveCount }, (_, i) => {
    const shapeIndex = Math.floor(rand() * doodleShapes.length);
    const colorIndex = Math.floor(rand() * doodleColors.length);
    const left = +(rand() * 95).toFixed(2);
    const top = +(rand() * 95).toFixed(2);
    const size = +(rand() > 0.8 ? 60 + rand() * 80 : 18 + rand() * 25).toFixed(1);
    const rotation = +(rand() * 360).toFixed(1);
    const delay = +(rand() * 6).toFixed(2);          // wider range for more variety
    const duration = +(6 + rand() * 8).toFixed(2);   // 6-14s range
    const idleClass = idleClasses[Math.floor(rand() * idleClasses.length)];
    const drawDelay = +(rand() * 0.6).toFixed(2);    // staggered draw-in

    return { id: i, shape: doodleShapes[shapeIndex], color: doodleColors[colorIndex], left, top, size, rotation, delay, duration, idleClass, drawDelay };
  });

  // IntersectionObserver: trigger SVG draw-in when container enters viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Swap doodle-svg-hidden → doodle-svg-drawn on all child SVG wrappers
            const svgWrappers = container.querySelectorAll('.doodle-svg-hidden');
            svgWrappers.forEach((el) => {
              el.classList.remove('doodle-svg-hidden');
              el.classList.add('doodle-svg-drawn');
            });
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only run on desktop (pointer: fine)
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    
    if (rafRef.current) return;

    const { clientX, clientY } = e;

    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) {
        rafRef.current = null;
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const doodleEls = container.querySelectorAll<HTMLElement>('.doodle-hover-interact');
      const reactionRadius = 120;
      const maxDisplace = 4;

      doodleEls.forEach((el) => {
        const leftPct = parseFloat(el.getAttribute('data-left') || '0');
        const topPct = parseFloat(el.getAttribute('data-top') || '0');
        const size = parseFloat(el.getAttribute('data-size') || '0');
        
        const cx = containerRect.left + (containerRect.width * leftPct / 100) + (size / 2);
        const cy = containerRect.top + (containerRect.height * topPct / 100) + (size / 2);
        
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < reactionRadius) {
          const strength = 1 - (dist / reactionRadius);
          const moveX = -(dx / dist) * maxDisplace * strength;
          const moveY = -(dy / dist) * maxDisplace * strength;
          const rotateReact = (dx > 0 ? -1 : 1) * 3 * strength;
          el.style.transform = `translate(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px) rotate(${rotateReact.toFixed(1)}deg)`;
          el.classList.add('doodle-cursor-react');
        } else if (el.classList.contains('doodle-cursor-react')) {
          el.style.transform = '';
          el.classList.remove('doodle-cursor-react');
        }
      });
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const doodleEls = container.querySelectorAll<HTMLElement>('.doodle-cursor-react');
    doodleEls.forEach((el) => {
      el.style.transform = '';
      el.classList.remove('doodle-cursor-react');
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} 
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ pointerEvents: 'auto' }}
    >
      {doodles.map(doodle => (
        <OrganicDoodle key={doodle.id} doodle={doodle} />
      ))}
    </div>
  );
}
