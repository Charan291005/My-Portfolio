'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import DoodleDecorations from './DoodleDecorations';
import InkSpots from './InkSpots';
import MagneticWrapper from './MagneticWrapper';
import BouncyText from './BouncyText';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: '⌨️',
    skills: ['Python', 'SQL', 'JavaScript', 'HTML/CSS'],
    noteStyle: 'sticky-note',
    rotation: '-1.5deg',
  },
  {
    title: 'Cybersecurity & Cryptography',
    icon: '🛡️',
    skills: ['AES-256', 'RSA', 'Steganography', 'DRM Systems', 'Network Security', 'Digital Forensics'],
    noteStyle: 'sticky-note-pink',
    rotation: '1deg',
  },
  {
    title: 'Tools & Technologies',
    icon: '🔧',
    skills: ['Git', 'Linux', 'Azure', 'Android Studio', 'Jupyter Notebook', 'Scapy'],
    noteStyle: 'sticky-note-blue',
    rotation: '-0.5deg',
  },
  {
    title: 'Libraries & Frameworks',
    icon: '📚',
    skills: ['OpenCV', 'Tkinter', 'NumPy', 'Pandas', 'Scikit-learn'],
    noteStyle: 'sticky-note-green',
    rotation: '2deg',
  },
  {
    title: 'Domains & Expertise',
    icon: '🧠',
    skills: ['Machine Learning', 'Web Development', 'Software Engineering', 'IoT Security'],
    noteStyle: 'sticky-note',
    rotation: '1.5deg',
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: ['Azure', 'CI/CD', 'Docker Basics', 'Cloud Security', 'System Architecture'],
    noteStyle: 'sticky-note-blue',
    rotation: '-2deg',
  },
];

const coreSkills = [
  { 
    name: 'Cryptography & Secure Systems', 
    color: '#4a90d9',
    tech: 'AES-256, RSA Encryption, PBKDF2, Steganography, DRM Security Systems'
  },
  { 
    name: 'Python Development', 
    color: '#66bb6a',
    tech: 'Python, Tkinter, OpenCV, Scapy, Jupyter Notebook'
  },
  { 
    name: 'Digital Forensics', 
    color: '#e74c3c',
    tech: 'Digital evidence handling, forensic investigation concepts, cyber awareness, and security analysis'
  },
  { 
    name: 'Network Security', 
    color: '#ffb74d',
    tech: 'Network security fundamentals, packet analysis, cyber threats, phishing prevention, and digital privacy'
  },
  { 
    name: 'Secure File Protection', 
    color: '#9c6ade',
    tech: 'Encryption, password protection, watermarking, device authentication, protected document viewing, and expiry-based access control'
  },
  { 
    name: 'Applied Machine Learning', 
    color: '#f48fb1',
    tech: 'Foundational machine learning concepts and practical experimentation through academic and personal projects'
  },
];

const learningNow = ['Web3 Security', 'Rust', 'Blockchain', 'Malware Analysis', 'CTF Competitions'];

function RadialSkill({ skill, index, trigger }: { skill: typeof coreSkills[0]; index: number; trigger: boolean }) {
  const r = 38;
  const circumference = 2 * Math.PI * r;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 relative group"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={trigger ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.4 + index * 0.12, duration: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -8, scale: 1.08 }}
    >
      <div className="relative w-24 h-24 cursor-help">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <motion.circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke={skill.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={trigger ? { strokeDashoffset: 0 } : {}}
            transition={{ delay: 0.6 + index * 0.12, duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${skill.color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl"
            initial={{ opacity: 0 }}
            animate={trigger ? { opacity: 1 } : {}}
            transition={{ delay: 1 + index * 0.12 }}
          >
            ⚡
          </motion.span>
        </div>
      </div>
      <span className="font-heading font-bold text-sm text-center text-ink leading-tight max-w-[120px]">
        {skill.name}
      </span>
      
      {/* Tooltip */}
      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-4 w-48 p-3 bg-[#2d2d2d] text-white text-xs font-accent rounded-md shadow-[4px_4px_0_rgba(0,0,0,0.15)] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 text-center border-2 border-white">
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-[#2d2d2d]"></div>
        {skill.tech}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  return (
    <section id="skills" className="section-container relative" ref={ref}>
      <DoodleDecorations count={110} seed={400} />
      <InkSpots count={50} seed={4040} />

      <motion.div
        initial={{ opacity: 0, y: 25, rotate: -1, scale: 0.985 }}
        animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 80, damping: 14, mass: 0.8 }}
        className="relative z-10"
      >
        <h2 className="section-title">
          <BouncyText text="Technical Skills 🎯" hoverScale={1.1} />
        </h2>

        {/* Skills Grid — Expandable Sticky Notes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const isExpanded = expandedNote === category.title;
            return (
              <motion.div
                key={category.title}
                className={`${category.noteStyle} cursor-pointer`}
                style={{ rotate: isExpanded ? '0deg' : category.rotation }}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 140, damping: 10 }}
                whileHover={{
                  rotate: '0deg',
                  scale: isExpanded ? 1 : 1.05,
                  y: -8,
                  zIndex: 10,
                  transition: { type: 'spring', stiffness: 300, damping: 12 },
                }}
                onClick={() => setExpandedNote(isExpanded ? null : category.title)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-lg font-heading font-bold text-ink">{category.title}</h3>
                  </div>
                  <motion.span
                    className="font-heading text-xl font-bold text-ink-light"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                  >
                    ↓
                  </motion.span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="doodle-tag text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 + i * 0.05, duration: 0.3 }}
                      whileHover={{ rotate: i % 2 === 0 ? 4 : -4, scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {isExpanded && (
                  <motion.p
                    className="mt-3 text-sm text-ink-light font-accent border-t border-dashed border-ink-faint pt-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    {index % 2 === 0
                      ? 'Applied extensively in academic projects and professional internships. Continuously improving through practical implementation.'
                      : 'Core part of my toolkit used in real-world deployments for HAL and MP Police cybersecurity work.'}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Core Competencies — Radial Meters */}
        <motion.div
          className="max-w-5xl mx-auto relative z-10 mb-16"
          initial={{ opacity: 0, y: 20, rotate: 1, scale: 0.985 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 14 }}
        >
          <h3 className="text-4xl font-heading font-bold text-center mb-4 text-ink">
            Core Competencies ⚡
          </h3>
          <p className="text-center text-ink-light font-accent text-md mb-10 max-w-3xl mx-auto">
            Hands-on experience in Python-based security projects, cryptography, secure file protection, digital forensics, and practical cybersecurity awareness.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {coreSkills.map((skill, index) => (
              <RadialSkill key={skill.name} skill={skill} index={index} trigger={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Currently Learning Banner */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div
            className="px-6 py-5 text-center"
            style={{
              background: '#f0e6c8',
              border: '3px solid #2d2d2d',
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: '5px 5px 0 #2d2d2d',
            }}
          >
            <p className="font-heading text-xl font-bold text-ink mb-3">
              🌱 Currently Learning & Exploring
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {learningNow.map((item, i) => (
                <MagneticWrapper key={item} strength={15}>
                  <motion.span
                    className="px-4 py-1.5 font-accent text-sm font-bold"
                    style={{
                      background: ['#fff176', '#f48fb1', '#bbdefb', '#c8e6c9', '#ffb74d'][i % 5],
                      border: '2.5px solid #2d2d2d',
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.12)',
                      display: 'inline-block',
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.3 + i * 0.1, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 4 : -4, y: -4 }}
                  >
                    {item}
                  </motion.span>
                </MagneticWrapper>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="doodle-separator" />
    </section>
  );
}