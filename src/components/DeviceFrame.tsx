import { Box } from '@mui/material';
import React, { forwardRef } from 'react';

const DeviceFrame = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ width: number; height: number }>
>(({ width, height, children }, ref) => (
  <Box
    ref={ref}
    sx={{
      width,
      height,
      mx: 'auto',
      border: '8px solid #333',
      borderRadius: '2.5rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      overflow: 'hidden',
      background: '#fff',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      touchAction: 'manipulation',
    }}
  >
    {children}
  </Box>
));

export default DeviceFrame;
