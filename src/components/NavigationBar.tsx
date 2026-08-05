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

interface Props {
  window?: () => Window;
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const NAVBAR_HEIGHT = 64;
const drawerWidth = 240;
const navItems = [
  { label: 'Home',       sectionId: 'home'       },
  { label: 'Experience', sectionId: 'experience'  },
  { label: 'Skills',     sectionId: 'skills'      },
  { label: 'About',      sectionId: 'about'       },
];

function getActiveSection(): string {
  if (window.location.pathname !== '/') return '';

  const readingLine = NAVBAR_HEIGHT + (window.innerHeight - NAVBAR_HEIGHT) * 0.45;
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

  // JSX variable — avoids the "component created during render" error
  const themeToggle = (
    <IconButton
      onClick={toggleColorMode}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      sx={{ width: 44, height: 44, color: 'text.primary' }}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );

  const navButtonSx = (sectionId: string) => ({
    color: activeSection === sectionId ? 'primary.main' : 'text.secondary',
    fontWeight: 500,
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 6,
      left: '50%',
      width: '60%',
      height: 2,
      backgroundColor: 'primary.main',
      borderRadius: 1,
      transform: activeSection === sectionId
        ? 'translateX(-50%) scaleX(1)'
        : 'translateX(-50%) scaleX(0)',
      transition: 'transform 0.2s ease',
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
        sx={(theme) => ({
          backgroundColor: scrolled
            ? alpha(theme.palette.background.default, theme.palette.mode === 'dark' ? 0.56 : 0.78)
            : 'transparent',
          backgroundImage: 'none',
          backdropFilter: scrolled ? 'blur(16px) saturate(125%)' : 'blur(0px) saturate(100%)',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(125%)' : 'blur(0px) saturate(100%)',
          borderBottom: '1px solid',
          borderColor: scrolled
            ? alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.07 : 0.06)
            : 'transparent',
          boxShadow: scrolled
            ? theme.palette.mode === 'dark'
              ? '0 5px 18px rgba(2, 3, 12, 0.13)'
              : '0 4px 14px rgba(39, 35, 42, 0.07)'
            : 'none',
          color: 'text.primary',
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
            backgroundColor: scrolled ? alpha(theme.palette.background.default, 0.88) : 'transparent',
          },
        })}>
        <Toolbar sx={{ width: '100%', maxWidth: 1500, mx: 'auto', position: 'relative' }}>

          {/* Mobile: hamburger | centered title | theme toggle */}
          <IconButton
            edge="start"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Open navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            sx={{ width: 44, height: 44, display: { sm: 'none' }, color: 'text.primary' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ display: { xs: 'block', sm: 'none' }, color: 'text.primary', fontWeight: 700, position: 'absolute', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
            Humberto Axl
          </Typography>
          <Box sx={{ flexGrow: 1, display: { sm: 'none' } }} />
          <Box sx={{ display: { sm: 'none' } }}>{themeToggle}</Box>

          {/* Desktop: name | nav buttons | theme toggle */}
          <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'text.primary', fontWeight: 700 }}>
            Humberto Axl
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
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
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
        {drawer}
      </Drawer>

      <Box aria-hidden><Toolbar /></Box>
    </Box>
  );
}
