'use client';
import { motion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

const socialLinks = [
  { href: 'https://github.com/Charan291005', label: '{ }', title: 'GitHub', color: '#24292e' },
  { href: 'https://linkedin.com/in/shree-charan-n', label: 'in', title: 'LinkedIn', color: '#0077b5' },
  { href: 'https://www.reddit.com/user/shreecharan', label: 'r/', title: 'Reddit', color: '#ff4500' },
  { href: 'https://www.quora.com/profile/Shree-Charan-N', label: 'Q', title: 'Quora', color: '#b92b27' },
  { href: 'https://medium.com/@shreecharan', label: 'M', title: 'Medium', color: '#000' },
  { href: 'https://wa.me/917483985175', label: '💬', title: 'WhatsApp', color: '#25d366' },
  { href: 'mailto:shreecharan5277443@gmail.com', label: '✉', title: 'Email', color: '#e74c3c' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-paper-dark py-16" style={{ borderTop: '3px solid #2d2d2d' }}>
      {/* Spiral binding decoration */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-10 -translate-y-1/2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full border-2 border-ink bg-paper hidden md:block" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <motion.h3
              className="text-4xl font-heading font-bold text-ink mb-4"
              whileHover={{ rotate: -1 }}
            >
              Shree Charan N
            </motion.h3>
            <p className="text-ink-light text-sm leading-relaxed mb-4">
              Cybersecurity Engineer & Developer passionate about building secure digital solutions. ✨
            </p>
            <div
              className="inline-block px-4 py-1 text-sm font-accent font-bold"
              style={{
                background: '#c8e6c9',
                border: '2px solid #2d2d2d',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                boxShadow: '2px 2px 0 #2d2d2d',
              }}
            >
              🟢 Open to Opportunities
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl font-bold text-ink mb-4">Quick Links ↗</h4>
            <ul className="space-y-2">
              {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-ink-light hover:text-pencil-blue transition-colors text-sm font-body relative inline-block group">
                    → {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pencil-blue transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl font-bold text-ink mb-4">Get In Touch ✉️</h4>
            <div className="space-y-2 text-sm text-ink-light font-body">
              <p>📍 Bengaluru, Karnataka, India</p>
              <a href="mailto:shreecharan5277443@gmail.com" className="block hover:text-pencil-blue transition-colors">📧 shreecharan5277443@gmail.com</a>
              <a href="tel:+917483985175" className="block hover:text-pencil-blue transition-colors">📞 +91 7483985175</a>
              <a href="https://wa.me/917483985175" target="_blank" rel="noopener noreferrer" className="block hover:text-pencil-blue transition-colors">💬 WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Social Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 mb-6" style={{ borderTop: '1.5px dashed #ccc', borderBottom: '1.5px dashed #ccc' }}>
          {socialLinks.map((link) => (
            <MagneticWrapper key={link.title} strength={15}>
              <motion.a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="w-12 h-12 flex items-center justify-center font-heading text-lg font-bold transition-all"
                style={{
                  border: `2.5px solid ${link.color}`,
                  borderRadius: '50% 45% 55% 48% / 45% 55% 48% 50%',
                  color: link.color,
                  background: '#fff',
                  boxShadow: `2px 2px 0 ${link.color}`,
                }}
                whileHover={{ scale: 1.15, rotate: 8, boxShadow: `4px 4px 0 ${link.color}` }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.title}
                title={link.title}
              >
                {link.label}
              </motion.a>
            </MagneticWrapper>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-ink-light font-accent">
          <span>Sketched with</span>
          <motion.span
            className="text-pencil-red text-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ♥
          </motion.span>
          <span>by Shree Charan N © {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}