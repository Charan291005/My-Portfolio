'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import MagneticWrapper from './MagneticWrapper';
import BouncyText from './BouncyText';

const socialLinks = [
  { href: 'https://github.com/Charan291005', label: '{ }', title: 'GitHub', color: '#24292e', bg: '#f0f0f0' },
  { href: 'https://linkedin.com/in/shree-charan-n', label: 'in', title: 'LinkedIn', color: '#0077b5', bg: '#dbeafe' },
  { href: 'https://www.reddit.com/user/shreecharan', label: 'r/', title: 'Reddit', color: '#ff4500', bg: '#ffe0cc' },
  { href: 'https://www.quora.com/profile/Shree-Charan-N', label: 'Q', title: 'Quora', color: '#b92b27', bg: '#fce4ec' },
  { href: 'https://medium.com/@shreecharan', label: 'M', title: 'Medium', color: '#000', bg: '#e0e0e0' },
  { href: 'https://wa.me/917483985175', label: '💬', title: 'WhatsApp', color: '#25d366', bg: '#dcfce7' },
];

const contactMethods = [
  {
    icon: '📧',
    title: 'Drop me an Email',
    value: 'shreecharan5277443@gmail.com',
    href: 'mailto:shreecharan5277443@gmail.com',
    description: 'Best for project inquiries, collaborations, and formal communication. I typically respond within 24 hours.',
    noteStyle: 'sticky-note',
    rotation: '-1.5deg',
  },
  {
    icon: '📞',
    title: 'Give me a Call',
    value: '+91 7483985175',
    href: 'tel:+917483985175',
    description: 'For urgent matters or quick chats. Available Mon-Sat, 10 AM - 8 PM IST.',
    noteStyle: 'sticky-note-pink',
    rotation: '1deg',
  },
  {
    icon: '💬',
    title: 'WhatsApp Me',
    value: '+91 7483985175',
    href: 'https://wa.me/917483985175',
    description: 'Fastest way to reach me! Send a text anytime, I check WhatsApp frequently.',
    noteStyle: 'sticky-note-green',
    rotation: '-0.5deg',
  },
  {
    icon: '📍',
    title: 'Based in',
    value: 'Bengaluru, Karnataka, India',
    href: null,
    description: 'Currently studying at VIT Bhopal. Open to remote work, internships, and freelance projects worldwide.',
    noteStyle: 'sticky-note-blue',
    rotation: '1.5deg',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-container relative" ref={ref}>
      <DoodleDecorations count={10} seed={300} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="section-title">
          <BouncyText text="Get In Touch ✉️" hoverScale={1.1} />
        </h2>

        {/* Intro text */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-2xl font-heading font-bold text-ink mb-4">
            Let's Build Something <span className="marker-highlight">Awesome</span> Together! 🚀
          </p>
          <p className="text-lg text-ink-light leading-relaxed">
            Whether you have a cybersecurity project, a collaboration idea, an internship opportunity, 
            or just want to talk about encryption algorithms — I'd love to hear from you! 
            Pick your favorite way to reach me below ↓
          </p>
        </motion.div>

        {/* Contact Methods — Sticky Notes Grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              className={method.noteStyle}
              style={{ rotate: method.rotation }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
              whileHover={{
                scale: 1.08,
                rotate: '0deg',
                y: -10,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 12 }
              }}
            >
              <div className="text-4xl mb-3">{method.icon}</div>
              <h3 className="text-xl font-heading font-bold text-ink mb-2">{method.title}</h3>
              {method.href ? (
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-lg font-heading font-bold text-pencil-blue hover:underline block mb-3"
                >
                  {method.value} ↗
                </a>
              ) : (
                <p className="text-lg font-heading font-bold text-ink mb-3">{method.value}</p>
              )}
              <p className="text-sm text-ink-light leading-relaxed">{method.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-4xl font-heading font-bold text-ink mb-3">
            Find Me Everywhere 🌐
          </h3>
          <p className="text-ink-light mb-10 font-accent text-lg">
            Connect, follow, and stay updated on my journey across the internet ↓
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 max-w-3xl mx-auto">
            {socialLinks.map((link, index) => (
              <MagneticWrapper key={link.title} strength={25}>
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.08, duration: 0.4 }}
                >
                  <motion.div
                    className="w-16 h-16 flex items-center justify-center font-heading text-2xl font-bold relative"
                    style={{
                      border: `3px solid ${link.color}`,
                      borderRadius: '50% 45% 55% 48% / 45% 55% 48% 50%',
                      background: link.bg,
                      color: link.color,
                      boxShadow: `3px 3px 0 ${link.color}`,
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 8,
                      boxShadow: `5px 5px 0 ${link.color}`,
                      transition: { type: 'spring', stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.label}
                  </motion.div>
                  <span className="text-sm font-heading font-bold text-ink-light group-hover:text-ink transition-colors">
                    {link.title}
                  </span>
                </motion.a>
              </MagneticWrapper>
            ))}
          </div>
        </motion.div>

        {/* Availability Banner */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <div
            className="inline-block px-8 py-4"
            style={{
              background: '#c8e6c9',
              border: '3px solid #2d2d2d',
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: '4px 4px 0 #2d2d2d',
              transform: 'rotate(-0.5deg)',
            }}
          >
            <p className="font-heading text-2xl font-bold text-ink">
              🟢 Currently Open to Opportunities!
            </p>
            <p className="text-sm text-ink-light font-accent mt-1">
              Internships • Freelance • Full-time • Collaborations
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}