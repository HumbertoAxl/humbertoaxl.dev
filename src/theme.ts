import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

export const RESUME_CONTENT_WIDTH = 1100;

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6b5278' : '#5b8de8',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f3f0e9' : '#0d1526',
        paper: mode === 'light' ? '#ebe7e3' : '#1a2540',
      },
      text: {
        primary: mode === 'light' ? '#27232a' : '#e8edf7',
        secondary: mode === 'light' ? '#514e55' : '#8fa3c0',
      },
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: `3px solid ${mode === 'light' ? 'rgba(107, 82, 120, 0.32)' : 'rgba(91, 141, 232, 0.42)'}`,
              outlineOffset: 3,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&.Mui-focusVisible': {
              outline: `3px solid ${mode === 'light' ? 'rgba(107, 82, 120, 0.32)' : 'rgba(91, 141, 232, 0.42)'}`,
              outlineOffset: 3,
            },
          },
        },
      },
    },
  });

export default createAppTheme('light');
