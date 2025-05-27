import { Box, MenuItem, Paper, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRef, useState } from 'react';
import DeviceFrame from './components/DeviceFrame';
import { devicePresets } from './devicePresets';
import MobileApp from './MobileApp';

export default function AppShowcase() {
  const [device, setDevice] = useState(devicePresets[0]);
  const deviceRef = useRef<HTMLDivElement>(null);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5e9ff 0%, #d1eaff 100%)',
        p: 4,
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left column */}
        <Grid item xs={12} md={3}>
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
        </Grid>

        {/* Center: Device frame */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
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
          <DeviceFrame ref={deviceRef} width={device.width} height={device.height}>
            {/* Render the main app view here */}
            <MobileApp deviceContainer={deviceRef} />
            {/* Swap this for <App /> if you want the full app with tabs */}
          </DeviceFrame>
        </Grid>

        {/* Right: Tips or FAQ */}
        <Grid item xs={12} md={3}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
