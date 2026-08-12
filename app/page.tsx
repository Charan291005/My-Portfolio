import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About'));
const Experience = dynamic(() => import('@/components/Experience'));
const Projects = dynamic(() => import('@/components/Projects'));
const Skills = dynamic(() => import('@/components/Skills'));
const Certifications = dynamic(() => import('@/components/Certifications'));
const Education = dynamic(() => import('@/components/Education'));
const InteractiveZone = dynamic(() => import('@/components/InteractiveZone'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Education />
      <InteractiveZone />
      <Contact />
      <Footer />
    </main>
  );
}