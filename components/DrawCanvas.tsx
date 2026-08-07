'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point { x: number; y: number }

export default function DrawCanvas() {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentColor, setCurrentColor] = useState('#2d2d2d');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = ['#2d2d2d', '#e74c3c', '#4a90d9', '#66bb6a', '#fff176'];

  useEffect(() => {
    if (!isDrawingMode || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const docWidth = document.documentElement.scrollWidth;
    const docHeight = document.documentElement.scrollHeight;
    canvas.width = docWidth * 2;
    canvas.height = docHeight * 2;
    canvas.style.width = `${docWidth}px`;
    canvas.style.height = `${docHeight}px`;

    const context = canvas.getContext('2d');
    if (context) {
      context.scale(2, 2);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = currentColor;
      context.lineWidth = 4;
      contextRef.current = context;
    }

    const handleResize = () => {
      // Just disable drawing mode on resize to avoid complex canvas rescaling for now
      setIsDrawingMode(false);
    };

    // Toggle global CSS class to hide custom cursor
    document.body.classList.add('drawing-mode');

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.classList.remove('drawing-mode');
      window.removeEventListener('resize', handleResize);
    };
  }, [isDrawingMode]); // Re-init when toggled

  // Update color
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = currentColor;
    }
  }, [currentColor]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) return;
    
    let drawX, drawY;
    if ('touches' in e) {
      drawX = e.touches[0].pageX;
      drawY = e.touches[0].pageY;
    } else {
      drawX = (e as React.MouseEvent).pageX;
      drawY = (e as React.MouseEvent).pageY;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(drawX, drawY);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    e.preventDefault(); // Prevent scrolling while drawing on touch devices

    let drawX, drawY;
    if ('touches' in e) {
      drawX = e.touches[0].pageX;
      drawY = e.touches[0].pageY;
    } else {
      drawX = (e as React.MouseEvent).pageX;
      drawY = (e as React.MouseEvent).pageY;
    }

    contextRef.current.lineTo(drawX, drawY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsDrawingMode(!isDrawingMode)}
        className="fixed bottom-8 left-8 z-[110] w-14 h-14 flex items-center justify-center rounded-full shadow-lg"
        style={{
          background: isDrawingMode ? '#fff' : '#fff176',
          border: '3px solid #2d2d2d',
          boxShadow: '4px 4px 0 #2d2d2d',
        }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-2xl">{isDrawingMode ? '❌' : '🖍️'}</span>
      </motion.button>

      {/* The Canvas Overlay */}
      <AnimatePresence>
        {isDrawingMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full z-[105]"
            style={{ 
              height: typeof document !== 'undefined' ? `${document.documentElement.scrollHeight}px` : '100vh',
              cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%232d2d2d"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/></svg>') 0 24, crosshair`
            }}
          >
            {/* Draw surface */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full touch-none"
            />

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
                onClick={clearCanvas}
                className="text-xl sm:text-2xl hover:scale-110 transition-transform disabled:opacity-50 flex-shrink-0"
                disabled={!hasDrawn}
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
