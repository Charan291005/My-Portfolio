'use client';
import { useState } from 'react';
import { Download, Maximize, Minimize, X } from 'lucide-react';
import Link from 'next/link';
import MagneticWrapper from '@/components/MagneticWrapper';

export default function ResumeViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const resumePdfUrl = '/Shree_Charan_Resume.pdf';

  return (
    <div className={`min-h-screen bg-paper ${isFullscreen ? 'fixed inset-0 z-[100] p-0 md:p-4 flex flex-col' : 'pt-24 pb-20 px-4 md:px-8'}`}>
      <div className={`mx-auto flex flex-col ${isFullscreen ? 'w-full h-full max-w-7xl' : 'max-w-5xl h-[85vh]'}`}>
        
        {/* Header & Back Link */}
        <div className={`flex flex-wrap justify-between items-center gap-4 ${isFullscreen ? 'mb-4 px-4 pt-4' : 'mb-6'}`}>
          {!isFullscreen ? (
            <Link href="/" className="inline-block text-pencil-blue font-accent text-xl hover:underline rotate-[-2deg]">
              ← Back to Portfolio
            </Link>
          ) : (
            <div className="font-heading text-3xl font-bold text-ink">Shree_Charan_Resume.pdf</div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center justify-center w-12 h-12 bg-white text-ink border-2 border-ink shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            
            <MagneticWrapper strength={10}>
              <a 
                href={resumePdfUrl} 
                download 
                className="flex items-center gap-2 bg-marker-yellow text-ink px-4 py-2 font-accent text-lg font-bold border-2 border-ink shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform h-12" 
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Download</span>
              </a>
            </MagneticWrapper>

            {isFullscreen && (
              <button 
                onClick={() => setIsFullscreen(false)}
                className="flex items-center justify-center w-12 h-12 bg-marker-red text-white border-2 border-ink shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform ml-1"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                title="Close Fullscreen"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div 
          className={`flex-grow bg-white shadow-[10px_10px_0px_rgba(0,0,0,1)] border-4 border-ink relative overflow-hidden ${isFullscreen ? 'rounded-xl p-0 shadow-2xl' : 'p-2'}`} 
          style={!isFullscreen ? { borderRadius: '2px 255px 3px 255px / 255px 5px 225px 3px' } : {}}
        >
          {/* Decorative Tape (Only show when not fullscreen) */}
          {!isFullscreen && (
            <>
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e8e4c9] opacity-80 shadow-sm z-10 pointer-events-none" 
                style={{ transform: 'translateX(-50%) rotate(-3deg)' }}
              />
              <div 
                className="absolute top-2 -right-4 w-16 h-8 bg-[#f48fb1] opacity-70 shadow-sm z-10 pointer-events-none" 
                style={{ transform: 'rotate(45deg)' }}
              />
            </>
          )}

          {/* PDF Object */}
          <object 
            data={`${resumePdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
            type="application/pdf" 
            className={`w-full h-full ${isFullscreen ? 'border-0' : 'border-2 border-ink rounded-sm'}`}
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
