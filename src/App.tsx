import * as React from 'react';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import ThemeBackground from './components/ThemeBackground';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './index.css';
import { colorModeTransition, createAppTheme } from './theme';
import type { PaletteMode } from '@mui/material';

const App = () => {
  const [mode, setMode] = React.useState<PaletteMode>(() => {
    const savedMode = window.localStorage.getItem('portfolio-color-mode');
    if (savedMode === 'light' || savedMode === 'dark') return savedMode;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);
  const toggleColorMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  React.useEffect(() => {
    window.localStorage.setItem('portfolio-color-mode', mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeBackground />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
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
              transition: colorModeTransition('transform', 'background-color', 'color'),
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
      </Box>
    </ThemeProvider>
  );
};

export default App;
