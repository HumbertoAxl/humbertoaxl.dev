import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
  warm: boolean;
  bright: boolean;
}

const FRAME_MS = 1000 / 30;
const MAX_DPR = 2;
const STAR_COLOR = { dark: '#f1f3fa', light: '#27232a' } as const;
const WARM_STAR_COLOR = '#ffe3c2';

// Deterministic so the sky is the same on every visit and between modes.
const makeStars = (count: number, seed: number): Star[] => {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  return Array.from({ length: count }, () => {
    const bright = rand() < 0.035;
    return {
      x: rand(),
      y: rand(),
      r: bright ? 1.25 + rand() * 0.7 : 0.35 + rand() * rand() * 1.05,
      alpha: bright ? 0.9 : 0.25 + rand() * 0.6,
      speed: 0.00035 + rand() * 0.0012,
      phase: rand() * Math.PI * 2,
      warm: rand() < 0.12,
      bright,
    };
  });
};

const hexToRgb = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
};

/**
 * The hero sky, drawn on a canvas. Dark mode: drifting, twinkling stars with the Milky Way
 * crossing diagonally. Light mode: the same sky as a still chart of ink points.
 */
const SkyCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const primary = theme.palette.primary.main;

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !parent || !context) return;

    const isDark = mode === 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animate = isDark && !reduceMotion;
    const star = hexToRgb(STAR_COLOR[mode]);
    const starWarm = hexToRgb(isDark ? WARM_STAR_COLOR : primary);
    const accent = hexToRgb(primary);

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;
    let lastFrame = 0;
    let visible = true;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((width * height) / 2100), 720);
      stars = makeStars(count, 1337);
      if (isDark) {
        // Star dust gathered along the Milky Way band: faint, small, many.
        const dust = makeStars(Math.round(count * 0.6), 2718).map((s) => {
          const across = (s.y - 0.5) * 0.16;
          return {
            ...s,
            x: s.x + across * 0.74,
            y: 1 - s.x * 1.1 + across + 0.05,
            r: Math.min(s.r, 0.7),
            alpha: s.alpha * 0.55,
            bright: false,
          };
        });
        stars = stars.concat(dust.filter((s) => s.y > 0 && s.y < 1 && s.x > 0 && s.x < 1));
      }
    };

    // Fixed atmosphere behind the stars: a soft bloom and, at night, the Milky Way as a diagonal band.
    const drawAtmosphere = () => {
      const bx = width * (isDark ? 0.36 : 0.78);
      const by = height * (isDark ? 0.4 : 0.3);
      const bloom = context.createRadialGradient(bx, by, 0, bx, by, Math.max(width, height) * 0.45);
      bloom.addColorStop(0, `rgba(${accent}, ${isDark ? 0.13 : 0.06})`);
      bloom.addColorStop(1, `rgba(${accent}, 0)`);
      context.fillStyle = bloom;
      context.fillRect(0, 0, width, height);

      if (!isDark) return;
      const angle = (132 * Math.PI) / 180;
      const half = Math.hypot(width, height) * 0.5;
      const dx = Math.sin(angle) * half;
      const dy = -Math.cos(angle) * half;
      const band = context.createLinearGradient(width / 2 - dx, height / 2 - dy, width / 2 + dx, height / 2 + dy);
      band.addColorStop(0.24, `rgba(${accent}, 0)`);
      band.addColorStop(0.43, `rgba(${accent}, 0.07)`);
      band.addColorStop(0.48, `rgba(${star}, 0.055)`);
      band.addColorStop(0.62, `rgba(${accent}, 0)`);
      context.fillStyle = band;
      context.fillRect(0, 0, width, height);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      drawAtmosphere();

      for (const s of stars) {
        const drift = animate ? (time * 0.0000022 * (0.4 + s.r)) % 1 : 0;
        const x = ((s.x + drift) % 1) * width;
        const y = s.y * height;

        if (isDark) {
          const twinkle = animate ? 0.72 + 0.28 * Math.sin(time * s.speed + s.phase) : 1;
          const color = s.warm ? starWarm : star;
          if (s.bright) {
            const glow = context.createRadialGradient(x, y, 0, x, y, s.r * 6);
            glow.addColorStop(0, `rgba(${color}, ${0.28 * twinkle})`);
            glow.addColorStop(1, `rgba(${color}, 0)`);
            context.fillStyle = glow;
            context.fillRect(x - s.r * 6, y - s.r * 6, s.r * 12, s.r * 12);
          }
          context.fillStyle = `rgba(${color}, ${s.alpha * twinkle})`;
        } else {
          // Daylight: the same sky as a still, plotted chart in ink.
          context.fillStyle = s.warm
            ? `rgba(${starWarm}, ${0.7 * s.alpha})`
            : `rgba(${star}, ${0.45 * s.alpha})`;
        }

        context.beginPath();
        context.arc(x, y, isDark ? s.r : Math.max(0.55, s.r * 0.85), 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = (time: number) => {
      frame = window.requestAnimationFrame(loop);
      if (!visible || time - lastFrame < FRAME_MS) return;
      lastFrame = time;
      draw(time);
    };

    resize();
    draw(0);
    if (animate) frame = window.requestAnimationFrame(loop);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === 'visible';
    });
    intersectionObserver.observe(canvas);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [mode, primary]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: -2,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};

export default SkyCanvas;
