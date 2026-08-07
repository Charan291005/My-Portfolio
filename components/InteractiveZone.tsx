import TerminalHacker from './games/TerminalHacker';
import BugBounty from './games/BugBounty';
import CipherGame from './CipherGame';

export default function InteractiveZone() {
  return (
    <section id="games" className="py-20 bg-white relative overflow-hidden">
      
      {/* Decorative squiggly divider at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden text-ink opacity-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
          <path d="M0,0 V46.29 C150,46.29 250,96.29 400,96.29 C550,96.29 650,46.29 800,46.29 C950,46.29 1050,96.29 1200,96.29 V0 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="font-display font-bold text-5xl md:text-7xl text-ink relative z-10">
              Interactive <span className="text-pencil-blue">Playground</span>
            </h2>
            {/* Scribble underline */}
            <svg className="absolute -bottom-4 left-0 w-full h-6 text-pencil-yellow -z-10" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M5,15 Q50,5 100,15 T195,15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          <p className="mt-6 font-heading text-xl md:text-2xl text-ink-light max-w-2xl mx-auto">
            Take a break from scrolling. Hack the mainframe or squash some bugs in these hand-drawn mini-games!
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start justify-items-center">
          
          <TerminalHacker />
          <BugBounty />
          <CipherGame />

        </div>
      </div>

      {/* Decorative squiggly divider at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden text-ink opacity-20 pointer-events-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
          <path d="M0,0 V46.29 C150,46.29 250,96.29 400,96.29 C550,96.29 650,46.29 800,46.29 C950,46.29 1050,96.29 1200,96.29 V0 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>

    </section>
  );
}
