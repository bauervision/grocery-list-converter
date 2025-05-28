// src/MobileApp.tsx
import { AppBar, Box, Paper, Slide, Tab, Tabs, Toolbar, Typography } from '@mui/material';

import ListConversion from './modes/ListConversion';
import ShoppingMode from './modes/ShoppingMode';
import StoreEdit from './modes/StoreEdit';

const tabLabels = ['List Conversion', 'Store Editing', 'Shopping'];
type MobileAppProps = {
  deviceContainer: React.RefObject<HTMLDivElement | null>;
  tab: number;
  setTab: (tab: number) => void;
  onImpulseClick: () => void;
};

export default function MobileApp({
  deviceContainer,
  tab,
  setTab,
  onImpulseClick,
}: MobileAppProps) {
  return (
    <Box
      sx={{
        bgcolor: '#fafbfc',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <AppBar
        position="static"
        color="primary"
        elevation={2}
        sx={{ borderRadius: 0, zIndex: (theme) => theme.zIndex.drawer + 10 }}
      >
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
        }}
      >
        {/* Slide for each tab */}
        <Slide direction="down" in={tab === 0} mountOnEnter unmountOnExit timeout={400}>
          <Box
            sx={{
              p: 2,
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
              p: 2,
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
              p: 2,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                minHeight: 400,
                borderRadius: 2,
                p: 2,
              }}
            >
              <ShoppingMode />
            </Paper>
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}
