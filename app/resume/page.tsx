import { Metadata } from 'next';
import { Download } from 'lucide-react';
import Link from 'next/link';
import MagneticWrapper from '@/components/MagneticWrapper';

export const metadata: Metadata = {
  title: 'Resume | Shree Charan N',
  description: 'Cybersecurity Engineer & Developer Resume',
};

export default function ResumePage() {
  const resumePdfUrl = '/Shree_Charan_Resume.pdf';

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-paper">
      <div className="max-w-5xl mx-auto h-[85vh] flex flex-col">
        
        {/* Header & Back Link */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-block text-pencil-blue font-accent text-xl hover:underline rotate-[-2deg]">
            ← Back to Portfolio
          </Link>

          {/* Download Button */}
          <MagneticWrapper strength={10}>
            <a 
              href={resumePdfUrl} 
              download 
              className="flex items-center gap-2 bg-marker-yellow text-ink px-4 py-2 font-accent text-lg font-bold border-2 border-ink shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform" 
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
            >
              <Download size={18} />
              Download PDF
            </a>
          </MagneticWrapper>
        </div>

        {/* PDF Viewer Container */}
        <div 
          className="flex-grow bg-white p-2 shadow-[10px_10px_0px_rgba(0,0,0,1)] border-4 border-ink relative overflow-hidden" 
          style={{ borderRadius: '2px 255px 3px 255px / 255px 5px 225px 3px' }}
        >
          {/* Decorative Tape */}
          <div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e8e4c9] opacity-80 shadow-sm z-10 pointer-events-none" 
            style={{ transform: 'translateX(-50%) rotate(-3deg)' }}
          />
          <div 
            className="absolute top-2 -right-4 w-16 h-8 bg-[#f48fb1] opacity-70 shadow-sm z-10 pointer-events-none" 
            style={{ transform: 'rotate(45deg)' }}
          />

          {/* PDF Object */}
          <object 
            data={`${resumePdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
            type="application/pdf" 
            className="w-full h-full border-2 border-ink rounded-sm"
          >
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-8">
              <p className="font-heading text-2xl text-ink">It seems your browser doesn't support embedded PDFs.</p>
              <a 
                href={resumePdfUrl} 
                download 
                className="btn-primary"
              >
                Click here to download it!
              </a>
            </div>
          </object>
        </div>

      </div>
    </div>
  );
}
