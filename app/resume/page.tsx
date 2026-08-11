import { Metadata } from 'next';
import { Download, ExternalLink, Briefcase, GraduationCap, Code, Shield } from 'lucide-react';
import Link from 'next/link';
import MagneticWrapper from '@/components/MagneticWrapper';

export const metadata: Metadata = {
  title: 'Resume | Shree Charan N',
  description: 'Cybersecurity Engineer & Developer Resume',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-paper">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-block text-pencil-blue font-accent text-xl hover:underline rotate-[-2deg]">
            ← Back to Portfolio
          </Link>
        </div>

        {/* Paper Container */}
        <div className="bg-white p-8 md:p-12 lg:p-16 shadow-[10px_10px_0px_rgba(0,0,0,1)] border-4 border-ink relative" style={{ borderRadius: '2px 255px 3px 255px / 255px 5px 225px 3px' }}>
          
          {/* Decorative Tape */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e8e4c9] opacity-80 shadow-sm" style={{ transform: 'translateX(-50%) rotate(-3deg)' }}></div>

          {/* Header */}
          <header className="border-b-4 border-ink pb-8 mb-8 relative">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-ink mb-2">Shree Charan N</h1>
            <p className="font-heading text-2xl text-ink-light mb-4">Cybersecurity Engineer & Developer</p>
            
            <div className="flex flex-wrap gap-4 font-accent text-lg">
              <a href="mailto:contact@example.com" className="hover:text-pencil-blue hover:underline">contact@example.com</a>
              <span className="hidden md:inline text-ink-faint">|</span>
              <a href="https://linkedin.com/in/shree-charan-n" target="_blank" rel="noopener noreferrer" className="hover:text-pencil-blue hover:underline flex items-center gap-1">
                LinkedIn <ExternalLink size={14} />
              </a>
              <span className="hidden md:inline text-ink-faint">|</span>
              <a href="https://github.com/Charan291005" target="_blank" rel="noopener noreferrer" className="hover:text-pencil-blue hover:underline flex items-center gap-1">
                GitHub <ExternalLink size={14} />
              </a>
            </div>

            {/* Download Button */}
            <div className="absolute top-0 right-0 hidden md:block">
              <MagneticWrapper strength={15}>
                <button className="flex items-center gap-2 bg-marker-yellow text-ink px-4 py-2 font-accent text-lg font-bold border-2 border-ink shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform" style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}>
                  <Download size={18} />
                  Download PDF
                </button>
              </MagneticWrapper>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Experience */}
              <section>
                <h2 className="font-heading font-bold text-3xl text-ink flex items-center gap-3 mb-6">
                  <Briefcase className="text-pencil-blue" />
                  Experience
                </h2>
                
                <div className="space-y-8">
                  <div className="relative pl-6 border-l-2 border-dashed border-ink-light">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-pencil-blue border-2 border-ink"></div>
                    <h3 className="font-heading font-bold text-xl text-ink">Cybersecurity Intern</h3>
                    <p className="font-accent text-ink-light mb-2">Company Name • Jan 2024 - Present</p>
                    <ul className="font-body text-lg list-disc pl-4 space-y-1 marker:text-pencil-blue">
                      <li>Conducted vulnerability assessments and penetration testing on web applications.</li>
                      <li>Implemented secure authentication flows using modern cryptographic standards.</li>
                      <li>Developed automated scripts in Python for log analysis and anomaly detection.</li>
                    </ul>
                  </div>

                  <div className="relative pl-6 border-l-2 border-dashed border-ink-light">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-ink"></div>
                    <h3 className="font-heading font-bold text-xl text-ink">Software Developer Intern</h3>
                    <p className="font-accent text-ink-light mb-2">Tech Startup • Jun 2023 - Dec 2023</p>
                    <ul className="font-body text-lg list-disc pl-4 space-y-1 marker:text-pencil-blue">
                      <li>Built and maintained REST APIs using Node.js and Express.</li>
                      <li>Integrated third-party security tools into the CI/CD pipeline.</li>
                      <li>Optimized database queries, reducing response times by 20%.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="font-heading font-bold text-3xl text-ink flex items-center gap-3 mb-6">
                  <GraduationCap className="text-crayon-red" />
                  Education
                </h2>
                <div className="space-y-4">
                  <div className="bg-paper-dark p-4 rounded-sm border-2 border-ink">
                    <h3 className="font-heading font-bold text-xl text-ink">B.Tech in Computer Science</h3>
                    <p className="font-accent text-ink-light">University Name • 2021 - 2025</p>
                    <p className="font-body text-lg mt-2">Specialization in Cybersecurity. Relevant Coursework: Cryptography, Network Security, Operating Systems, Data Structures.</p>
                  </div>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <div className="space-y-10">
              
              {/* Skills */}
              <section>
                <h2 className="font-heading font-bold text-3xl text-ink flex items-center gap-3 mb-6">
                  <Code className="text-crayon-green" />
                  Skills
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-accent font-bold text-lg mb-2 underline decoration-wavy decoration-pencil-yellow">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Java', 'TypeScript', 'C++', 'SQL', 'Bash'].map(skill => (
                        <span key={skill} className="font-body px-2 py-1 border border-ink rounded-md bg-white text-sm" style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-accent font-bold text-lg mb-2 underline decoration-wavy decoration-pencil-yellow">Security</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Penetration Testing', 'Cryptography', 'Forensics', 'OWASP Top 10', 'Wireshark'].map(skill => (
                        <span key={skill} className="font-body px-2 py-1 border border-ink rounded-md bg-white text-sm" style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-accent font-bold text-lg mb-2 underline decoration-wavy decoration-pencil-yellow">Tools & Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'Node.js', 'Git', 'Linux', 'Docker'].map(skill => (
                        <span key={skill} className="font-body px-2 py-1 border border-ink rounded-md bg-white text-sm" style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="font-heading font-bold text-3xl text-ink flex items-center gap-3 mb-6">
                  <Shield className="text-pencil-yellow" />
                  Certs
                </h2>
                <ul className="font-body text-lg space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-crayon-green mt-1">✓</span>
                    <span>CompTIA Security+</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-crayon-green mt-1">✓</span>
                    <span>Certified Ethical Hacker (CEH)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-crayon-green mt-1">✓</span>
                    <span>AWS Certified Cloud Practitioner</span>
                  </li>
                </ul>
              </section>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
