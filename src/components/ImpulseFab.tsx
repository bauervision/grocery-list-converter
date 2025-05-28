import AddIcon from '@mui/icons-material/Add';
import { Fab, Fade, SxProps, Theme } from '@mui/material';
import React from 'react';

interface ImpulseFabProps {
  show?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const ImpulseFab: React.FC<ImpulseFabProps> = ({ show = true, onClick }) => (
  <Fade in={show} timeout={2000}>
    <Fab
      color="secondary"
      aria-label="add"
      sx={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        zIndex: 200,
        pointerEvents: 'auto',
        cursor: 'none',
      }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  </Fade>
);

export default ImpulseFab;
