'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import InkSpots from './InkSpots';
import BouncyText from './BouncyText';

const experiences = [
  {
    title: 'AI Fluency Intern',
    company: 'FlyRank',
    location: '',
    period: 'July 2026 – September 2026',
    type: 'Current',
    typeColor: '#66bb6a',
    description: [
      'Evaluating AI-generated software modules against security, scalability, and compliance requirements.',
      'Reviewing AI-generated codebases to identify technical and quality issues.',
      'Assessing AI workflow reliability across production-oriented pipelines.',
      'Contributing to structured technical reviews and improving understanding of AI-assisted software development.',
    ],
    techStack: ['AI Workflows', 'Code Review', 'Compliance', 'Security Evaluation'],
    doodleIcon: '🤖',
    accentColor: '#4a90d9',
    side: 'left',
  },
  {
    title: 'Cybersecurity Intern',
    company: 'Madhya Pradesh Police',
    location: '',
    period: 'August 2024 – August 2025',
    type: 'Completed',
    typeColor: '#e0e0e0',
    description: [
      'Conducted cybersecurity awareness sessions covering phishing prevention, digital privacy, and cyber fraud protection.',
      'Assisted with educational initiatives promoting safe internet practices and cybercrime awareness.',
      'Supported public-facing cybersecurity awareness activities and helped explain basic cyber hygiene to non-technical audiences.',
    ],
    techStack: ['Cyber Awareness', 'Digital Privacy', 'Public Speaking'],
    doodleIcon: '🛡️',
    accentColor: '#e74c3c',
    side: 'right',
  },
  {
    title: 'Cybersecurity Intern',
    company: 'Hindustan Aeronautics Limited (HAL)',
    location: 'Helicopter Division, Bengaluru',
    period: 'May 2025 – June 2025',
    type: 'Completed',
    typeColor: '#e0e0e0',
    description: [
      'Developed a Digital Rights Management encryption system using AES-256 and RSA to secure sensitive defense documents.',
      'Implemented device authentication, watermarking, password protection, and expiry-based file access.',
      'Designed a protected document viewer for controlled access to encrypted digital assets.',
    ],
    techStack: ['Python', 'AES-256', 'RSA', 'DRM', 'Cryptography'],
    doodleIcon: '🔐',
    accentColor: '#ffb74d',
    side: 'left',
  },
];

