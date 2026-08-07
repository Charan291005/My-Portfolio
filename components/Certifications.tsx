'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import BouncyText from './BouncyText';

const certifications = [
  {
    title: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    issuerIcon: '🪟',
    date: '2024',
    color: '#0078d4',
    bg: '#dbeafe',
    rotation: '-2deg',
    badge: 'AI-900',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    issuerIcon: '🌐',
    date: '2024',
    color: '#1ba0d7',
    bg: '#e0f2fe',
    rotation: '1.5deg',
    badge: 'CISCO',
  },
  {
    title: 'Python for Data Science',
    issuer: 'IBM / Coursera',
    issuerIcon: '🐍',
    date: '2023',
    color: '#054ada',
    bg: '#eff6ff',
    rotation: '-1deg',
    badge: 'IBM',
  },
  {
    title: 'Digital Forensics Essentials',
    issuer: 'EC-Council',
    issuerIcon: '🔍',
    date: '2024',
    color: '#dc2626',
    bg: '#fef2f2',
    rotation: '2deg',
    badge: 'DFE',
  },
  {
    title: 'Network Security Associate',
    issuer: 'Fortinet',
    issuerIcon: '🛡️',
    date: '2024',
    color: '#dc6220',
    bg: '#fff7ed',
    rotation: '-1.5deg',
    badge: 'NSA',
  },
  {
    title: 'Cryptography & Hashing',
    issuer: 'Udemy / Self-paced',
    issuerIcon: '🔐',
    date: '2023',
    color: '#7c3aed',
    bg: '#f5f3ff',
    rotation: '1deg',
    badge: '🏅',
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="section-container relative" ref={ref}>
      <DoodleDecorations count={8} seed={500} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="section-title">
          <BouncyText text="Certifications 🏆" hoverScale={1.1} />
        </h2>

        <p className="text-center text-ink-light font-accent text-lg mb-12 max-w-2xl mx-auto">
          Continuously leveling up skills through industry-recognized certifications ↓
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="relative"
              initial={{ opacity: 0, y: 40, rotate: cert.rotation }}
              animate={isInView ? { opacity: 1, y: 0, rotate: cert.rotation } : {}}
              transition={{ delay: 0.15 + index * 0.12, duration: 0.6, type: 'spring', stiffness: 150 }}
              whileHover={{
                rotate: '0deg',
                scale: 1.06,
                y: -14,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 12 },
              }}
            >
              {/* Polaroid card */}
              <div
                className="relative bg-white overflow-hidden"
                style={{
                  border: '3px solid #2d2d2d',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.12)',
                  borderRadius: '4px',
                  paddingBottom: '1rem',
                }}
              >
                {/* Colored photo area */}
                <div
                  className="h-28 flex items-center justify-center relative overflow-hidden"
                  style={{ background: cert.bg }}
                >
                  {/* Decorative pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, ${cert.color} 0px, ${cert.color} 1px, transparent 1px, transparent 8px)`,
                    }}
                  />

                  {/* Badge circle */}
                  <div
                    className="relative z-10 w-16 h-16 flex items-center justify-center font-heading font-bold text-lg rounded-full"
                    style={{
                      background: cert.color,
                      color: '#fff',
                      border: '3px solid rgba(255,255,255,0.8)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    {cert.badge}
                  </div>

                  {/* Issuer icon */}
                  <div className="absolute top-3 right-3 text-2xl">{cert.issuerIcon}</div>

                  {/* Tape strip at top */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 opacity-50"
                    style={{
                      background: 'rgba(255,255,176,0.9)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      transform: 'translateX(-50%) rotate(-1.5deg)',
                    }}
                  />
                </div>

                {/* Text area */}
                <div className="px-4 pt-4">
                  <h3
                    className="font-heading font-bold text-lg text-ink mb-1 leading-tight"
                    style={{ color: '#2d2d2d' }}
                  >
                    {cert.title}
                  </h3>

                  <div
                    className="flex items-center justify-between"
                  >
                    <span
                      className="font-accent text-sm font-bold"
                      style={{ color: cert.color }}
                    >
                      {cert.issuer}
                    </span>

                    <span
                      className="font-accent text-xs px-2 py-0.5"
                      style={{
                        background: cert.bg,
                        border: `1.5px solid ${cert.color}`,
                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                        color: cert.color,
                        fontWeight: 700,
                      }}
                    >
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun note */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div
            className="inline-block px-6 py-3"
            style={{
              background: '#fff176',
              border: '2.5px solid #2d2d2d',
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: '4px 4px 0 #2d2d2d',
              transform: 'rotate(-0.5deg)',
            }}
          >
            <p className="font-heading text-lg font-bold text-ink">
              📚 More certifications in progress — always learning! ✨
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="doodle-separator" />
    </section>
  );
}
