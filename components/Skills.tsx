'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import MagneticWrapper from './MagneticWrapper';
import BouncyText from './BouncyText';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: '⌨️',
    skills: ['Python', 'Java', 'C++', 'SQL', 'JavaScript', 'HTML/CSS'],
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
    skills: ['OpenCV', 'Tkinter', 'NumPy', 'Pandas', 'Scikit-learn', 'JDBC'],
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
  { name: 'Cryptography & Security', level: 95 },
  { name: 'Python Development', level: 90 },
  { name: 'Java & C++', level: 85 },
  { name: 'Digital Forensics', level: 88 },
  { name: 'Web Development', level: 80 },
  { name: 'Machine Learning', level: 75 },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-container relative" ref={ref}>
      <DoodleDecorations count={12} seed={400} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="section-title">
          <BouncyText text="Technical Skills 🎯" hoverScale={1.1} />
        </h2>

        {/* Skills Grid — Sticky Notes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className={category.noteStyle}
              style={{ rotate: category.rotation }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ 
                rotate: '0deg', 
                scale: 1.1, 
                y: -12, 
                zIndex: 10,
                boxShadow: '8px 12px 15px rgba(0,0,0,0.2)',
                transition: { type: 'spring', stiffness: 300, damping: 12 }
              }}
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-lg font-heading font-bold text-ink">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="doodle-tag text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 + i * 0.05, duration: 0.3 }}
                    whileHover={{ rotate: Math.random() > 0.5 ? 4 : -4, scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Competencies — Hand-drawn Progress Bars */}
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-4xl font-heading font-bold text-center mb-10 text-ink">
            Core Competencies ⚡
          </h3>

          <div className="space-y-7">
            {coreSkills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-heading text-xl font-bold text-ink">{skill.name}</span>
                  <span className="font-accent text-pencil-blue font-bold">{skill.level}%</span>
                </div>
                <div
                  className="h-6 relative"
                  style={{
                    border: '2.5px solid #2d2d2d',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    background: '#fff',
                  }}
                >
                  <motion.div
                    className="h-full relative"
                    style={{
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                      background: `repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 4px,
                        rgba(74,144,217,0.15) 4px,
                        rgba(74,144,217,0.15) 8px
                      )`,
                      backgroundColor: index % 2 === 0 ? '#fff176' : '#bbdefb',
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay: 1 + index * 0.12, duration: 1, ease: 'easeOut' }}
                  />
                  {/* Hand-drawn hatching overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M0,20 L10,0 M10,20 L20,0 M20,20 L30,0 M30,20 L40,0 M40,20 L50,0 M50,20 L60,0 M60,20 L70,0 M70,20 L80,0 M80,20 L90,0 M90,20 L100,0 M100,20 L110,0 M110,20 L120,0 M120,20 L130,0 M130,20 L140,0 M140,20 L150,0 M150,20 L160,0 M160,20 L170,0 M170,20 L180,0 M180,20 L190,0 M190,20 L200,0" stroke="#2d2d2d" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="doodle-separator" />
    </section>
  );
}