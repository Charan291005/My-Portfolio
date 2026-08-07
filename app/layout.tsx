import type { Metadata } from "next";
import { Permanent_Marker, Inter, Indie_Flower } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import DrawCanvas from "@/components/DrawCanvas";

const permanentMarker = Permanent_Marker({ subsets: ["latin"], variable: '--font-heading', weight: '400' });
const inter = Inter({ subsets: ["latin"], variable: '--font-body' });
const indieFlower = Indie_Flower({ subsets: ["latin"], variable: '--font-accent', weight: '400' });

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${permanentMarker.variable} ${inter.variable} ${indieFlower.variable} font-body antialiased`} suppressHydrationWarning>
        <CustomCursor />
        <ScrollProgress />
        <DrawCanvas />
        <Navigation />
        {children}
      </body>
    </html>
  );
}