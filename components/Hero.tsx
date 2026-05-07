'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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

export default function Hero() {
  const fullName = 'Shree Charan N';
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [revealStyle, setRevealStyle] = useState<'none' | 'drop' | 'pop'>('none');

  useEffect(() => {
    // Pick a random effect on client mount
    const effects: ('typewriter' | 'drop' | 'pop')[] = ['typewriter', 'drop', 'pop'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];

    if (randomEffect === 'typewriter') {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullName.length) {
          setDisplayText(fullName.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 120);
      return () => clearInterval(timer);
    } else {
      // Set full text immediately for framer-motion variant animation
      setDisplayText(fullName);
      setRevealStyle(randomEffect);
      setTimeout(() => setShowCursor(false), 2000);
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <DoodleDecorations count={18} seed={42} />

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

      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Name with typewriter */}
          <div className="relative inline-block mb-4 max-w-[100vw] px-4">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-ink relative z-10 flex flex-wrap items-center justify-center">
              <BouncyText text={displayText} hoverScale={1.15} baseRotate={8} revealAnimation={revealStyle} />
              {showCursor && <span className="typewriter-cursor" />}
            </h1>

            {/* Sparkle decoration */}
            <motion.svg
              className="absolute -top-6 -right-12 w-16 h-16 text-pencil-blue opacity-50"
              viewBox="0 0 100 100"
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 2.2, type: "spring" }}
            >
              <path d="M50,10 L50,30 M50,70 L50,90 M10,50 L30,50 M70,50 L90,50 M25,25 L40,40 M60,60 L75,75 M25,75 L40,60 M60,40 L75,25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </motion.svg>
          </div>

          {/* Scribble underline */}
          <motion.svg
            className="mx-auto mb-8"
            viewBox="0 0 300 15"
            style={{ width: '280px', height: '15px' }}
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 5,8 Q 40,2 80,8 T 150,8 T 220,8 T 295,8"
              fill="none"
              stroke="#4a90d9"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.svg>

          {/* Subtitle */}
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-body text-ink-light mb-3 max-w-3xl mx-auto px-4 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <span className="relative inline-block px-2">
              <span className="relative z-10 text-ink font-bold">Cybersecurity Engineer</span>
              <motion.svg
                className="absolute inset-0 w-full h-full -z-10"
                style={{ scale: 1.2, top: '-10%', left: '-5%', width: '110%', height: '120%' }}
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M10,20 Q10,5 50,5 T90,20 T50,35 T10,20 Z"
                  fill="none"
                  stroke="#fff176"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
                />
              </motion.svg>
            </span>
            {' '}& Developer
          </motion.div>

          <motion.p
            className="text-lg md:text-xl font-accent text-ink-faint mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.6 }}
          >
            Building Secure Digital Solutions with Cryptography & Forensics ✨
          </motion.p>

          {/* Social Links — colorful skribbl-inspired circles */}
          <motion.div
            className="flex items-center justify-center flex-wrap gap-4 mb-12"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-5 relative"
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
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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