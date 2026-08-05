import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import profilePic from '@/assets/profile-pic.jpg';
import { motion, useReducedMotion } from 'framer-motion';

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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0.72, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
      <Box
        id="home"
        sx={{
          px: { xs: 3, md: 8 },
          py: { xs: 8, md: 0 },
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflowX: 'clip',
        }}>
        <Grid container alignItems="center" spacing={{ xs: 5, md: 6 }} sx={{ width: '100%' }}>

          {/* Text column */}
          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                lineHeight: 1.05,
                fontSize: { xs: '3.2rem', md: '5rem' },
                letterSpacing: '-0.03em',
              }}>
              Hey, I'm
              <Box component="span" sx={{ display: 'block', color: 'primary.main' }}>
                Humberto Axl
              </Box>
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 2.5,
                mb: 2,
                fontSize: { xs: '1.15rem', md: '1.35rem' },
                fontWeight: 650,
                color: 'text.primary',
              }}>
              Full Stack Developer
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: '65ch', mx: { xs: 'auto', md: 0 }, lineHeight: 1.8, fontSize: '1.1rem', mb: 4.5 }}>
              I build modern web applications with clean code and intuitive interfaces. From
              Angular frontends to .NET backends — I care about shipping things that{' '}
              <Box component="em" sx={{ color: 'text.primary', fontStyle: 'normal', fontWeight: 500 }}>
                actually work in production.
              </Box>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollTo('experience')}
                sx={{ minHeight: { xs: 44, md: 52 }, fontWeight: 600, px: { xs: 2.75, md: 5 }, py: { xs: 1, md: 1.5 }, borderRadius: 2, textTransform: 'none', fontSize: { xs: '0.9rem', md: '1.05rem' } }}>
                View My Work
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollTo('about')}
                sx={{
                  minHeight: { xs: 44, md: 52 },
                  fontWeight: 600,
                  px: { xs: 2.75, md: 5 },
                  py: { xs: 1, md: 1.5 },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: { xs: '0.9rem', md: '1.05rem' },
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                  borderColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.7 : 0.55),
                  backgroundColor: alpha(theme.palette.background.default, theme.palette.mode === 'dark' ? 0.64 : 0.58),
                  backdropFilter: 'blur(10px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 28px rgba(2, 5, 18, 0.24)'
                    : '0 6px 20px rgba(39, 35, 42, 0.08)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: alpha(theme.palette.background.default, theme.palette.mode === 'dark' ? 0.78 : 0.72),
                  },
                }}>
                About Me
              </Button>
            </Box>
          </Grid>

          {/* Photo column */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{ display: 'flex', justifyContent: 'center', order: { xs: 1, md: 2 } }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Outer decorative dashed ring */}
              <Box sx={{
                position: 'absolute',
                width: { xs: 280, md: 400 },
                height: { xs: 280, md: 400 },
                borderRadius: '50%',
                border: '1px dashed',
                borderColor: 'primary.main',
                opacity: 0.35,
                animation: reduceMotion ? 'none' : 'spin 30s linear infinite',
                '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
              }} />
              {/* Photo */}
              <Box sx={{
                width: { xs: 240, md: 340 },
                height: { xs: 240, md: 340 },
                borderRadius: '50%',
                border: '3px solid',
                borderColor: 'primary.main',
                overflow: 'hidden',
                boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.2)}, 0 4px 16px rgba(0,0,0,0.1)`,
              }}>
                <Box
                  component="img"
                  src={profilePic}
                  alt="Humberto Axl"
                  width={340}
                  height={340}
                  loading="eager"
                  decoding="async"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Scroll indicator */}
        <IconButton
          onClick={() => scrollTo('experience')}
          aria-label="Scroll to experience"
          sx={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            width: 44,
            height: 44,
            color: 'text.secondary',
            opacity: 0.72,
            transition: 'color 0.2s ease-out, opacity 0.2s ease-out',
            '&:hover': { opacity: 1, color: 'primary.main' },
          }}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </motion.div>
  );
};

export default Hero;
