'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.slice(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-paper/90 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
      style={{
        borderBottom: isScrolled ? '2.5px solid #2d2d2d' : 'none',
        borderImage: isScrolled
          ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 4'%3E%3Cpath d='M0,2 Q50,0 100,2 T200,2 T300,2 T400,2' stroke='%232d2d2d' stroke-width='2' fill='none'/%3E%3C/svg%3E\") 0 0 30 0 / 0 0 3px 0 stretch"
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — hand-written style */}
          <motion.a
            href="#home"
            className="font-heading text-3xl font-bold text-ink relative"
            whileHover={{ rotate: -3, scale: 1.05 }}
          >
            SC
            <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 50 8" preserveAspectRatio="none">
              <path d="M0,4 Q12,0 25,4 T50,4" stroke="#4a90d9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </motion.a>

          {/* Desktop Navigation — notebook tab style */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 font-heading text-lg transition-all duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-ink font-bold'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.svg
                    layoutId="navCircle"
                    className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none"
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    style={{ left: '-4px', top: '-4px' }}
                  >
                    <motion.path
                      d="M 10,20 Q 10,5 30,5 Q 50,2 70,5 Q 90,5 90,20 Q 90,35 70,35 Q 50,38 30,35 Q 10,35 10,20 Z"
                      fill="none"
                      stroke="#e74c3c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.svg>
                )}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 font-heading text-2xl text-ink"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — notebook page dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, rotate: -1 }}
            animate={{ opacity: 1, height: 'auto', rotate: 0 }}
            exit={{ opacity: 0, height: 0, rotate: 1 }}
            className="md:hidden bg-paper-dark border-b-2 border-ink"
            style={{
              borderRadius: '0 0 15px 15px',
              boxShadow: '3px 5px 0 rgba(0,0,0,0.1)',
            }}
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block py-3 font-heading text-2xl transition-colors border-b border-dashed border-eraser last:border-b-0 ${
                    activeSection === item.href.slice(1)
                      ? 'text-pencil-blue font-bold'
                      : 'text-ink-light'
                  }`}
                >
                  {activeSection === item.href.slice(1) && '→ '}
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}