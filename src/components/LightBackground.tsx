import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LightBackground = () => {
  const theme = useTheme();

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: theme.palette.mode === 'light' ? 1 : 0,
        transition: 'opacity 0.5s',
        backgroundColor: 'background.default',
        backgroundImage: 'radial-gradient(circle, rgba(107,82,120,0.09) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
        // Subtle slow drift across the grid
        animation: 'dotDrift 60s linear infinite',
        '@keyframes dotDrift': {
          from: { backgroundPosition: '0 0' },
          to:   { backgroundPosition: '26px 26px' },
        },
      }}
    />
  );
};

export default LightBackground;
