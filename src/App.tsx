import * as React from 'react';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import SpaceBackground from './components/SpaceBackground';
import LightBackground from './components/LightBackground';
import { Box, Container, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './index.css';
import { createAppTheme } from './theme';
import type { PaletteMode } from '@mui/material';

const App = () => {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const theme = createAppTheme(mode);
  const toggleColorMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Expose the fixed canvas when dark — body background would otherwise cover z-index:-1 */}
      {mode === 'dark' && (
        <GlobalStyles styles={{ body: { backgroundColor: 'transparent !important' } }} />
      )}
      <SpaceBackground />
      <LightBackground />
      <Container maxWidth="xl" disableGutters>
        <Router>
          <Box
            component="a"
            href="#main-content"
            sx={{
              position: 'fixed',
              top: 12,
              left: 12,
              zIndex: 1400,
              px: 2,
              py: 1,
              borderRadius: 1,
              bgcolor: 'background.paper',
              color: 'text.primary',
              fontWeight: 700,
              textDecoration: 'none',
              transform: 'translateY(-160%)',
              transition: 'transform 0.2s ease-out',
              '&:focus': { transform: 'translateY(0)' },
            }}>
            Skip to content
          </Box>
          <NavigationBar mode={mode} toggleColorMode={toggleColorMode} />
          <Box component="main" id="main-content" tabIndex={-1} sx={{ outline: 'none' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </Box>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
