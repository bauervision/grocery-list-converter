import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';

const DragToScrollBox: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  // Mouse handlers for desktop drag-scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStartY.current = e.clientY;
    dragStartScroll.current = ref.current?.scrollTop ?? 0;
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    if (ref.current) {
      const deltaY = e.clientY - dragStartY.current;
      ref.current.scrollTop = dragStartScroll.current - deltaY;
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };

  // Touch handlers for mobile drag-scroll (will not interfere with native scroll, just for completeness)
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    dragStartY.current = e.touches[0].clientY;
    dragStartScroll.current = ref.current?.scrollTop ?? 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    if (ref.current) {
      const deltaY = e.touches[0].clientY - dragStartY.current;
      ref.current.scrollTop = dragStartScroll.current - deltaY;
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  return (
    <Box
      ref={ref}
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        position: 'relative',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </Box>
  );
};

export default DragToScrollBox;
