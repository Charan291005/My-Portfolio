'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/#home', isExternal: false },
  { name: 'About', href: '/#about', isExternal: false },
  { name: 'Experience', href: '/#experience', isExternal: false },
  { name: 'Projects', href: '/#projects', isExternal: false },
  { name: 'Skills', href: '/#skills', isExternal: false },
  { name: 'Playground', href: '/#games', isExternal: false },
  { name: 'Contact', href: '/#contact', isExternal: false },
  { name: 'Resume', href: '/resume', isExternal: true },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname === '/resume') {
        setActiveSection('Resume');
        return;
      }

      const sections = navItems.filter(item => !item.isExternal).map((item) => item.href.split('#')[1]);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'nav-scrolled' : 'bg-transparent'
      }`}
      style={{
        borderBottom: isScrolled ? '2.5px solid var(--ink)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="group relative flex items-center justify-center w-12 h-12 ml-2 mt-1"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {/* Marker background */}
            <svg className="absolute inset-0 w-full h-full text-marker-yellow -z-10 scale-[1.3] -rotate-6 group-hover:rotate-6 transition-transform duration-300" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M10,20 Q40,5 90,15 Q95,50 85,85 Q50,95 15,85 Q5,50 10,20 Z" fill="currentColor" />
            </svg>
            <span className="font-heading text-4xl font-bold text-ink">SC</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 font-heading text-lg transition-all duration-200 ${
                  activeSection === (item.isExternal ? item.name : item.href.split('#')[1]) ? 'text-ink font-bold' : 'text-ink-light hover:text-ink'
                }`}
              >
                {item.name}
                {activeSection === (item.isExternal ? item.name : item.href.split('#')[1]) && (
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
              </Link>
            ))}

            {/* Dark mode toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-3 w-12 h-12 flex items-center justify-center relative font-heading text-xl"
              style={{
                border: '2.5px solid var(--ink)',
                borderRadius: '50% 45% 55% 48% / 45% 55% 48% 50%',
                background: darkMode ? '#1a1a2e' : '#fff',
                color: darkMode ? '#f0e6c8' : '#2d2d2d',
                boxShadow: '3px 3px 0 var(--ink)',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -15 }}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.span
                key={darkMode ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {darkMode ? '🌙' : '☀️'}
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 flex items-center justify-center text-xl"
              style={{
                border: '2.5px solid var(--ink)',
                borderRadius: '50%',
                background: darkMode ? '#1a1a2e' : '#fff',
                cursor: 'pointer',
              }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? '🌙' : '☀️'}
            </motion.button>
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, rotate: -1 }}
            animate={{ opacity: 1, height: 'auto', rotate: 0 }}
            exit={{ opacity: 0, height: 0, rotate: 1 }}
            className="md:hidden border-b-2 border-ink"
            style={{
              background: 'var(--paper)',
              borderRadius: '0 0 15px 15px',
              boxShadow: '3px 5px 0 rgba(0,0,0,0.1)',
            }}
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 font-heading text-2xl transition-colors border-b border-dashed border-eraser last:border-b-0 ${
                    activeSection === (item.isExternal ? item.name : item.href.split('#')[1]) ? 'text-pencil-blue font-bold' : 'text-ink-light'
                  }`}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {activeSection === (item.isExternal ? item.name : item.href.split('#')[1]) && '→ '}
                    {item.name}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}