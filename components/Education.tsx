'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import BouncyText from './BouncyText';

const education = [
  {
    degree: 'B.Tech in Computer Science Engineering',
    specialization: 'Cyber Security & Digital Forensics',
    institution: 'VIT Bhopal University',
    location: 'Sehore, Madhya Pradesh',
    period: 'Aug 2023 – May 2027',
    cgpa: '8.7',
    icon: '🎓',
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'Narayana E-Techno School, Thubarahalli',
    location: 'Bengaluru, Karnataka',
    period: 'Apr 2023',
    percentage: '76.4%',
    icon: '📖',
  },
  {
    degree: 'Secondary (10th)',
    institution: 'Narayana E-Techno School, Whitefield',
    location: 'Bengaluru, Karnataka',
    period: 'Mar 2021',
    percentage: '86.8%',
    icon: '✏️',
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="section-container relative" ref={ref}>
      <DoodleDecorations count={20} seed={500} />
      
      <motion.div
        initial={{ opacity: 0, y: 25, rotate: -1, scale: 0.985 }}
        animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 80, damping: 14, mass: 0.8 }}
        className="relative z-10"
      >
        <h2 className="section-title">
          <BouncyText text="Education 🎓" hoverScale={1.1} />
        </h2>

        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-4xl font-heading font-bold text-center mb-10 text-ink">Academic Background 🏫</h3>

          <div className="relative">
            <svg className="absolute left-[18px] top-0 h-full w-[4px]" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <motion.line x1="2" y1="0" x2="2" y2="100%" stroke="#2d2d2d" strokeWidth="2.5" strokeDasharray="8 6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1.5 }} />
            </svg>

            {education.map((edu, index) => (
              <motion.div key={edu.degree} className="relative pl-14 pb-12 last:pb-0" initial={{ opacity: 0, x: -40, scale: 0.9 }} animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.95 }} transition={{ delay: 0.1 + index * 0.15, type: 'spring', stiffness: 120, damping: 10 }}>
                <motion.div className="absolute left-[6px] top-2 text-2xl" whileHover={{ scale: 1.3 }}>{edu.icon}</motion.div>
                <div className="card">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <div>
                      <h4 className="text-2xl font-heading font-bold text-ink mb-1">{edu.degree}</h4>
                      {edu.specialization && <p className="text-lg font-accent text-pencil-blue font-bold mb-2">↳ {edu.specialization}</p>}
                      <p className="text-ink-light">🏛️ {edu.institution}</p>
                      <p className="text-sm text-ink-faint">📍 {edu.location}</p>
                    </div>
                    {(edu.cgpa || edu.percentage) && (
                      <motion.div className="flex items-center justify-center w-20 h-20 relative" whileHover={{ scale: 1.1, rotate: 10 }}>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                          <motion.path d="M40,5 Q65,5 72,20 Q80,35 72,55 Q65,72 40,75 Q15,72 8,55 Q2,35 8,20 Q15,5 40,5 Z" fill="#fff176" stroke="#2d2d2d" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }} />
                        </svg>
                        <span className="relative font-heading font-bold text-ink text-sm z-10">{edu.cgpa ? edu.cgpa : edu.percentage}</span>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-ink-faint font-accent">📅 {edu.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="text-center mt-14" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, duration: 0.6 }}>
          <a
            href="/Shree_Charan_Resume.pdf"
            download="Shree_Charan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 transition-transform hover:scale-105 hover:-translate-y-1"
          >
            📄 Download Full Resume
          </a>
        </motion.div>
      </motion.div>
      <div className="doodle-separator" />
    </section>
  );
}