// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6750A4' },
    secondary: { main: '#625B71' },
    background: { default: '#F3EDF7', paper: '#FFF' },
    // Use more M3 colors as desired
  },
  shape: { borderRadius: 12 },
  // Optionally add typography, shadows, etc.
});

export default theme;
