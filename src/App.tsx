import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRef, useState } from 'react';
import DeviceDialogBox from './components/DeviceDialogBox';
import DeviceFrame from './components/DeviceFrame';
import ImpulseFab from './components/ImpulseFab';
import { devicePresets } from './devicePresets';
import MobileApp from './MobileApp';

export default function AppShowcase() {
  const [device, setDevice] = useState(devicePresets[0]);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);
  const [impulseOpen, setImpulseOpen] = useState(false);

  // Called when Fab is clicked
  const handleImpulseClick = () => {
    setImpulseOpen(true);
  };

  // Called when dialog is closed
  const handleImpulseClose = () => {
    setImpulseOpen(false);
  };

  const [item, setItem] = useState('');
  const [section, setSection] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    setImpulseOpen(false);
    setItem('');
    setSection('');
    setPrice('');
  };

  return (
    <Box
      className="animated-gradient "
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        p: 4,
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left column */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              background: 'rgba(30, 34, 44, 0.70)', // Semi-transparent dark
              boxShadow: '0 4px 32px 0 rgba(0,0,0,0.22)',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)', // For glass effect
              border: '1.5px solid rgba(255,255,255,0.15)',
              p: 3,
              m: 2,
              minWidth: 250,
              transition: 'box-shadow 0.3s, border 0.3s',
              '&:hover': {
                boxShadow: '0 8px 48px 0 rgba(0,0,0,0.38)',
                border: '1.5px solid rgba(255,255,255,0.28)',
              },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Select
                value={device.name}
                onChange={(e) => {
                  const found =
                    devicePresets.find((d) => d.name === e.target.value) || devicePresets[0];
                  setDevice(found);
                }}
                size="small"
                sx={{ minWidth: 180, bgcolor: '#fff' }}
              >
                {devicePresets.map((d) => (
                  <MenuItem value={d.name} key={d.name}>
                    {d.name} ({d.width}×{d.height})
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="h5" gutterBottom>
                Grocery List Converter
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>What is this?</strong>
                <br />
                This app helps you shop smarter: Paste your grocery list, and it’ll automatically
                reorder it based on your store layout. Swipe to check off items as you shop—no more
                zig-zagging across the store!
              </Typography>
              <Typography variant="body2">
                <strong>How to use:</strong>
                <ol>
                  <li>Paste your grocery list.</li>
                  <li>Example list to try:</li>
                  <li>pt, tp, bread, coffee, sugar, apples</li>
                  <li>Customize your store's aisles if you want.</li>
                  <li>Go shopping! Swipe items as you pick them up.</li>
                  <li>Restore or review acquired items anytime.</li>
                  <li>Add impulse buys with the + button.</li>
                </ol>

                <strong>Example list to try: copy and paste the list below into the app</strong>
                <ul>
                  <li>pt, tp, bread, coffee, sugar, apples, milk, ice cream, wine, steaks</li>
                </ul>
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Center: Device frame */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: 'center', cursor: 'none', position: 'relative' }}
        >
          <Box
            sx={{
              width: device.width,
              height: device.height,
              mx: 'auto',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <DeviceFrame ref={deviceRef} width={device.width} height={device.height}>
              {/* Render the main app view here */}
              <MobileApp
                deviceContainer={deviceRef}
                tab={tab}
                setTab={setTab}
                onImpulseClick={handleImpulseClick}
              />
            </DeviceFrame>

            {/* Only render the Fab when desired tab is active */}
            {tab === 2 && (
              <ImpulseFab
                show
                onClick={handleImpulseClick}
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  right: 40,
                  pointerEvents: 'auto',
                  zIndex: 100,
                }}
              />
            )}
            <DeviceDialogBox open={impulseOpen} onClose={handleImpulseClose}>
              {/* ---- This is your content ---- */}
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
                  <Button
                    onClick={() => setImpulseOpen(false)}
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
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
              {/* ---- End content ---- */}
            </DeviceDialogBox>
          </Box>
        </Grid>

        {/* Right: Tips or FAQ */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              background: 'rgba(30, 34, 44, 0.70)', // Semi-transparent dark
              boxShadow: '0 4px 32px 0 rgba(0,0,0,0.22)',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)', // For glass effect
              border: '1.5px solid rgba(255,255,255,0.15)',
              p: 3,
              m: 2,
              minWidth: 250,
              transition: 'box-shadow 0.3s, border 0.3s',
              '&:hover': {
                boxShadow: '0 8px 48px 0 rgba(0,0,0,0.38)',
                border: '1.5px solid rgba(255,255,255,0.28)',
              },
            }}
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Pro Tips
              </Typography>
              <ul style={{ paddingLeft: 18 }}>
                <li>Tap the pencil to adjust quantity.</li>
                <li>Swipe left or right to “acquire” an item.</li>
                <li>Click the “Show Acquired” button to review cart items.</li>
                <li>
                  Impulse purchase? Tap <b>+</b> and add it to your list.
                </li>
              </ul>
              <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                Try resizing the device for different mobile views!
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
