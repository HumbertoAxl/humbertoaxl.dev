import * as React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import type { PaletteMode } from '@mui/material';
import { colorModeTransition } from '../theme';

interface Props {
  window?: () => Window;
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const NAVBAR_HEIGHT = 64;
const SECTION_READING_RATIO = 0.3;
const MAX_SECTION_READING_OFFSET = 200;
const drawerWidth = 240;
const navItems = [
  { label: 'Home',       sectionId: 'home'       },
  { label: 'Experience', sectionId: 'experience'  },
  { label: 'Skills',     sectionId: 'skills'      },
  { label: 'About',      sectionId: 'about'       },
  { label: 'Contact',    sectionId: 'contact'     },
];

function getActiveSection(): string {
  if (window.location.pathname !== '/') return '';

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll > 0 && window.scrollY >= maxScroll - 2) {
    return navItems[navItems.length - 1].sectionId;
  }

  const readingLine = NAVBAR_HEIGHT + Math.min(
    MAX_SECTION_READING_OFFSET,
    (window.innerHeight - NAVBAR_HEIGHT) * SECTION_READING_RATIO,
  );
  let closestSection = navItems[0].sectionId;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const { sectionId } of navItems) {
    const el = document.getElementById(sectionId);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= readingLine && rect.bottom > readingLine) {
        return sectionId;
      }

      const distance = rect.bottom <= readingLine
        ? readingLine - rect.bottom
        : rect.top - readingLine;
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = sectionId;
      }
    }
  }

  return closestSection;
}

