// src/MobileApp.tsx
import { AppBar, Box, Paper, Slide, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import ImpulseFab from './components/ImpulseFab';
import ListConversion from './modes/ListConversion';
import ShoppingMode from './modes/ShoppingMode';
import StoreEdit from './modes/StoreEdit';

const tabLabels = ['List Conversion', 'Store Editing', 'Shopping'];
type MobileAppProps = {
  deviceContainer: React.RefObject<HTMLDivElement | null>;
};

export default function MobileApp({ deviceContainer }: MobileAppProps) {
  const [tab, setTab] = useState(0);

  // You can lift impulse handling logic here if you want

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafbfc',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar position="static" color="primary" elevation={2} sx={{ borderRadius: 0 }}>
        <Toolbar variant="dense" sx={{ minHeight: 48 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 20 }}>
            Grocery List Converter
          </Typography>
        </Toolbar>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ minHeight: 40 }}
        >
          {tabLabels.map((label) => (
            <Tab key={label} label={label} sx={{ fontSize: 14, minHeight: 40 }} />
          ))}
        </Tabs>
      </AppBar>

      {/* Animated content container */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          height: 0,
          minHeight: 0,
          overflow: 'hidden', // Hide scrollbars always
        }}
      >
        {/* Slide for each tab */}
        <Slide direction="down" in={tab === 0} mountOnEnter unmountOnExit timeout={400}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
              bottom: 0,
              height: '100%',
              p: 2,
              overflowY: 'auto',
              // Hide scrollbar on all browsers
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Paper
              elevation={1}
              sx={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(3px)',
                boxShadow: '0 2px 12px rgba(80,80,120,0.07)',
                minHeight: 400,
                borderRadius: 2,
                p: 2,
              }}
            >
              <ListConversion />
            </Paper>
          </Box>
        </Slide>
        <Slide direction="down" in={tab === 1} mountOnEnter unmountOnExit timeout={400}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
              bottom: 0,
              height: '100%',
              p: 2,
              overflowY: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Paper elevation={1} sx={{ minHeight: 400, borderRadius: 2, p: 2 }}>
              <StoreEdit />
            </Paper>
          </Box>
        </Slide>
        <Slide direction="down" in={tab === 2} mountOnEnter unmountOnExit timeout={400}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
              bottom: 0,
              height: '100%',
              p: 2,
              overflowY: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Paper elevation={1} sx={{ minHeight: 400, borderRadius: 2, p: 2 }}>
              <ShoppingMode />
            </Paper>
          </Box>
        </Slide>
      </Box>

      <ImpulseFab show={tab === 2} />
    </Box>
  );
}
