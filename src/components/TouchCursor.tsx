import React, { useEffect, useRef, useState } from 'react';

const TOUCH_RADIUS = 32;

export const TouchCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        left: pos.x - TOUCH_RADIUS / 2,
        top: pos.y - TOUCH_RADIUS / 2,
        width: TOUCH_RADIUS,
        height: TOUCH_RADIUS,
        borderRadius: '50%',
        background: 'rgba(120,120,160,0.25)',
        border: '2px solid rgba(80,80,120,0.2)',
        boxShadow: '0 2px 8px rgba(40,40,60,0.06)',
        zIndex: 10000,
        transition: 'background 0.18s, border 0.15s',
        mixBlendMode: 'multiply',
      }}
    />
  );
};
