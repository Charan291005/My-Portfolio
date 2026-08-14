'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DoodleDecorations from './DoodleDecorations';
import InkSpots from './InkSpots';
import BouncyText from './BouncyText';

const certifications = [
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'August 7, 2026 (Completed)',
    category: 'Cybersecurity',
    description: 'Foundational cybersecurity course covering common cyber threats, online safety, network security concepts, and essential cybersecurity practices.',
    isFeatured: true,
    color: '#dc2626',
    bg: '#fef2f2',
    rotation: '-1deg',
    icon: '🛡️',
  },
  {
    title: 'AWS Technical Essentials',
    issuer: 'AWS Training and Certification',
    date: 'September 25, 2025',
    category: 'Cloud Computing',
    description: 'Foundational understanding of AWS cloud services and core cloud concepts.',
    fileUrl: '/aws-technical-essentials-certificate.pdf',
    isFeatured: true,
    color: '#ea580c',
    bg: '#fff7ed',
    rotation: '1deg',
    icon: '☁️',
  },
  {
    title: 'Free AWS Certification Course',
    issuer: 'Intellipaat',
    date: 'September 24, 2025',
    category: 'Cloud Computing',
    certificateId: '31679-1654-285307',
    description: 'Completed the requirements for Intellipaat’s Free AWS Certification Course.',
    // fileUrl: '/intellipaat.com_academy_certificate-link__Yz0xNjU0JnU9Mjg1MzA3JmV4dD0x.pdf',
    isFeatured: false,
    color: '#f97316',
    bg: '#fff7ed',
    rotation: '-0.5deg',
    icon: '☁️',
  },
  {
    title: 'Introduction to Generative AI',
    issuer: 'IBM SkillsBuild',
    date: 'November 10, 2025',
    category: 'Artificial Intelligence',
    certificateId: 'MDL-388',
    description: 'Introductory learning in generative AI concepts and applications.',
    fileUrl: '/IBM-Certificate.pdf',
    isFeatured: true,
    color: '#0284c7',
    bg: '#f0f9ff',
    rotation: '0.5deg',
    icon: '🤖',
  },
  {
    title: 'AI Fluency Framework Foundations',
    issuer: 'Anthropic, Ringling College of Art and Design, Higher Education Authority, and National Forum',
    date: 'Completed',
    category: 'Artificial Intelligence',
    description: 'Foundations of AI fluency, responsible AI understanding, and effective interaction with AI systems.',
    fileUrl: '/Anthropic-ai-fluency.pdf',
    isFeatured: false,
    color: '#0ea5e9',
    bg: '#f0f9ff',
    rotation: '-1.5deg',
    icon: '🧠',
  },
  {
    title: 'Virtual Internship Program',
    issuer: 'ServiceNow / SmartBridge',
    date: 'May 29, 2026',
    category: 'Platform Development & IT',
    certificateId: 'SNU2024263',
    description: 'Completed a ServiceNow virtual internship covering platform administration, flows, reports, automated testing, Agentic AI, and Certified System Administrator exam preparation.',
    fileUrl: '/SERVICE-NOW-VIRTUAL-INTERNSHIP.pdf',
    isFeatured: true,
    color: '#16a34a',
    bg: '#f0fdf4',
    rotation: '1deg',
    icon: '⚙️',
  },
  {
    title: 'Programming in Java',
    issuer: 'Vityarthi / VIT Bhopal University',
    date: 'September 25, 2025',
    category: 'Programming',
    description: 'Completed a Java programming course involving lessons, assignments, and quizzes.',
    // fileUrl: '/VITYARTHI-JAVA-CERTIFICATE-23BCY10004.pdf',
    isFeatured: false,
    color: '#9333ea',
    bg: '#faf5ff',
    rotation: '-1deg',
    icon: '💻',
  },
  {
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Google',
    date: 'July 12, 2026',
    category: 'Digital Skills',
    certificateId: '470854423',
    description: 'Completed foundational learning in digital marketing.',
    // fileUrl: '/Fundamentals-of-digital-marketing-_-Google.pdf',
    isFeatured: false,
    color: '#2563eb',
    bg: '#eff6ff',
    rotation: '0.5deg',
    icon: '📱',
  },
  {
    title: 'Ideas For The Vision: Viksit Bharat @2047',
    issuer: 'MyGov / Government of India',
    date: 'Participation Certificate',
    category: 'Civic Participation',
    description: 'Certificate of participation for contributing ideas toward realizing the vision of Viksit Bharat by 2047.',
    fileUrl: '/certificate.jpg',
    isFeatured: false,
    color: '#d97706',
    bg: '#fffbeb',
    rotation: '-0.5deg',
    icon: '🤝',
    isParticipation: true,
  }
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="section-container relative" ref={ref}>
      <DoodleDecorations count={60} seed={500} />
      <InkSpots count={30} seed={5500} />

      <motion.div
        initial={{ opacity: 0, y: 25, rotate: -1, scale: 0.985 }}
        animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 80, damping: 14, mass: 0.8 }}
        className="relative z-10"
      >
        <h2 className="section-title">
          <BouncyText text="Certifications & Learning 🏆" hoverScale={1.1} />
        </h2>

        <p className="text-center text-ink-light font-accent text-lg mb-12 max-w-3xl mx-auto">
          Building verified skills across cybersecurity, cloud computing, artificial intelligence, programming, digital platforms, and digital awareness. ↓
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="relative h-full"
              initial={{ opacity: 0, y: 40, rotate: cert.rotation }}
              animate={isInView ? { opacity: 1, y: 0, rotate: cert.rotation } : {}}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.6, type: 'spring', stiffness: 150 }}
              whileHover={{
                rotate: '0deg',
                scale: 1.03,
                y: -8,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 15 },
              }}
            >
              <div
                className="relative bg-white overflow-hidden flex flex-col h-full"
                style={{
                  border: '3px solid #2d2d2d',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.12)',
                  borderRadius: '12px',
                }}
              >
                {/* Header banner */}
                <div
                  className="px-5 py-5 relative border-b-[3px] border-[#2d2d2d]"
                  style={{ background: cert.bg }}
                >
                  {cert.isFeatured && (
                    <div 
                      className="absolute top-0 right-4 font-bold text-xs px-3 py-1 rounded-b-md border-x-[3px] border-b-[3px] border-[#2d2d2d] shadow-[2px_2px_0_#2d2d2d]"
                      style={{ background: '#fff176', color: '#2d2d2d' }}
                    >
                      Featured ⭐
                    </div>
                  )}
                  <div className="flex items-start gap-4 mt-2">
                    <div 
                      className="text-3xl bg-white p-2.5 rounded-xl border-[3px] border-[#2d2d2d] shadow-[2px_2px_0_#2d2d2d] shrink-0"
                    >
                      {cert.icon}
                    </div>
                    <div className="pt-1">
                      <span 
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border-[2px] border-[#2d2d2d] mb-2 bg-white" 
                        style={{ color: cert.color }}
                      >
                        {cert.category}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-ink leading-tight pr-2">
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-grow flex flex-col bg-[#fafaf9]">
                  <div className="mb-4">
                    <p className="font-bold text-sm text-ink mb-2 flex items-start gap-2">
                      <span className="shrink-0">🏢</span> 
                      <span>{cert.issuer}</span>
                    </p>
                    <div className="text-xs text-ink-light space-y-1.5 pl-6 border-l-2 border-gray-200 ml-2">
                      <p>📅 {cert.date}</p>
                      {cert.certificateId && <p>🆔 ID: {cert.certificateId}</p>}
                      {cert.isParticipation && <p className="text-orange-600 font-bold mt-1">Note: Certificate of Participation</p>}
                    </div>
                  </div>
                  
                  <p className="text-sm text-ink-light mb-6 flex-grow leading-relaxed">
                    {cert.description}
                  </p>
                  
                  {cert.fileUrl && (
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto block text-center font-heading font-bold text-sm px-4 py-2.5 bg-white transition-transform hover:-translate-y-1"
                      style={{
                        border: '2.5px solid #2d2d2d',
                        borderRadius: '6px',
                        boxShadow: '3px 3px 0 #2d2d2d',
                        color: cert.color,
                      }}
                    >
                      View Certificate ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun note */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div
            className="inline-block px-6 py-3"
            style={{
              background: '#fff176',
              border: '2.5px solid #2d2d2d',
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              boxShadow: '4px 4px 0 #2d2d2d',
              transform: 'rotate(-0.5deg)',
            }}
          >
            <p className="font-heading text-lg font-bold text-ink">
              📚 More certifications in progress — always learning! ✨
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="doodle-separator" />
    </section>
  );
}
