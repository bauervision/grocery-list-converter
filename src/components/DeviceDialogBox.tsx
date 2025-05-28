import { Backdrop, Box, Grow } from '@mui/material';
import React from 'react';

const GROW_TIMEOUT = 420;

interface DeviceDialogBoxProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DeviceDialogBox: React.FC<DeviceDialogBoxProps> = ({ open, onClose, children }) => {
  // Manage mounting for exit animation
  const [showBox, setShowBox] = React.useState(open);

  React.useEffect(() => {
    if (open) setShowBox(true);
    else if (showBox) setTimeout(() => setShowBox(false), GROW_TIMEOUT);
    // eslint-disable-next-line
  }, [open]);

  // Prevent click on dialog content from closing backdrop
  const handleBoxClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Backdrop
      open={showBox}
      sx={{
        zIndex: 300,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        color: '#000',
        backdropFilter: 'blur(3px)',
        backgroundColor: 'rgba(80, 80, 120, 0.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <Grow in={open} timeout={GROW_TIMEOUT}>
        <Box
          onClick={handleBoxClick}
          sx={{
            minWidth: 280,
            width: '94%',
            maxWidth: 360,
            borderRadius: 4,
            boxShadow: 8,
            bgcolor: 'background.paper',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            border: (theme) => `2.5px solid ${theme.palette.primary.main}30`,
            overflow: 'hidden',
            mt: { xs: -10, sm: -20 },
          }}
        >
          {children}
        </Box>
      </Grow>
    </Backdrop>
  );
};

export default DeviceDialogBox;
