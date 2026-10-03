import React, { useEffect, useRef } from 'react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle canvas resizing
    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    // Pause when offscreen using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Render loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const barSpacing = Math.max(16, Math.floor(width / 60)); // ~60 vertical bars
      const numBars = Math.floor(width / barSpacing);
      const baselineY = height * 0.85;

      time += 0.02;

      for (let i = 0; i <= numBars; i++) {
        const x = i * barSpacing;
        
        // Base idle sine wave calculation
        const idleWave = prefersReducedMotion ? 0 : Math.sin(time + i * 0.18) * 15;
        const defaultHeight = height * 0.15 + idleWave;

        // Proximity calculation to mouse
        const dx = x - mouseX;
        const dy = baselineY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 180;

        let rise = 0;
        let isHovered = false;

        if (dist < radius && !prefersReducedMotion) {
          const factor = 1 - dist / radius;
          rise = factor * factor * 110;
          isHovered = true;
        }

        const currentBarHeight = Math.max(10, defaultHeight + rise);
        const topY = baselineY - currentBarHeight;

        // Styling gradient & color shift to Saffron near cursor
        ctx.lineWidth = Math.min(4, Math.max(2, barSpacing * 0.25));
        ctx.lineCap = 'round';

        if (isHovered && rise > 20) {
          // Glow and Saffron color shift
          ctx.strokeStyle = '#ffb21e';
          ctx.shadowColor = '#ffb21e';
          ctx.shadowBlur = 12;
        } else {
          // Majorelle cobalt / Slate baseline
          const opacity = Math.min(0.6, 0.15 + (i % 3) * 0.1);
          ctx.strokeStyle = `rgba(47, 69, 255, ${opacity})`;
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.moveTo(x, baselineY);
        ctx.lineTo(x, topY);
        ctx.stroke();

        // Little top data node point
        if (i % 2 === 0) {
          ctx.fillStyle = isHovered ? '#ffb21e' : 'rgba(236, 235, 227, 0.4)';
          ctx.beginPath();
          ctx.arc(x, topY - 3, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="canvas-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};
