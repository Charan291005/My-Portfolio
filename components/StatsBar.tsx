'use client';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';

const stats = [
  { value: 5, suffix: '+', label: 'Projects Built', icon: '🚀', color: '#fff176' },
  { value: 2, suffix: '', label: 'Internships', icon: '💼', color: '#f48fb1' },
  { value: 8.7, suffix: '', label: 'CGPA at VIT', icon: '🎓', color: '#bbdefb', isFloat: true },
  { value: 3, suffix: '+', label: 'Certifications', icon: '🏆', color: '#c8e6c9' },
  { value: 500, suffix: '+', label: 'Hours of Code', icon: '⌨️', color: '#ffb74d' },
];

function Counter({
  value,
  suffix,
  isFloat,
  trigger,
}: {
  value: number;
  suffix: string;
  isFloat?: boolean;
  trigger: boolean;
}) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 15 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (trigger) {
      motionVal.set(value);
    }
  }, [trigger, value, motionVal]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = isFloat
          ? v.toFixed(1)
          : Math.round(v).toString();
      }
    });
    return unsubscribe;
  }, [spring, isFloat]);

  return (
    <span ref={ref}>
      {isFloat ? (0).toFixed(1) : '0'}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative z-10 py-4 overflow-hidden">
      {/* Notebook ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(74,144,217,0.06) 1px, transparent 1px)',
          backgroundSize: '100% 32px',
        }}
      />

      {/* Top & bottom hand-drawn borders */}
      <svg className="absolute top-0 left-0 w-full" height="6" viewBox="0 0 1200 6" preserveAspectRatio="none">
        <path d="M0,3 Q100,0 200,3 T400,3 T600,3 T800,3 T1000,3 T1200,3" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.3" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full" height="6" viewBox="0 0 1200 6" preserveAspectRatio="none">
        <path d="M0,3 Q100,6 200,3 T400,3 T600,3 T800,3 T1000,3 T1200,3" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.3" />
      </svg>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative text-center"
              initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
              whileHover={{ 
                scale: 1.15, 
                rotate: [0, 5, -5, 3, -2, 0], 
                y: -5, 
                zIndex: 10,
                transition: { duration: 0.8, ease: "easeInOut" }
              }}
            >
              {/* Sticky note card */}
              <div
                className="px-4 py-5 relative"
                style={{
                  background: stat.color,
                  border: '2.5px solid rgba(0,0,0,0.12)',
                  borderRadius: '3px',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.12)',
                }}
              >
                {/* Pin decoration */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-ink z-10"
                  style={{ background: '#e74c3c', boxShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}
                />

                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="font-heading font-bold text-3xl text-ink tabular-nums">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    isFloat={stat.isFloat}
                    trigger={isInView}
                  />
                  <span>{stat.suffix}</span>
                </div>
                <div className="font-accent text-xs text-ink-light mt-1 leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