const leadership = [
  {
    title: 'President',
    organization: 'Android Club, VIT Bhopal',
    description: 'Organized technical events and conducted workshops on Android development, mobile security, and app design for 100+ members.',
    emoji: '📱',
    noteStyle: 'sticky-note-green',
    rotation: -2,
    pin: '#e74c3c',
  },
  {
    title: 'Lead PR & Outreach',
    organization: 'The Fusion Club',
    description: 'Led outreach initiatives, managed event coordination, and built external partnerships across campus organizations.',
    emoji: '🎯',
    noteStyle: 'sticky-note-blue',
    rotation: 1.5,
    pin: '#4a90d9',
  },
  {
    title: 'Tech Volunteer',
    organization: 'Cyber Awareness Drive',
    description: 'Volunteered in district-level cybersecurity awareness programs, reaching 200+ citizens on safe internet practices.',
    emoji: '🌐',
    noteStyle: 'sticky-note',
    rotation: -1,
    pin: '#66bb6a',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-container relative" ref={ref}>
      <DoodleDecorations count={90} seed={150} />
      <InkSpots count={40} seed={1500} />

      <motion.div
        initial={{ opacity: 0, y: 25, rotate: -1, scale: 0.985 }}
        animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 80, damping: 14, mass: 0.8 }}
      >
        <h2 className="section-title">
          <BouncyText text="Work Experience 💼" hoverScale={1.1} />
        </h2>

        {/* Zig-Zag Timeline */}
        <div className="max-w-5xl mx-auto mb-20 relative z-10">
          {/* Central timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2" style={{ background: 'repeating-linear-gradient(to bottom, #2d2d2d 0px, #2d2d2d 8px, transparent 8px, transparent 16px)', opacity: 0.25 }} />

          {/* Mobile timeline line */}
          <svg className="absolute left-[22px] top-0 h-full w-[4px] md:hidden" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <motion.line
              x1="2" y1="0" x2="2" y2="100%"
              stroke="#2d2d2d" strokeWidth="2.5" strokeDasharray="8 6" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={`${exp.title}-${index}`}
                className={`relative flex items-center mb-16 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.9 }}
                transition={{ delay: 0.1 + index * 0.15, type: 'spring', stiffness: 100, damping: 10 }}
              >
                {/* Card — half width on desktop */}
                <div className="w-full md:w-[calc(50%-2.5rem)] pl-14 md:pl-0">
                  <motion.div
                    className="card notebook-holes relative overflow-hidden"
                    style={{ rotate: isLeft ? '0.5deg' : '-0.5deg' }}
                    whileHover={{
                      rotate: isLeft ? '-1.5deg' : '1.5deg',
                      scale: 1.03,
                      y: -8,
                      boxShadow: `8px 12px 0 rgba(0,0,0,0.15)`,
                      transition: { type: 'spring', stiffness: 300, damping: 15 },
                    }}
                  >
                    {/* Colored accent strip */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[4px]" style={{ background: exp.accentColor }} />

                    <div className="pt-3 pl-4 pr-4 pb-4">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-ink mb-0.5">{exp.title}</h3>
                          <div className="text-base font-body text-ink-light">🏢 {exp.company}</div>
                        </div>
                        {/* Type badge */}
                        <span
                          className="px-2.5 py-1 font-accent text-xs text-ink font-bold shrink-0"
                          style={{
                            background: exp.typeColor,
                            border: '2px solid rgba(0,0,0,0.1)',
                            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            transform: 'rotate(1.5deg)',
                          }}
                        >
                          {exp.type} ★
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 text-xs text-ink-faint mb-3 font-accent">
                        <span>📅 {exp.period}</span>
                        {exp.location && <span>📍 {exp.location}</span>}
                      </div>

                      {/* Description */}
                      <ul className="space-y-1.5 mb-4">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2 text-sm text-ink-light"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 + index * 0.2 + i * 0.1, duration: 0.4 }}
                          >
                            <span className="text-pencil-blue mt-0.5 font-bold shrink-0">→</span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-accent font-bold"
                            style={{
                              background: exp.accentColor + '20',
                              border: `1.5px solid ${exp.accentColor}`,
                              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                              color: exp.accentColor,
                            }}
                            whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 3 : -3 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Center dot — desktop only */}
                <motion.div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 items-center justify-center text-2xl z-10 shrink-0"
                  style={{
                    background: '#faf5e4',
                    border: '3px solid #2d2d2d',
                    borderRadius: '50%',
                    boxShadow: `4px 4px 0 ${exp.accentColor}`,
                  }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >
                  {exp.doodleIcon}
                </motion.div>

                {/* Mobile dot */}
                <motion.div
                  className="absolute left-[10px] top-4 text-2xl md:hidden"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >
                  {exp.doodleIcon}
                </motion.div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </div>

        {/* Leadership Section */}
        <motion.div
          initial={{ opacity: 0, y: 25, rotate: 1, scale: 0.985 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 14, mass: 0.8 }}
          className="relative z-10"
        >
          <h3 className="text-4xl font-heading font-bold text-center mb-10 text-ink">
            Leadership & Extracurriculars 🌟
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((role, index) => (
              <motion.div
                key={role.title}
                className={`${role.noteStyle} relative`}
                style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.12)' }}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -3 : 3 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: role.rotation } : {}}
                transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                whileHover={{
                  rotate: 0,
                  scale: 1.06,
                  y: -12,
                  zIndex: 10,
                  transition: { type: 'spring', stiffness: 300, damping: 12 },
                }}
              >
                {/* Pin */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-ink z-10 shadow-md"
                  style={{ background: role.pin }}
                />
                {/* Tape strip */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 opacity-40"
                  style={{
                    background: 'rgba(255,255,176,0.8)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    transform: 'translateX(-50%) rotate(-1deg)',
                  }}
                />

                <div className="text-3xl mb-2 mt-2">{role.emoji}</div>
                <div className="font-heading text-xl font-bold text-ink mb-1">{role.title}</div>
                <h4 className="text-base font-body font-bold text-ink-light mb-3">{role.organization}</h4>
                <p className="text-ink-light text-sm leading-relaxed">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="doodle-separator" />
    </section>
  );
}