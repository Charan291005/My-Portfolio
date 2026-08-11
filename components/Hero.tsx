'use client';
import { motion } from 'framer-motion';
import DoodleDecorations from './DoodleDecorations';
import MagneticWrapper from './MagneticWrapper';
import BouncyText from './BouncyText';

const heroSocials = [
  { href: 'https://github.com/Charan291005', label: '{ }', title: 'GitHub', color: '#24292e' },
  { href: 'https://linkedin.com/in/shree-charan-n', label: 'in', title: 'LinkedIn', color: '#0077b5' },
  { href: 'https://www.reddit.com/user/Psychological_Hat29/', label: 'r/', title: 'Reddit', color: '#ff4500' },
  { href: 'https://medium.com/@shreecharan', label: 'M', title: 'Medium', color: '#000' },
  { href: 'mailto:shreecharan5277443@gmail.com', label: '✉', title: 'Email', color: '#e74c3c' },
];

const roles = [
  'Cybersecurity Engineer',
  'Python Developer',
  'Digital Forensics Expert',
  'CTF Enthusiast',
  'Cryptography Nerd',
];

export default function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#faf6ec',
        backgroundImage: 'radial-gradient(rgba(26,26,26,0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
      }}
    >
      <DoodleDecorations count={45} seed={42} />

      {/* Decorative large scribble doodles */}
      <motion.svg
        className="absolute top-16 right-8 w-36 h-36 opacity-[0.07] hidden lg:block"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 50, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <path d="M50,10 L61,35 L90,35 L67,52 L76,80 L50,63 L24,80 L33,52 L10,35 L39,35 Z" fill="none" stroke="#4a90d9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>

      <motion.svg
        className="absolute top-32 left-8 w-28 h-28 opacity-[0.06] hidden lg:block"
        viewBox="0 0 100 100"
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M50,5 Q95,25 85,50 Q95,75 50,95 Q5,75 15,50 Q5,25 50,5 Z" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>

      <motion.svg
        className="absolute bottom-28 left-12 w-20 h-20 opacity-[0.06] hidden lg:block"
        viewBox="0 0 80 80"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M14,5 L6,40 L14,75 M66,5 L74,40 L66,75" fill="none" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />
      </motion.svg>

      <motion.svg
        className="absolute bottom-40 right-16 w-24 h-24 opacity-[0.06] hidden lg:block"
        viewBox="0 0 100 100"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M20,50 Q20,14 50,14 Q80,14 80,50 Q80,86 50,86 Q20,86 20,50" fill="none" stroke="#66bb6a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M35,50 L50,35 L65,50 L50,65 Z" fill="none" stroke="#66bb6a" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>

      {/* Floating ink blobs */}
      {[
        { cx: '15%', cy: '20%', r: 180, color: '#4a90d9', delay: 0 },
        { cx: '85%', cy: '70%', r: 220, color: '#e74c3c', delay: 2 },
        { cx: '70%', cy: '15%', r: 150, color: '#66bb6a', delay: 4 },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{
            left: blob.cx,
            top: blob.cy,
            width: blob.r,
            height: blob.r,
            background: `radial-gradient(circle, ${blob.color}08 0%, transparent 70%)`,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: blob.delay }}
        />
      ))}

      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* Bold Hatched Headline & Subline */}
          <div className="relative inline-block mb-12 max-w-[100vw] px-4 py-8">
            <motion.h1 
              className="font-display font-bold text-ink leading-tight mb-3 tracking-wide flex flex-wrap justify-center gap-x-3 gap-y-2" 
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                }
              }}
            >
              {['Shree', 'Charan', 'N'].map((word, i) => (
                <motion.span
                  key={word}
                  className="hatched-text inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 40, rotate: -4 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      rotate: 0,
                      transition: { type: 'spring', damping: 14, stiffness: 150 }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: i % 2 === 0 ? 3 : -3, 
                    transition: { type: 'spring', stiffness: 300 } 
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="font-heading text-ink-light" 
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Cybersecurity Engineer <span className="text-pencil-red opacity-80 mx-1">&</span> Python Developer
            </motion.p>

            {/* Doodles positioned around text */}
            <motion.svg
              className="absolute -top-4 -left-8 w-12 h-12 text-ink opacity-40 pointer-events-none"
              viewBox="0 0 100 100"
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 0.4, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              {/* Star-burst / sparkle */}
              <path d="M50,10 L50,30 M50,70 L50,90 M10,50 L30,50 M70,50 L90,50 M25,25 L40,40 M60,60 L75,75 M25,75 L40,60 M60,40 L75,25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </motion.svg>

            <motion.svg
              className="absolute top-2 -right-4 w-10 h-10 text-pencil-blue opacity-50 pointer-events-none"
              viewBox="0 0 100 100"
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={{ opacity: 0.5, scale: 1, rotate: 10 }}
              transition={{ delay: 0.6, type: 'spring' }}
            >
              {/* 5-point star */}
              <path d="M50,10 L61,35 L90,35 L67,52 L76,80 L50,63 L24,80 L33,52 L10,35 L39,35 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>

            <motion.svg
              className="absolute -bottom-6 -left-2 w-14 h-14 text-marker-red opacity-40 pointer-events-none"
              viewBox="0 0 100 100"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 0.4, scale: 1, rotate: -5 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              {/* Squiggly line / pencil */}
              <path d="M10,80 Q25,60 40,80 T70,60 T90,80" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </motion.svg>
          </div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center flex-wrap gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            {heroSocials.map((link, i) => (
              <MagneticWrapper key={link.title} strength={20}>
                <motion.a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-14 h-14 flex items-center justify-center font-heading text-xl relative"
                  whileHover={{ scale: 1.2, rotate: 8, boxShadow: `4px 4px 0 ${link.color}` }}
                  whileTap={{ scale: 0.9 }}
                  title={link.title}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.6 + i * 0.08, type: 'spring', stiffness: 300 }}
                  style={{
                    border: `3px solid ${link.color}`,
                    borderRadius: '50% 45% 55% 48% / 45% 55% 48% 50%',
                    color: link.color,
                    background: '#fff',
                    boxShadow: `3px 3px 0 ${link.color}`,
                    fontWeight: 700,
                  }}
                >
                  {link.label}
                </motion.a>
              </MagneticWrapper>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9, duration: 0.6 }}
          >
            <MagneticWrapper strength={30}>
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ rotate: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✏️ View My Work
              </motion.a>
            </MagneticWrapper>

            <MagneticWrapper strength={30}>
              <motion.a
                href="#contact"
                className="btn-secondary"
                whileHover={{ rotate: 2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📮 Get In Touch
              </motion.a>
            </MagneticWrapper>

            {/* Resume Download Button — plain <a> tag to guarantee download */}
            <a
              href="/Shree_Charan_Resume.pdf"
              download="Shree_Charan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-7 py-[0.85rem] font-heading text-[1.3rem] font-bold text-white transition-transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #4a90d9, #6a5acd)',
                border: '3px solid #2d2d2d',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: '4px 4px 0 #2d2d2d',
                textDecoration: 'none',
              }}
            >
              📄 Download Resume
            </a>
          </motion.div>

          {/* Availability status — clean, centered, subtle */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3, duration: 0.6 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500 inline-block"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-accent text-sm text-ink-faint">
              Available for internships, full-time & freelance roles
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MagneticWrapper strength={15}>
            <a href="#about" className="font-heading text-2xl text-ink-light hover:text-ink transition-colors block p-4">
              <svg viewBox="0 0 30 40" className="w-8 h-10">
                <path d="M15,5 L15,30 M8,23 L15,32 L22,23" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  );
}