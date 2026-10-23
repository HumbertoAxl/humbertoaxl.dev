import { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import profilePic from '@/assets/profile-pic.png';
import { HERO_STAR_BACKGROUND } from '../visualAssets';
import { motion, useReducedMotion } from 'framer-motion';
import { colorModeTransition } from '../theme';
import SkyCanvas from './ui/SkyCanvas';

const NAVBAR_HEIGHT = 64;

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
  const portraitRef = useRef<HTMLImageElement>(null);
  const [portraitStatus, setPortraitStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;
    let cancelled = false;

    const showError = () => {
      if (!cancelled) setPortraitStatus('error');
    };
    const revealPortrait = async () => {
      try {
        await portrait.decode();
        if (!cancelled) setPortraitStatus('ready');
      } catch {
        showError();
      }
    };

    portrait.addEventListener('load', revealPortrait);
    portrait.addEventListener('error', showError);
    // Cached images can finish before the effect attaches the load listener.
    if (portrait.complete) {
      if (portrait.naturalWidth > 0) void revealPortrait();
      else showError();
    }

    return () => {
      cancelled = true;
      portrait.removeEventListener('load', revealPortrait);
      portrait.removeEventListener('error', showError);
    };
  }, []);
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
      {isDark && HERO_STAR_BACKGROUND ? (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            zIndex: -2,
            inset: 0,
            backgroundImage: `linear-gradient(90deg, rgba(5, 12, 28, 0.42), rgba(5, 12, 28, 0.68)), url("${HERO_STAR_BACKGROUND}")`,
            backgroundSize: 'auto, cover',
            backgroundPosition: 'center',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <SkyCanvas />
      )}

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
              Full-stack developer with{' '}
              <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>
                six years of experience
              </Box>{' '}
              building production software across government, defence simulation, and e-commerce,
              in both modern and legacy codebases.
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
                View experience
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
                  aria-busy={portraitStatus === 'loading'}
                  sx={{
                    position: 'relative',
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
                  {portraitStatus === 'loading' && (
                    <Skeleton
                      aria-hidden
                      variant="circular"
                      animation={reduceMotion ? false : 'pulse'}
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    />
                  )}
                  {portraitStatus === 'error' && (
                    <Box
                      role="img"
                      aria-label="Humberto Axl"
                      sx={{
                        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                        color: 'primary.main', fontSize: { xs: '3rem', md: '4rem' }, fontWeight: 700,
                      }}
                    >
                      HA
                    </Box>
                  )}
                  <Box
                    component="img"
                    ref={portraitRef}
                    src={profilePic}
                    alt="Humberto Axl"
                    width={340}
                    height={340}
                    loading="eager"
                    decoding="async"
                    aria-hidden={portraitStatus === 'error'}
                    sx={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      opacity: portraitStatus === 'ready' ? 1 : 0,
                      transition: `opacity ${reduceMotion ? 150 : 450}ms cubic-bezier(0.16, 1, 0.3, 1)`,
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
