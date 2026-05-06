'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import TiltCard from './TiltCard';
import BouncyText from './BouncyText';
import CipherGame from './CipherGame';

const projects = [
  {
    title: 'DRM-based Secure File Encryption System',
    description: 'Enterprise-grade document management solution with hybrid AES/RSA cryptography, watermarking, and device-based access controls for sensitive aerospace operations.',
    longDescription: 'Architected and deployed for Hindustan Aeronautics Limited, this system integrates password/device-based access, expiry-driven controls, and comprehensive DRM features for protecting classified documents.',
    tags: ['Python', 'AES-256', 'RSA', 'Cryptography', 'DRM', 'Security'],
    github: 'https://github.com/Charan291005/DRM-Encryptor-and-Viewer',
    icon: '🔒',
    metrics: [
      'Hybrid AES/RSA encryption',
      'Watermarking & device binding',
      'Expiry-based access control',
    ],
    rotation: '-1deg',
  },
  {
    title: 'SecureImage: Hybrid Steganography System',
    description: 'Advanced desktop application combining AES-256-CBC encryption with LSB steganography for confidential image-based file hiding with zero data loss.',
    longDescription: 'Built with PBKDF2 key strengthening and efficient LSB techniques. Features user-friendly Tkinter GUI for file embedding/extraction with metadata tagging and error detection.',
    tags: ['Python', 'AES-256-CBC', 'LSB', 'Steganography', 'OpenCV', 'Tkinter'],
    icon: '🖼️',
    metrics: [
      '100k+ encode-decode cycles',
      'PSNR >50 dB quality',
      'Zero data loss validated',
    ],
    rotation: '1.5deg',
  },
  {
    title: 'Cyber Security Research Projects',
    description: 'Collection of cybersecurity research and practical implementations including network security tools, forensics utilities, and vulnerability assessments.',
    longDescription: 'Ongoing research in digital forensics, network security protocols, and penetration testing methodologies conducted during internship at MP Police and academic coursework.',
    tags: ['Network Security', 'Digital Forensics', 'Scapy', 'Linux', 'Security Analysis'],
    icon: '🔍',
    metrics: [
      'Cyber awareness sessions',
      'Security tool development',
      'Forensics analysis',
    ],
    rotation: '-0.5deg',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, rotate: project.rotation }}
              animate={isInView ? { opacity: 1, y: 0, rotate: project.rotation } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
            >
              <TiltCard
                className="card paper-fold notebook-holes relative"
                style={{ rotate: project.rotation } as React.CSSProperties}
                tiltStrength={12}
              >
                {/* Notebook ring holes */}
                <div className="absolute left-3 top-6 space-y-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full border-2 border-ink-light"
                      style={{ background: 'transparent' }}
                    />
                  ))}
                </div>

                {/* Content with left padding for holes */}
                <div className="pl-6">
                  {/* Icon with bounce hover */}
                  <motion.div
                    className="text-4xl mb-3 inline-block"
                    whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-ink mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-ink-light mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics — hand-drawn checkmarks */}
                  <div className="mb-4 space-y-2">
                    {project.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 text-xs text-ink-light"
                        whileHover={{ x: 6, color: '#2d2d2d' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <span className="text-crayon-green font-bold">✓</span>
                        <span>{metric}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tags — interactive bounce */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="doodle-tag text-xs"
                        whileHover={{
                          scale: 1.15,
                          rotate: i % 2 === 0 ? 5 : -5,
                          y: -4,
                          boxShadow: '3px 3px 0 rgba(0,0,0,0.12)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-pencil-blue hover:text-ink transition-colors flex items-center gap-1"
                        whileHover={{ x: 6, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        {'{ }'} View Code →
                      </motion.a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-ink-light mb-4 font-accent text-lg">
            Want to see more? Check out my GitHub for additional projects ↗
          </p>
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

      <div className="doodle-separator" />
    </section>
  );
}