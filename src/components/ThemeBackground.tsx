import { Box } from '@mui/material';
import { colorModeTransition } from '../theme';

const ThemeBackground = () => {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: 'background.default',
        transition: colorModeTransition('background-color'),
      }}
    />
  );
};

export default ThemeBackground;