export default function NavigationBar({ window: windowProp, mode, toggleColorMode }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState(navItems[0].sectionId);
  const [scrolled, setScrolled] = React.useState(false);
  const scrollTargetRef = React.useRef<string | null>(null);
  const scrollEndTimerRef = React.useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const releaseScrollTarget = React.useCallback(() => {
    scrollTargetRef.current = null;
    scrollEndTimerRef.current = null;
    setActiveSection(getActiveSection());
  }, []);

  const holdActiveSection = React.useCallback((sectionId: string) => {
    scrollTargetRef.current = sectionId;
    setActiveSection(sectionId);

    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }
    scrollEndTimerRef.current = window.setTimeout(releaseScrollTarget, 160);
  }, [releaseScrollTarget]);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.location.pathname === '/') {
        setScrolled(window.scrollY > 20);
        if (scrollTargetRef.current) {
          setActiveSection(scrollTargetRef.current);
          if (scrollEndTimerRef.current !== null) {
            window.clearTimeout(scrollEndTimerRef.current);
          }
          scrollEndTimerRef.current = window.setTimeout(releaseScrollTarget, 160);
        } else {
          setActiveSection(getActiveSection());
        }
      } else {
        setScrolled(true); // Always scrolled effect on other pages
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [location.pathname, releaseScrollTarget]);

  const scrollTo = (sectionId: string) => {
    holdActiveSection(sectionId);
    setMobileOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: top + 1, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  // Handle scrolling after navigation from another page
  React.useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          holdActiveSection(sectionId);
          const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: top + 1, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }, 100);
      // Clear state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [holdActiveSection, location, navigate]);

  const container = windowProp !== undefined ? () => windowProp().document.body : undefined;
  const brandNameColor = mode === 'dark' ? 'common.white' : 'primary.main';
  const brandNameSx = {
    color: brandNameColor,
    fontWeight: 700,
  } as const;

  // JSX variable — avoids the "component created during render" error
  const themeToggle = (
    <IconButton
      onClick={toggleColorMode}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={mode === 'dark'}
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      sx={(theme) => ({
        width: 76,
        height: 44,
        p: '6px',
        borderRadius: 999,
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, mode === 'dark' ? 0.32 : 0.26),
        bgcolor: mode === 'dark'
          ? alpha(theme.palette.common.white, 0.1)
          : alpha(theme.palette.common.white, 0.76),
        color: 'text.primary',
        overflow: 'hidden',
        transition: colorModeTransition('color', 'background-color', 'border-color', 'box-shadow'),
        '&:hover': {
          bgcolor: mode === 'dark'
            ? alpha(theme.palette.common.white, 0.15)
            : alpha(theme.palette.common.white, 0.94),
        },
      })}>
      <Box
        sx={{
          position: 'relative',
          width: 64,
          height: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 32px)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 2,
            left: mode === 'dark' ? 2 : 34,
            width: 28,
            height: 28,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            boxShadow: (theme) =>
              '0 3px 10px ' + alpha(theme.palette.common.black, mode === 'dark' ? 0.32 : 0.18),
            transition: colorModeTransition('left', 'background-color', 'box-shadow'),
          }}
        />
        <Box sx={{ zIndex: 1, display: 'grid', placeItems: 'center' }}>
          <DarkModeIcon
            aria-hidden
            sx={{ fontSize: 17, color: mode === 'dark' ? 'common.white' : 'text.secondary' }}
          />
        </Box>
        <Box sx={{ zIndex: 1, display: 'grid', placeItems: 'center' }}>
          <LightModeIcon
            aria-hidden
            sx={{ fontSize: 18, color: mode === 'light' ? 'common.white' : 'text.secondary' }}
          />
        </Box>
      </Box>
    </IconButton>
  );

  const navButtonSx = (sectionId: string) => ({
    color: activeSection === sectionId ? 'primary.main' : 'text.secondary',
    fontWeight: 500,
    fontSize: '0.9375rem',
    textTransform: 'none' as const,
    px: 1.5,
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 4,
      left: '50%',
      width: 4,
      height: 4,
      backgroundColor: 'primary.main',
      borderRadius: '50%',
      transform: activeSection === sectionId
        ? 'translateX(-50%) scale(1)'
        : 'translateX(-50%) scale(0)',
      transition: colorModeTransition('transform', 'background-color'),
    },
  });

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => scrollTo(item.sectionId)}
              sx={{
                textAlign: 'center',
                color: activeSection === item.sectionId ? 'primary.main' : 'text.primary',
                fontWeight: activeSection === item.sectionId ? 700 : 400,
              }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        aria-label="Primary navigation"
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
          color: 'text.primary',
          px: { xs: 1, sm: 2, md: 3 },
        }}>
        <Toolbar
          sx={(theme) => ({
            width: '100%',
            maxWidth: 1500,
            mx: 'auto',
            my: '6px',
            position: 'relative',
            minHeight: { xs: 52, sm: 52 },
            px: { xs: 1, sm: 1.5, md: 3 },
            borderRadius: 999,
            border: '1px solid',
            borderColor: scrolled ? theme.palette.divider : 'transparent',
            backgroundColor: scrolled
              ? alpha(theme.palette.background.default, theme.palette.mode === 'dark' ? 0.62 : 0.72)
              : 'transparent',
            backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
            boxShadow: scrolled
              ? theme.palette.mode === 'dark'
                ? 'inset 0 1px 0 rgba(232, 237, 247, 0.06), 0 10px 18px -6px rgba(2, 3, 12, 0.6)'
                : 'inset 0 1px 0 rgba(255, 253, 248, 0.7), 0 10px 18px -8px rgba(39, 35, 42, 0.2)'
              : 'none',
            transition: colorModeTransition('background-color', 'border-color', 'box-shadow', 'backdrop-filter'),
            '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
              backgroundColor: scrolled ? theme.palette.background.paper : 'transparent',
            },
          })}>

          {/* Mobile: hamburger | centered title | theme toggle */}
          <IconButton
            edge="start"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Open navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            sx={{ width: 44, height: 44, display: { md: 'none' }, color: 'text.primary' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ...brandNameSx, display: { xs: 'block', md: 'none' }, position: 'absolute', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
            Humberto Axl
          </Typography>
          <Box sx={{ flexGrow: 1, display: { md: 'none' } }} />
          <Box sx={{ display: { md: 'none' } }}>{themeToggle}</Box>

          {/* Desktop: name | nav buttons | theme toggle */}
          <Typography variant="h6" sx={{ ...brandNameSx, flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            Humberto Axl
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => scrollTo(item.sectionId)}
                aria-current={activeSection === item.sectionId ? 'location' : undefined}
                disableRipple
                sx={navButtonSx(item.sectionId)}>
                {item.label}
              </Button>
            ))}
            <Box sx={{ ml: 1 }}>{themeToggle}</Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        id="mobile-navigation"
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{ paper: { component: 'nav', 'aria-label': 'Mobile navigation' } }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
        {drawer}
      </Drawer>

      <Box aria-hidden><Toolbar /></Box>
    </Box>
  );
}
