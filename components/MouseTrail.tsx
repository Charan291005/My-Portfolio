'use client';
import { useEffect, useRef } from 'react';

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number; y: number; life: number; maxLife: number; vx: number; vy: number }[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle by distance to avoid spawning thousands of points
      const dist = Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y);
      if (dist < 10) return; // Only spawn if moved a bit
      lastPos = { x: e.clientX, y: e.clientY };

      // Add a couple points for a "scribble" effect
      for(let i=0; i<2; i++) {
        points.push({
          x: e.clientX + (Math.random() - 0.5) * 15,
          y: e.clientY + (Math.random() - 0.5) * 15,
          life: 1,
          maxLife: Math.random() * 25 + 15, // Shorter life
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5
        });
      }

      // If animation loop stopped, restart it
      if (!isAnimating) {
        isAnimating = true;
        render();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let isAnimating = true; // start true in case of immediate mouse move

    const render = () => {
      if (points.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isAnimating = false;
        return; // Stop loop when empty to save CPU
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // We want a pencil-like aesthetic: dark grey, varying opacity
      ctx.strokeStyle = '#2d2d2d';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const opacity = 1 - (p.life / p.maxLife);
        
        if (p.life >= p.maxLife) {
          points.splice(i, 1);
          i--;
          continue;
        }

        // Draw tiny scribbles
        ctx.globalAlpha = opacity * 0.4; // Max opacity 40%
        
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          // Draw lines between nearby points to create a sketchy look
          const prev = points[i - 1];
          const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
          if (dist < 30) {
            ctx.lineTo(p.x, p.y);
          } else {
            ctx.moveTo(p.x, p.y);
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99]"
      style={{ opacity: 0.8 }}
    />
  );
}
