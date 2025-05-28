import { Box } from '@mui/material';
import React, { forwardRef, useRef, useState } from 'react';
import { TouchCursor } from './TouchCursor';

type DeviceFrameProps = React.PropsWithChildren<{ width: number; height: number }>;

const DeviceFrame = forwardRef<HTMLDivElement, DeviceFrameProps>(
  ({ width, height, children }, ref) => {
    const frameRef = useRef<HTMLDivElement | null>(null);
    const [dragging, setDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const dragStartY = useRef(0);
    const dragStartScroll = useRef(0);

    // Forward ref to parent if provided
    React.useImperativeHandle(ref, () => frameRef.current as HTMLDivElement, []);

    // Mouse drag scroll logic
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setDragging(true);
      dragStartY.current = e.clientY;
      dragStartScroll.current = frameRef.current?.scrollTop ?? 0;
      document.body.style.userSelect = 'none';
    };
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!dragging) return;
      if (frameRef.current) {
        const deltaY = e.clientY - dragStartY.current;
        frameRef.current.scrollTop = dragStartScroll.current - deltaY;
      }
    };
    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = '';
    };

    // Touch drag scroll logic
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setDragging(true);
      dragStartY.current = e.touches[0].clientY;
      dragStartScroll.current = frameRef.current?.scrollTop ?? 0;
    };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!dragging) return;
      if (frameRef.current) {
        const deltaY = e.touches[0].clientY - dragStartY.current;
        frameRef.current.scrollTop = dragStartScroll.current - deltaY;
      }
    };
    const handleTouchEnd = () => setDragging(false);

    return (
      <Box
        sx={{
          width,
          height,
          mx: 'auto',
          border: '8px solid #333',
          borderRadius: '2.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          background: '#fff',
          position: 'relative',
          overflow: 'hidden', // "Clip" content and overlays
          userSelect: 'none',
          touchAction: 'manipulation',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          cursor: 'none',
          '*': { cursor: 'none !important' },
        }}
        onMouseEnter={() => setIsOver(true)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={(e) => {
          handleMouseUp();
          setIsOver(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e) => e.preventDefault()}
        className="device-area"
      >
        {isOver && <TouchCursor />}

        {/* --- Scrollable content area --- */}
        <Box
          ref={frameRef}
          sx={{
            position: 'absolute',
            inset: 0,
            overflowY: 'auto',
            width: '100%',
            height: '100%',
            p: 0,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {isOver && <TouchCursor />}
          {children}
        </Box>
      </Box>
    );
  },
);

export default DeviceFrame;
