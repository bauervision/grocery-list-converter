import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fab,
  Fade,
  Grow,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const GROW_TIMEOUT = 420; // ms

interface ImpulseFabProps {
  show: boolean;
}

const ImpulseFab: React.FC<ImpulseFabProps> = ({ show }) => {
  const [open, setOpen] = useState(false); // dialog open/close
  const [showDialogBox, setShowDialogBox] = useState(false); // box is mounted
  const [item, setItem] = useState('');
  const [section, setSection] = useState('');
  const [price, setPrice] = useState('');

  // When open is true, show dialog box immediately
  useEffect(() => {
    if (open) setShowDialogBox(true);
    // When open becomes false, wait for exit animation to finish
    else if (showDialogBox) setTimeout(() => setShowDialogBox(false), GROW_TIMEOUT);
    // eslint-disable-next-line
  }, [open]);

  const handleAdd = () => {
    setOpen(false);
    setItem('');
    setSection('');
    setPrice('');
  };

  // Prevent click on dialog box from closing backdrop
  const handleBoxClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      <Fade in={show} timeout={2000}>
        <Fab
          color="secondary"
          aria-label="add"
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            zIndex: 200,
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </Fade>
      {/* Stylish, animated dialog inside device */}
      <Backdrop
        open={showDialogBox}
        sx={{
          zIndex: 300,
          position: 'absolute',
          color: '#000',
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(80, 80, 120, 0.10)',
        }}
        onClick={() => setOpen(false)}
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
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 3,
                py: 2,
                mb: 1,
              }}
            >
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <ShoppingCartIcon />
              </Avatar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Add Impulse Item
              </Typography>
            </Stack>
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Item Name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                fullWidth
                autoFocus
                variant="filled"
              />
              <TextField
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                fullWidth
                variant="filled"
              />
              <TextField
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))}
                fullWidth
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                variant="filled"
                InputProps={{
                  startAdornment: <span style={{ color: '#888', marginRight: 2 }}>$</span>,
                }}
              />
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Button onClick={() => setOpen(false)} fullWidth variant="outlined" color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleAdd}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!item || !section || !price}
                  sx={{
                    boxShadow: '0 2px 8px rgba(67, 66, 90, 0.16)',
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grow>
      </Backdrop>
    </>
  );
};

export default ImpulseFab;
