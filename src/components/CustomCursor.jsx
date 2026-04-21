import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = { x: 0, y: 0 };
  const ringPos = { x: 0, y: 0 };

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      
      // Immediate dot move
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.x}px, ${mousePos.y}px)`;
      }
    };

    const animate = () => {
      // Smooth lag effect for the outer ring
      const lag = 0.15;
      ringPos.x += (mousePos.x - ringPos.x) * lag;
      ringPos.y += (mousePos.y - ringPos.y) * lag;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationId = requestAnimationFrame(animate);

    // Initial positioning to avoid (0,0) jump
    mousePos.x = window.innerWidth / 2;
    mousePos.y = window.innerHeight / 2;
    ringPos.x = mousePos.x;
    ringPos.y = mousePos.y;

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* The Central Black Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: '8px',
          height: '8px',
          backgroundColor: '#000000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      
      {/* The Smooth Delayed Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: -15,
          left: -15,
          width: '30px',
          height: '30px',
          border: '1px solid rgba(0, 0, 0, 0.15)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
