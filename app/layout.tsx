import type { Metadata } from "next";
import { Caveat, Patrick_Hand, Indie_Flower, Fredoka } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ScoreProvider } from '@/context/ScoreContext';

const Navigation = dynamic(() => import('@/components/Navigation'));
const CustomCursor = dynamic(() => import('@/components/CustomCursor'));
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'));
const DrawCanvas = dynamic(() => import('@/components/DrawCanvas'));
const EasterEggs = dynamic(() => import('@/components/EasterEggs'));
const MouseTrail = dynamic(() => import('@/components/MouseTrail'));

const caveat = Caveat({ subsets: ["latin"], variable: '--font-heading', weight: ['400', '500', '600', '700'] });
const patrickHand = Patrick_Hand({ subsets: ["latin"], variable: '--font-body', weight: '400' });
const indieFlower = Indie_Flower({ subsets: ["latin"], variable: '--font-accent', weight: '400' });
const fredoka = Fredoka({ subsets: ["latin"], variable: '--font-display', weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  title: "Shree Charan N | Cybersecurity Engineer & Developer",
  description: "A hand-drawn portfolio of Shree Charan N — Cybersecurity-focused Computer Science Engineer specializing in cryptography, secure software systems, and digital forensics.",
  keywords: ["Cybersecurity", "Developer", "Cryptography", "Digital Forensics", "Python", "Java", "Portfolio"],
  authors: [{ name: "Shree Charan N" }],
  openGraph: {
    title: "Shree Charan N | Cybersecurity Engineer",
    description: "Portfolio showcasing cybersecurity projects and development work — sketched with love",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shree Charan N",
  "jobTitle": "Cybersecurity Engineer & Developer",
  "url": "https://myportfolio-2905.web.app",
  "sameAs": [
    "https://github.com/Charan291005",
    "https://linkedin.com/in/shree-charan-n"
  ],
  "alumniOf": "VIT Bhopal",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "addressCountry": "India"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${caveat.variable} ${patrickHand.variable} ${indieFlower.variable} ${fredoka.variable} font-body antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <ScoreProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CustomCursor />
            <ScrollProgress />
            <DrawCanvas />
            <EasterEggs />
            <MouseTrail />
            <Navigation />
            {children}
          </ScoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}