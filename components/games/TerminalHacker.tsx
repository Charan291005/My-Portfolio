'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HACKER_CODE = `
def bypass_mainframe(target_ip):
    print("Initiating brute force attack...")
    connect_to_proxy(ip="192.168.1.100")
    
    # Bypassing firewall
    firewall_status = check_firewall()
    if firewall_status == "ACTIVE":
        deploy_payload("sql_inject_v2.py")
        disable_security_protocols()
        
    print("Extracting admin credentials...")
    hash_dump = fetch_sam_database()
    password = decrypt_hash(hash_dump, algorithm="AES-256")
    
    if password:
        login(user="root", pwd=password)
        print("We are in.")
        return True
        
    return False

# Executing sequence
bypass_mainframe("10.0.0.5")
Initializing packet sniffer...
Intercepting traffic on port 443...
Decrypting TLS handshake...
SUCCESS!
Data extraction complete.
Closing connection.
`;

export default function TerminalHacker() {
  const [isActive, setIsActive] = useState(false);
  const [typedCode, setTypedCode] = useState('');
  const [isGranted, setIsGranted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Characters to reveal per keystroke
  const CHARS_PER_KEYSTROKE = 5;

  useEffect(() => {
    if (!isActive || isGranted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore meta keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      
      e.preventDefault();

      setTypedCode(prev => {
        const nextLength = prev.length + CHARS_PER_KEYSTROKE;
        if (nextLength >= HACKER_CODE.length) {
          setIsGranted(true);
          return HACKER_CODE;
        }
        return HACKER_CODE.slice(0, nextLength);
      });
      
      // Auto scroll to bottom
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isGranted]);

  const resetGame = () => {
    setTypedCode('');
    setIsGranted(false);
    setIsActive(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[400px] border-4 border-ink rounded-lg bg-[#1a1a1a] p-4 relative overflow-hidden font-mono text-sm shadow-[8px_8px_0_rgba(0,0,0,1)] hover:scale-[1.02] transition-transform duration-300">
      
      {/* Window Controls (Sketchy style) */}
      <div className="absolute top-0 left-0 right-0 h-8 border-b-2 border-ink bg-[#2a2a2a] flex items-center px-3 gap-2 z-20">
        <div className="w-3 h-3 rounded-full bg-pencil-red border border-ink"></div>
        <div className="w-3 h-3 rounded-full bg-pencil-yellow border border-ink"></div>
        <div className="w-3 h-3 rounded-full bg-pencil-green border border-ink"></div>
        <div className="mx-auto text-xs text-ink-light font-heading font-bold text-gray-400">root@shree-sec: ~</div>
      </div>

      {!isActive && !isGranted && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <h3 className="font-display text-3xl text-white mb-2">Terminal Hacker</h3>
          <p className="text-gray-300 mb-6 font-heading text-xl">Mash your keyboard to hack the mainframe!</p>
          <button 
            onClick={() => setIsActive(true)}
            className="px-6 py-2 bg-pencil-green text-ink font-bold font-heading text-2xl rounded-md border-2 border-ink shadow-[4px_4px_0_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Start Hacking
          </button>
        </div>
      )}

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="mt-8 h-full overflow-y-auto text-green-400 whitespace-pre-wrap break-all pb-10"
        style={{ textShadow: '0 0 5px rgba(74, 222, 128, 0.5)' }}
      >
        {typedCode}
        {isActive && !isGranted && <span className="animate-pulse font-bold text-lg">_</span>}
        
        {/* Win State */}
        {isGranted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center text-pencil-green font-bold"
          >
            <div className="text-2xl md:text-4xl mb-2">ACCESS GRANTED</div>
            <div className="text-sm md:text-base text-green-300">Security bypass successful. Welcome, Admin.</div>
            
            <button 
              onClick={resetGame}
              className="mt-6 px-4 py-1 text-sm bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors rounded"
            >
              Disconnect
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Mobile Keyboard Button */}
      {isActive && !isGranted && (
        <div className="md:hidden absolute bottom-6 right-6 z-20">
          <button 
            className="w-20 h-20 rounded-full bg-pencil-blue border-4 border-ink text-white font-bold shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center active:scale-95 active:translate-y-1 active:shadow-none transition-all"
            onClick={() => {
              setTypedCode(prev => {
                const nextLength = prev.length + (CHARS_PER_KEYSTROKE * 3);
                if (nextLength >= HACKER_CODE.length) {
                  setIsGranted(true);
                  return HACKER_CODE;
                }
                return HACKER_CODE.slice(0, nextLength);
              });
              if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }}
          >
            TAP!
          </button>
        </div>
      )}
    </div>
  );
}
