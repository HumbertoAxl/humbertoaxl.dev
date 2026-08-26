import { Box, Button, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import profilePic from '@/assets/profile-pic.png';
import { HERO_STAR_BACKGROUND } from '../visualAssets';
import { motion, useReducedMotion } from 'framer-motion';
import { colorModeTransition } from '../theme';

const NAVBAR_HEIGHT = 64;

// Deterministic, tileable starfield used as the dark-mode hero background until a real
// photograph is supplied via HERO_STAR_BACKGROUND (see src/visualAssets.ts).
const STARFIELD_TILE = 280;
const STARFIELD_BACKGROUND = (() => {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const dim = Array.from({ length: 26 }, () => {
    const cx = (rand() * STARFIELD_TILE).toFixed(1);
    const cy = (rand() * STARFIELD_TILE).toFixed(1);
    const r = (0.5 + rand() * 1.1).toFixed(2);
    const o = (0.2 + rand() * 0.55).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#e8edf7" opacity="${o}"/>`;
  }).join('');

  const bright = Array.from({ length: 3 }, () => {
    const cx = (rand() * STARFIELD_TILE).toFixed(1);
    const cy = (rand() * STARFIELD_TILE).toFixed(1);
    const r = (1.3 + rand() * 0.6).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" opacity="0.92" filter="url(#starGlow)"/>`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${STARFIELD_TILE}" height="${STARFIELD_TILE}" viewBox="0 0 ${STARFIELD_TILE} ${STARFIELD_TILE}">
    <defs>
      <filter id="starGlow" x="-300%" y="-300%" width="700%" height="700%">
        <feGaussianBlur stdDeviation="0.6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="${STARFIELD_TILE}" height="${STARFIELD_TILE}" fill="#050b1a"/>
    ${dim}
    ${bright}
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
})();

const scrollTo = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }
};

const Hero = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const reduceMotion = useReducedMotion();
  const darkHeroBackground = HERO_STAR_BACKGROUND
    ? `linear-gradient(90deg, rgba(5, 12, 28, 0.42), rgba(5, 12, 28, 0.68)),
       url("${HERO_STAR_BACKGROUND}"),
       radial-gradient(ellipse at 42% 38%, ${alpha('#5b8de8', 0.18)}, transparent 35%)`
    : `linear-gradient(90deg, rgba(5, 12, 28, 0.4), rgba(5, 12, 28, 0.66)),
       radial-gradient(ellipse at 42% 38%, ${alpha('#5b8de8', 0.22)}, transparent 40%),
       radial-gradient(ellipse at 82% 78%, ${alpha('#7c4fc8', 0.16)}, transparent 42%),
       url("${STARFIELD_BACKGROUND}")`;
  const lightHeroBackground = `radial-gradient(ellipse at 78% 32%, ${alpha('#6b5278', 0.1)}, transparent 31%),
    radial-gradient(circle, ${alpha('#6b5278', 0.22)} 0 1px, transparent 1.2px)`;

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        minHeight: '100svh',
        pt: { xs: 'calc(64px + 40px)', md: 'calc(64px + 56px)' },
        pb: { xs: 5, md: 7 },
        display: 'grid',
        alignContent: 'center',
        overflow: 'hidden',
        bgcolor: isDark ? '#071022' : 'background.default',
        transition: colorModeTransition('background-color'),
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          zIndex: -3,
          inset: 0,
          opacity: isDark ? 0 : 1,
          backgroundImage: lightHeroBackground,
          backgroundSize: 'auto, 28px 28px',
          backgroundPosition: 'center',
          transition: colorModeTransition('opacity'),
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          zIndex: -2,
          inset: 0,
          opacity: isDark ? 1 : 0,
          backgroundImage: darkHeroBackground,
          backgroundSize: HERO_STAR_BACKGROUND
            ? 'auto, cover, auto'
            : `auto, auto, auto, ${STARFIELD_TILE}px ${STARFIELD_TILE}px`,
          backgroundPosition: 'center',
          transition: colorModeTransition('opacity'),
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          zIndex: -1,
          inset: 0,
          opacity: isDark ? 0.68 : 0,
          background:
            'linear-gradient(132deg, transparent 24%, rgba(91, 141, 232, 0.13) 43%, rgba(232, 237, 247, 0.12) 48%, transparent 62%)',
          transition: colorModeTransition('opacity'),
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0.78, filter: 'blur(7px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <Box sx={{ width: '100%', maxWidth: 1536, mx: 'auto', px: { xs: 3, md: 8 } }}>
          <Grid container alignItems="center" spacing={{ xs: 5, md: 7 }}>
            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}
            >
              <Typography
              component="h1"
              sx={{
                color: 'text.primary',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                lineHeight: 0.98,
                fontSize: { xs: 'clamp(3.25rem, 14vw, 4.6rem)', md: 'clamp(4.5rem, 6.5vw, 6rem)' },
                letterSpacing: '-0.035em',
              }}
            >
              Humberto Axl
            </Typography>

            <Typography
              component="p"
              sx={{
                mt: { xs: 2, md: 2.5 },
                color: 'primary.main',
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '1.45rem', md: '2rem' },
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Full Stack Developer
            </Typography>

            <Box
              aria-hidden
              sx={{
                width: { xs: 48, md: 64 },
                height: 2,
                mx: { xs: 'auto', md: 0 },
                mt: 3,
                bgcolor: 'primary.main',
                borderRadius: 1,
                opacity: 0.82,
              }}
            />

            <Typography
              sx={{
                mt: 3.5,
                color: 'text.secondary',
                maxWidth: '60ch',
                mx: { xs: 'auto', md: 0 },
                lineHeight: 1.75,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              I build practical software solutions across modern and legacy codebases, translating
              business requirements into reliable frontend and backend experiences.
            </Typography>

            <Box
              sx={{
                mt: 4,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollTo('experience')}
                sx={{ minHeight: 52, px: { xs: 3, md: 4.5 }, borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
              >
                View Experience
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollTo('contact')}
                sx={{
                  minHeight: 52,
                  px: { xs: 3, md: 4.5 },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  color: 'primary.main',
                  borderColor: alpha(theme.palette.primary.main, 0.68),
                  bgcolor: alpha(theme.palette.background.default, isDark ? 0.38 : 0.48),
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                Contact me
              </Button>
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{ display: 'flex', justifyContent: 'center', order: { xs: 1, md: 2 } }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 280, sm: 320, md: 400 },
                  aspectRatio: '1',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px dashed',
                    borderColor: 'primary.main',
                    opacity: isDark ? 0.42 : 0.34,
                    animation: reduceMotion ? 'none' : 'portrait-ring-spin 30s linear infinite',
                    '@keyframes portrait-ring-spin': {
                      from: { transform: 'rotate(0deg)' },
                      to: { transform: 'rotate(360deg)' },
                    },
                  }}
                />

                <Box
                  sx={{
                    width: { xs: 240, sm: 272, md: 340 },
                    height: { xs: 240, sm: 272, md: 340 },
                    borderRadius: '50%',
                    border: '3px solid',
                    borderColor: 'primary.main',
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    boxShadow: isDark
                      ? `0 18px 60px ${alpha(theme.palette.primary.main, 0.2)}`
                      : '0 18px 52px rgba(39, 35, 42, 0.13)',
                  }}
                >
                  <Box
                    component="img"
                    src={profilePic}
                    alt="Humberto Axl"
                    width={340}
                    height={340}
                    loading="eager"
                    decoding="async"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

      </motion.div>
    </Box>
  );
};

export default Hero;
