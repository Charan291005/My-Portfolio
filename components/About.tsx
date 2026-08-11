'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DoodleDecorations from './DoodleDecorations';
import TiltCard from './TiltCard';
import BouncyText from './BouncyText';
import PeelAndReveal from './PeelAndReveal';

const highlights = [
  {
    icon: '🛡️',
    title: 'Cybersecurity Expert',
    description: 'Specialized in cryptography, DRM systems, and secure software development',
    noteColor: 'sticky-note',
    rotation: '-2deg',
  },
  {
    icon: '💻',
    title: 'Full-Stack Developer',
    description: 'Proficient in Python and modern web technologies',
    noteColor: 'sticky-note-pink',
    rotation: '1.5deg',
  },
  {
    icon: '🎓',
    title: 'Academic Excellence',
    description: 'CGPA 8.51 at VIT Bhopal, focused on Cyber Security & Digital Forensics',
    noteColor: 'sticky-note-blue',
    rotation: '-1deg',
  },
  {
    icon: '⚡',
    title: 'Problem Solver',
    description: 'Built production-ready security solutions for government and aerospace sectors',
    noteColor: 'sticky-note-green',
    rotation: '2deg',
  },
];

const funFacts = [
  '☕ Runs on coffee and cryptography papers',
  '🔐 Can name 12 cipher algorithms from memory',
  '🐧 Linux is a lifestyle, not just an OS',
  '🎯 CTF competitions are basically my video games',
  '🚀 Once wrote 800 lines of Python in a single day',
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % funFacts.length);
        setFactVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section-container relative" ref={ref}>
      <DoodleDecorations count={20} seed={101} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <BouncyText text="About Me ✏️" hoverScale={1.1} />
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Polaroid */}
          <motion.div
            className="relative mx-auto"
            initial={{ opacity: 0, rotate: -5 }}
            animate={isInView ? { opacity: 1, rotate: -3 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <TiltCard
              className="bg-white p-4 pb-16 relative"
              style={{
                border: '2px solid #2d2d2d',
                boxShadow: '5px 5px 0 rgba(0,0,0,0.1)',
                transform: 'rotate(-3deg)',
                maxWidth: '300px',
              }}
              tiltStrength={15}
            >
              {/* Photo area with gradient */}
              <div
                className="w-64 h-64 flex items-center justify-center text-7xl font-heading font-bold relative overflow-hidden"
                style={{
                  border: '1.5px solid #ddd',
                  background: 'linear-gradient(135deg, #667eea20, #764ba220, #f9ca2420)',
                }}
              >
                {/* Decorative scribble pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 100 100">
                  <path d="M0,0 L100,100 M20,0 L100,80 M40,0 L100,60 M60,0 L100,40 M80,0 L100,20 M0,20 L80,100 M0,40 L60,100 M0,60 L40,100 M0,80 L20,100" stroke="#2d2d2d" strokeWidth="0.5" />
                </svg>

                {/* Big avatar */}
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-2">👨‍💻</div>
                  <div
                    className="font-heading font-bold text-3xl"
                    style={{ color: '#4a90d9' }}
                  >
                    SC
                  </div>
                </div>

                {/* Corner sticker */}
                <div
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-xl"
                  style={{
                    background: '#fff176',
                    border: '2px solid rgba(0,0,0,0.1)',
                    borderRadius: '50%',
                    transform: 'rotate(15deg)',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                  }}
                >
                  🔐
                </div>
              </div>

              {/* Fun fact ticker */}
              <div className="absolute bottom-3 left-2 right-2 text-center h-8 overflow-hidden">
                <motion.p
                  key={factIndex}
                  className="font-accent text-xs text-ink-light"
                  initial={{ opacity: 0, y: 10 }}
                  animate={factVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  {funFacts[factIndex]}
                </motion.p>
              </div>
            </TiltCard>

            {/* Tape strip */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-marker-yellow/60"
              style={{ transform: 'translateX(-50%) rotate(2deg)', border: '1px solid rgba(0,0,0,0.1)' }}
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-4xl font-heading font-bold mb-4 text-ink">
              Hi, I'm Shree Charan 👋
            </h3>
            <p className="text-lg text-ink-light mb-4 leading-relaxed">
              I'm a <span className="marker-highlight">Cybersecurity-focused Computer Science undergraduate</span> at VIT Bhopal,
              passionate about building secure, efficient digital solutions. With hands-on experience in cryptography,
              digital forensics, and secure software systems, I've developed real-world security projects for organizations
              like <span className="marker-highlight-pink">Hindustan Aeronautics Limited (HAL)</span> and <span className="marker-highlight-green">Madhya Pradesh Police</span>.
            </p>
            <p className="text-lg text-ink-light mb-6 leading-relaxed">
              I specialize in <span className="marker-highlight-blue">Python, Java, and C++</span>, with expertise
              in encryption algorithms, steganography, and secure system architecture. My goal is to create robust,
              production-ready solutions that protect sensitive data and enhance digital security.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['Cryptography', 'Digital Forensics', 'Secure Systems'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="doodle-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 5 : -5, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Quick action links */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/Shree_Charan_Resume.pdf"
                download="Shree_Charan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 font-heading font-bold text-lg transition-transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #4a90d9, #6a5acd)',
                  border: '2.5px solid #2d2d2d',
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  boxShadow: '3px 3px 0 #2d2d2d',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                📄 Resume
              </a>
              <motion.a
                href="#contact"
                className="btn-secondary inline-flex items-center gap-2 !text-lg !py-2 !px-4"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                💬 Let's Talk
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className={item.noteColor}
              style={{ rotate: item.rotation }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                rotate: '0deg',
                y: -12,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 12 },
              }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-3 inline-block"
                  whileHover={{ scale: 1.4, rotate: [0, -15, 15, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h4 className="text-lg font-heading font-bold mb-2 text-ink">{item.title}</h4>
                <p className="text-sm text-ink-light">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secret Reveal Section */}
        <div className="mt-16 max-w-lg mx-auto h-64">
          <PeelAndReveal 
            title="The Real Reason I Code"
            secretContent={
              <>
                "I just really like making computers do cool things." <br/>
                <span className="text-sm font-normal text-ink-light mt-2 block">(And maybe also to automate the boring stuff.)</span>
              </>
            }
          />
        </div>
      </motion.div>

      <div className="doodle-separator" />
    </section>
  );
}