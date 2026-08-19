'use client';
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhysicsPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) {
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current = null;
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      return;
    }

    const { Engine, Render, Runner, MouseConstraint, Mouse, World, Bodies, Composite } = Matter;

    const engine = Engine.create({
      enableSleeping: true,
    });
    engineRef.current = engine;
    
    if (!sceneRef.current) return;
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      }
    });
    renderRef.current = render;

    // Borders
    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(engine.world, [
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
      Bodies.rectangle(width / 2, -50, width, 100, wallOptions), // Ceiling
      Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
      Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions)
    ]);

    // Add elements to throw around
    const colors = ['#fff176', '#f48fb1', '#bbdefb', '#c8e6c9', '#ffb74d'];
    const items: Matter.Body[] = [];
    
    // Create sticky notes
    for (let i = 0; i < 20; i++) {
      const size = 60 + Math.random() * 30;
      const body = Bodies.rectangle(
        Math.random() * width, 
        Math.random() * -800, // fall from top
        size, 
        size, 
        {
          restitution: 0.6,
          friction: 0.1,
          frictionAir: 0.02,
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)],
            strokeStyle: '#2d2d2d',
            lineWidth: 3
          }
        }
      );
      items.push(body);
    }
    
    // Create some circles (doodle balls)
    for (let i = 0; i < 10; i++) {
      const r = 20 + Math.random() * 20;
      const body = Bodies.circle(
        Math.random() * width, 
        Math.random() * -1000, 
        r, 
        {
          restitution: 0.9,
          friction: 0.05,
          render: {
            fillStyle: '#fff',
            strokeStyle: '#4a90d9',
            lineWidth: 4
          }
        }
      );
      items.push(body);
    }

    World.add(engine.world, items);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    World.add(engine.world, mouseConstraint);
    
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle window resize
    const handleResize = () => {
      if (!sceneRef.current || !renderRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      
      renderRef.current.canvas.width = newWidth;
      renderRef.current.canvas.height = newHeight;
      renderRef.current.options.width = newWidth;
      renderRef.current.options.height = newHeight;
      
      // We'd ideally reposition walls here but for simplicity we'll just let them be
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, [isActive]);

  return (
    <div className="w-full mb-16 relative z-10">
      <div className="text-center mb-6">
        <button 
          onClick={() => setIsActive(!isActive)}
          className="btn-secondary"
        >
          {isActive ? 'Turn Off Gravity' : '🧪 Open Physics Playground'}
        </button>
      </div>
      
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 500, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-5xl mx-auto border-4 border-dashed border-ink/30 rounded-xl overflow-hidden bg-white/40 cursor-grab active:cursor-grabbing relative"
          >
            <div ref={sceneRef} className="absolute inset-0" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 font-heading text-ink-light pointer-events-none text-2xl tracking-wider">
              Drag and Throw!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
