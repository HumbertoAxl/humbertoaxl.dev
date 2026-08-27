import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

export const RESUME_CONTENT_WIDTH = 1100;
export const SECTION_VERTICAL_PADDING = { xs: 2, md: 3 } as const;
export const FIRST_SECTION_TOP_PADDING = { xs: 6, md: 8 } as const;
export const COLOR_MODE_TRANSITION_MS = 360;
export const COLOR_MODE_TRANSITION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const colorModeTransition = (...properties: string[]) =>
  properties
    .map(
      (property) =>
        `${property} var(--color-mode-transition-duration) var(--color-mode-transition-easing)`,
    )
    .join(', ');

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6b5278' : '#5b8de8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#6b5278' : '#a98bc1',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f3f0e9' : '#0d1526',
        paper: mode === 'light' ? '#e4ded9' : '#1a2540',
      },
      text: {
        primary: mode === 'light' ? '#27232a' : '#e8edf7',
        secondary: mode === 'light' ? '#514e55' : '#ccd3dd',
      },
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--color-mode-transition-duration': `${COLOR_MODE_TRANSITION_MS}ms`,
            '--color-mode-transition-easing': COLOR_MODE_TRANSITION_EASING,
          },
          body: {
            transition: colorModeTransition('background-color', 'color'),
          },
          '.MuiBox-root, .MuiTypography-root, .MuiPaper-root, .MuiButton-root, .MuiIconButton-root, .MuiOutlinedInput-root, .MuiFilledInput-root, .MuiInputLabel-root, .MuiFormHelperText-root, .MuiSvgIcon-root, .MuiDivider-root': {
            transitionProperty: 'color, background-color, border-color, box-shadow, opacity',
            transitionDuration: 'var(--color-mode-transition-duration)',
            transitionTimingFunction: 'var(--color-mode-transition-easing)',
          },
          '@media (prefers-reduced-motion: reduce)': {
            ':root': {
              '--color-mode-transition-duration': '0.01ms',
            },
          },
        },
      },
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
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#e4ded9' : '#1a2540',
            borderRadius: 8,
            '&:hover': {
              backgroundColor: mode === 'light' ? '#e4ded9' : '#1a2540',
            },
            '&.Mui-focused': {
              backgroundColor: mode === 'light' ? '#e4ded9' : '#1a2540',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
              WebkitBoxShadow: `0 0 0 1000px ${mode === 'light' ? '#e4ded9' : '#1a2540'} inset`,
              WebkitTextFillColor: mode === 'light' ? '#27232a' : '#e8edf7',
              caretColor: mode === 'light' ? '#27232a' : '#e8edf7',
              borderRadius: 'inherit',
            },
          },
        },
      },
    },
  });

export default createAppTheme('light');
