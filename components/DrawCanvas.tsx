'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DrawCanvas() {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentColor, setCurrentColor] = useState('#2d2d2d');
  
  const svgRef = useRef<SVGSVGElement>(null);
  const currentPathRef = useRef<SVGPathElement | null>(null);
  const [strokes, setStrokes] = useState<{ path: string; color: string }[]>([]);
  const [docHeight, setDocHeight] = useState('100vh');

  const colors = ['#2d2d2d', '#e74c3c', '#4a90d9', '#66bb6a', '#fff176'];

  // Keep drawing mode styling in sync
  useEffect(() => {
    if (isDrawingMode) {
      document.body.classList.add('drawing-mode');
      // Update height dynamically when toggled to ensure it covers the whole document
      setDocHeight(`${document.documentElement.scrollHeight}px`);
    } else {
      document.body.classList.remove('drawing-mode');
    }
    return () => document.body.classList.remove('drawing-mode');
  }, [isDrawingMode]);

  const getCoords = (e: React.PointerEvent<SVGSVGElement>) => {
    return { x: e.pageX, y: e.pageY };
  };

  const startDrawing = (e: React.PointerEvent<SVGSVGElement>) => {
    // Release pointer capture so we don't accidentally drag elements
    if (e.target instanceof Element) {
      e.target.releasePointerCapture(e.pointerId);
    }
    
    const { x, y } = getCoords(e);
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", currentColor);
    path.setAttribute("stroke-width", "5");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("d", `M ${x} ${y}`);
    
    if (svgRef.current) {
      svgRef.current.appendChild(path);
      currentPathRef.current = path;
    }
  };

  const draw = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!currentPathRef.current) return;
    // The browser prevents default on touch-none elements, avoiding scroll.
    
    const { x, y } = getCoords(e);
    const d = currentPathRef.current.getAttribute("d");
    currentPathRef.current.setAttribute("d", `${d} L ${x} ${y}`);
  };

  const stopDrawing = () => {
    if (currentPathRef.current) {
      const pathData = currentPathRef.current.getAttribute("d") || "";
      
      if (svgRef.current && currentPathRef.current.parentNode === svgRef.current) {
        svgRef.current.removeChild(currentPathRef.current);
      }
      
      setStrokes(prev => [...prev, { path: pathData, color: currentColor }]);
      currentPathRef.current = null;
    }
  };

  const undoCanvas = () => {
    setStrokes(prev => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    setStrokes([]);
    // Cleanup any lingering manual paths
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path:not([data-react])');
      paths.forEach(p => p.remove());
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsDrawingMode(!isDrawingMode)}
        className="fixed bottom-24 sm:bottom-8 left-4 sm:left-8 z-[110] w-14 h-14 flex items-center justify-center rounded-full shadow-lg"
        style={{
          background: isDrawingMode ? '#fff' : '#fff176',
          border: '3px solid #2d2d2d',
          boxShadow: '4px 4px 0 #2d2d2d',
        }}
        animate={!isDrawingMode ? { 
          scale: [1, 1.05, 1],
          boxShadow: ['4px 4px 0 #2d2d2d', '6px 6px 0 #2d2d2d', '4px 4px 0 #2d2d2d']
        } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-2xl">{isDrawingMode ? '❌' : '🖍️'}</span>
      </motion.button>

      {/* The SVG Canvas Overlay */}
      <AnimatePresence>
        {isDrawingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full z-[105]"
            style={{ 
              height: docHeight,
              cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%232d2d2d"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/></svg>') 0 24, crosshair`
            }}
          >
            {/* Draw surface: Using SVG instead of Canvas fixes mobile memory limit lag! */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full touch-none"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              onPointerLeave={stopDrawing}
            >
              {strokes.map((stroke, i) => (
                <path
                  key={i}
                  data-react="true"
                  d={stroke.path}
                  stroke={stroke.color}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </svg>

            {/* Toolbar */}
            <motion.div 
              className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-28 sm:translate-x-0 bg-white p-3 rounded-full flex gap-2 sm:gap-3 items-center shadow-lg"
              style={{ border: '3px solid #2d2d2d', boxShadow: '4px 4px 0 #2d2d2d' }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0"
                  style={{  
                    backgroundColor: color,
                    borderColor: currentColor === color ? '#000' : 'transparent',
                    transform: currentColor === color ? 'scale(1.2)' : 'scale(1)'
                  }}
                />
              ))}
              <div className="w-px h-6 sm:h-8 bg-gray-300 mx-1 flex-shrink-0" />
              <button 
                onClick={undoCanvas}
                className="text-xl sm:text-2xl hover:scale-110 transition-transform disabled:opacity-50 flex-shrink-0"
                disabled={strokes.length === 0}
                title="Undo Last Stroke"
              >
                ↩️
              </button>
              <button 
                onClick={clearCanvas}
                className="text-xl sm:text-2xl hover:scale-110 transition-transform disabled:opacity-50 flex-shrink-0"
                disabled={strokes.length === 0}
                title="Clear Canvas"
              >
                🗑️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
