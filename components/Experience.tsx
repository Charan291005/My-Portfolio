'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import BouncyText from './BouncyText';

const experiences = [
  {
    title: 'IT Intern - Cybersecurity',
    company: 'Hindustan Aeronautics Limited (HAL)',
    location: '📍 Bengaluru, Karnataka',
    period: '📅 May 2025 – June 2025',
    description: [
      'Developed DRM-based encryption system using AES-256 and RSA for securing digital assets',
      'Integrated expiry controls, watermarking, and device-based protections',
      'Built secure document management solution for sensitive aerospace operations',
    ],
    doodleIcon: '🔐',
    tagColor: 'bg-marker-yellow',
  },
  {
    title: 'Student Intern',
    company: 'Madhya Pradesh Police',
    location: '📍 Bhopal, Madhya Pradesh',
    period: '📅 Aug 2024 – Present',
    description: [
      'Conducted comprehensive cyber awareness sessions for law enforcement personnel',
      'Educated officers on digital security threats and best practices',
      'Contributed to enhancing cybersecurity awareness in government sector',
    ],
    doodleIcon: '🔍',
    tagColor: 'bg-marker-pink',
  },
];

const leadership = [
  {
    title: 'General Secretary',
    organization: 'Android Club, VIT Bhopal',
    description: 'Organized events and conducted workshops on Android development',
    emoji: '📱',
    noteStyle: 'sticky-note-green',
  },
  {
    title: 'Co-Lead PR and Outreach',
    organization: 'The Fusion Club',
    description: 'Led outreach initiatives and managed event coordination',
    emoji: '🎯',
    noteStyle: 'sticky-note-blue',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-container relative" ref={ref}>
      <DoodleDecorations count={12} seed={150} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <BouncyText text="Work Experience 💼" hoverScale={1.1} />
        </h2>

        {/* Professional Experience Timeline — hand-drawn */}
        <div className="max-w-4xl mx-auto mb-20 relative z-10">
          {/* Hand-drawn timeline line */}
          <svg
            className="absolute left-[18px] top-0 h-full w-[4px]"
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <motion.line
              x1="2" y1="0" x2="2" y2="100%"
              stroke="#2d2d2d"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className="relative pl-14 pb-14 last:pb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.25, duration: 0.6 }}
            >
              {/* Timeline doodle dot */}
              <motion.div
                className="absolute left-[6px] top-2 text-2xl"
                whileHover={{ scale: 1.3, rotate: 15 }}
              >
                {exp.doodleIcon}
              </motion.div>

              <motion.div
                className="card notebook-holes"
                style={{ rotate: index % 2 === 0 ? '0.5deg' : '-0.5deg' }}
                whileHover={{ 
                  rotate: index % 2 === 0 ? '-1.5deg' : '1.5deg', 
                  scale: 1.05, 
                  y: -10, 
                  boxShadow: '12px 15px 0 rgba(0,0,0,0.15)',
                  transition: { type: 'spring', stiffness: 300, damping: 15 }
                }}
              >
                <div className="flex flex-wrap items-start justify-between mb-4 pl-4">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-ink mb-1">
                      {exp.title}
                    </h3>
                    <div className="text-lg font-body text-ink-light mb-1">
                      🏢 {exp.company}
                    </div>
                  </div>
                  <span
                    className={`${exp.tagColor} px-3 py-1 font-accent text-sm text-ink`}
                    style={{ transform: 'rotate(1deg)' }}
                  >
                    Current ★
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-ink-faint mb-4 pl-4">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>

                <ul className="space-y-2 pl-4">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-ink-light"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.2 + i * 0.1, duration: 0.4 }}
                    >
                      <span className="text-pencil-blue mt-0.5">→</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Leadership Section — Sticky notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10"
        >
          <h3 className="text-4xl font-heading font-bold text-center mb-8 text-ink">
            Leadership & Extracurriculars 🌟
          </h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((role, index) => (
              <motion.div
                key={role.title}
                className={role.noteStyle}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -3 : 3 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1.5 } : {}}
                transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                whileHover={{ rotate: 0, scale: 1.05, y: -10, boxShadow: '8px 12px 15px rgba(0,0,0,0.2)', zIndex: 10, transition: { type: 'spring', stiffness: 300, damping: 12 } }}
              >
                <div className="text-3xl mb-2">{role.emoji}</div>
                <div className="font-heading text-xl font-bold text-ink mb-1">
                  {role.title}
                </div>
                <h4 className="text-lg font-body font-bold text-ink-light mb-2">
                  {role.organization}
                </h4>
                <p className="text-ink-light text-sm">
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="doodle-separator" />
    </section>
  );
}