'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import DoodleDecorations from './DoodleDecorations';
import TiltCard from './TiltCard';
import BouncyText from './BouncyText';
import CipherGame from './CipherGame';

const projects = [
  {
    title: 'NEXUS-DFI: Digital Forensics Intelligence Platform',
    description: 'AI-powered, enterprise-grade digital forensics case management and evidence intelligence platform for law enforcement and security teams.',
    longDescription: 'Full-stack React + FastAPI + SQLAlchemy app with secure REST APIs and case workflows. Manages 100+ evidence records with immutable audit logs and AI-assisted report generation. Enforces RBAC with multiple user roles and token-based backend verification to maintain least-privilege access.',
    tags: ['React', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Firebase Auth', 'Digital Forensics', 'AI'],
    github: 'https://github.com/Charan291005/NEXUS-DFI',
    icon: '🕵️‍♂️',
    category: 'Forensics',
    metrics: ['Immutable audit logs', 'AI report generation', 'RBAC & Least-privilege'],
    rotation: '-1deg',
    accentColor: '#4a90d9',
  },
  {
    title: 'DRM Application: Secure Document Rights Management',
    description: 'Python-based DRM system that protects engineering documents using AES-256/RSA encryption and Zero Trust access controls.',
    longDescription: 'Enforces AES-256 + RSA encryption over 50+ test documents for secure distribution. Integrates device binding and biometric-style authentication to block unauthorized access attempts. Uses expiry-based access and watermarking for multiple document sensitivity tiers under Zero Trust principles.',
    tags: ['Python', 'AES-256', 'RSA', 'Zero Trust', 'Cryptography', 'Desktop App'],
    github: 'https://github.com/Charan291005/DRM-APP',
    icon: '🔒',
    category: 'Security',
    metrics: ['AES-256/RSA Encryption', 'Device binding auth', 'Zero Trust expiry'],
    rotation: '1.5deg',
    accentColor: '#e74c3c',
  },
  {
    title: 'SecureImage: Hybrid Encrypted Steganography',
    description: 'Desktop GUI combining AES-256-CBC encryption with LSB steganography for confidential, lossless image-based data hiding.',
    longDescription: 'AES-256-CBC encryption layered with LSB steganography for secure communication. PBKDF2 key derivation (10,000+ iterations) to harden password-based security. Usability validated with 20+ users, achieving ~95% task success rate in encode/decode flows.',
    tags: ['Python', 'OpenCV', 'AES-256-CBC', 'PBKDF2', 'Steganography', 'Tkinter'],
    github: 'https://github.com/Charan291005/Secure-Image-',
    icon: '🖼️',
    category: 'Security',
    metrics: ['AES-256-CBC + LSB', '10,000+ PBKDF2 iterations', '~95% task success rate'],
    rotation: '-0.5deg',
    accentColor: '#66bb6a',
  },
  {
    title: 'HELIOS AI',
    description: 'Physical AI Proof-of-Concept for autonomous smart building operations using Qwen 2.5 LLM, MCP tool-calling, and EnergyPlus for real-time thermodynamic optimization.',
    longDescription: 'Autonomous HVAC control pipeline that injects optimized setpoints via MCP tool-calling and direct EnergyPlus model manipulation. Multi-objective optimization achieving 22.4% energy reduction and 34.8% cost savings while improving comfort by 16.6%. Robust safety architecture with strict ASHRAE bounds checking and graceful degradation to deterministic fallbacks.',
    tags: ['Python', 'FastAPI', 'React', 'Qwen 2.5 (LLM)', 'EnergyPlus', 'MCP'],
    github: 'https://github.com/Charan291005/HELIOS-AI',
    icon: '⚡',
    category: 'AI',
    metrics: ['22.4% energy reduction', '34.8% cost savings', 'Autonomous setpoint injection'],
    rotation: '1deg',
    accentColor: '#f1c40f',
  },
  {
    title: 'Obsidian SOC',
    description: 'Enterprise-grade, AI-powered Security Operations Workspace leveraging Google Gemini 2.5 Flash to transform raw security events into actionable intelligence.',
    longDescription: 'Automated ingestion and parsing of structured and unstructured log files (.json, .csv, .log, .txt). Autonomous log analysis and MITRE ATT&CK mapping via Gemini 2.5 Flash for proactive threat remediation. Role-based "Mission Control" dashboards serving both Analyst deep-dives and CEO-level executive risk assessments.',
    tags: ['React 19', 'FastAPI', 'Gemini 2.5 Flash', 'PostgreSQL', 'TailwindCSS', 'SOC'],
    github: 'https://github.com/Charan291005/OBSIDIAN-SOC',
    icon: '🛡️',
    category: 'Security',
    metrics: ['Automated log parsing', 'MITRE ATT&CK mapping', 'Dual Analyst/CEO personas'],
    rotation: '-1.5deg',
    accentColor: '#9c6ade',
  }
];

const categories = ['All', 'Security', 'Forensics', 'AI'];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-container relative" ref={ref}>
      <DoodleDecorations count={8} seed={200} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="section-title">
          <BouncyText text="Featured Projects 📝" hoverScale={1.1} />
        </h2>

        <CipherGame />

        {/* Category Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-5 py-2 font-heading text-lg font-bold transition-all"
              style={{
                background: activeCategory === cat ? '#fff176' : '#fff',
                border: '2.5px solid #2d2d2d',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: activeCategory === cat ? '4px 4px 0 #2d2d2d' : '2px 2px 0 rgba(0,0,0,0.1)',
                color: '#2d2d2d',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              animate={activeCategory === cat ? { rotate: [-1, 1, 0] } : { rotate: 0 }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.svg
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2"
                  viewBox="0 0 60 8"
                  preserveAspectRatio="none"
                  layoutId="tab-underline"
                >
                  <motion.path
                    d="M2,4 Q15,1 30,4 T58,4"
                    fill="none"
                    stroke="#e74c3c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.svg>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-7 mt-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 40, rotate: project.rotation }}
                animate={{ opacity: 1, y: 0, rotate: project.rotation }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TiltCard
                  className="card paper-fold notebook-holes relative h-full"
                  style={{ rotate: project.rotation } as React.CSSProperties}
                  tiltStrength={12}
                >
                  {/* Accent color strip */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[4px]" style={{ background: project.accentColor }} />

                  {/* Notebook ring holes */}
                  <div className="absolute left-3 top-6 space-y-5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-3 h-3 rounded-full border-2 border-ink-light" style={{ background: 'transparent' }} />
                    ))}
                  </div>

                  <div className="pl-6 pt-2 flex flex-col h-full">
                    <motion.div
                      className="text-4xl mb-3 inline-block"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.icon}
                    </motion.div>

                    <h3 className="text-lg font-heading font-bold text-ink mb-2 leading-tight">{project.title}</h3>
                    <p className="text-ink-light mb-3 text-sm leading-relaxed flex-1">{project.description}</p>

                    <div className="mb-3 space-y-1.5">
                      {project.metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 text-xs text-ink-light"
                          whileHover={{ x: 5, color: '#2d2d2d' }}
                        >
                          <span className="text-crayon-green font-bold">✓</span>
                          <span>{metric}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <motion.span
                          key={tag}
                          className="text-xs px-2 py-0.5 font-accent font-bold"
                          style={{
                            background: project.accentColor + '18',
                            border: `1.5px solid ${project.accentColor}`,
                            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            color: project.accentColor,
                          }}
                          whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 4 : -4 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex gap-3 items-center mt-auto">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading text-pencil-blue hover:text-ink transition-colors flex items-center gap-1 text-sm"
                          whileHover={{ x: 4, scale: 1.05 }}
                        >
                          {'{ }'} Code →
                        </motion.a>
                      )}
                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        className="font-heading text-sm font-bold ml-auto px-3 py-1"
                        style={{
                          background: project.accentColor,
                          border: '2px solid #2d2d2d',
                          borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                          boxShadow: '2px 2px 0 #2d2d2d',
                          color: '#fff',
                          cursor: 'pointer',
                        }}
                        whileHover={{ scale: 1.05, y: -2, boxShadow: '4px 4px 0 #2d2d2d' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Details ↗
                      </motion.button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-ink-light mb-4 font-accent text-lg">Want to see more? Check out my GitHub for additional projects ↗</p>
          <motion.a
            href="https://github.com/Charan291005"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ rotate: -1, scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {'{ }'} View GitHub Profile
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />

            {/* Paper modal */}
            <motion.div
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: '#faf5e4',
                border: '3px solid #2d2d2d',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: '12px 12px 0 rgba(0,0,0,0.25)',
                backgroundImage: 'linear-gradient(rgba(74,144,217,0.04) 1px, transparent 1px)',
                backgroundSize: '100% 28px',
              }}
              initial={{ scale: 0.7, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.7, rotate: 5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent strip */}
              <div className="h-2 rounded-t-[inherit]" style={{ background: selectedProject.accentColor }} />

              <div className="p-8">
                {/* Close button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center font-heading text-xl font-bold"
                  style={{
                    border: '2.5px solid #2d2d2d',
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '2px 2px 0 #2d2d2d',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>

                <div className="text-5xl mb-4">{selectedProject.icon}</div>
                <h3 className="text-3xl font-heading font-bold text-ink mb-4">{selectedProject.title}</h3>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-3 py-1 font-accent text-sm font-bold"
                    style={{
                      background: selectedProject.accentColor + '25',
                      border: `2px solid ${selectedProject.accentColor}`,
                      borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                      color: selectedProject.accentColor,
                    }}
                  >
                    {selectedProject.category}
                  </span>
                </div>

                <p className="text-ink-light text-lg leading-relaxed mb-6">{selectedProject.longDescription}</p>

                <h4 className="font-heading text-xl font-bold text-ink mb-3">Key Metrics ✓</h4>
                <div className="space-y-2 mb-6">
                  {selectedProject.metrics.map((m, i) => (
                    <motion.div key={i} className="flex items-center gap-3" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <span className="text-crayon-green font-bold text-lg">✓</span>
                      <span className="text-ink-light">{m}</span>
                    </motion.div>
                  ))}
                </div>

                <h4 className="font-heading text-xl font-bold text-ink mb-3">Tech Stack 🛠️</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 font-accent text-sm font-bold"
                      style={{
                        background: selectedProject.accentColor + '18',
                        border: `2px solid ${selectedProject.accentColor}`,
                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                        color: selectedProject.accentColor,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 4 : -4 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {selectedProject.github && (
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                    whileHover={{ rotate: -1, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {'{ }'} View Source Code →
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="doodle-separator" />
    </section>
  );
}