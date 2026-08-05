import { Box, Typography } from '@mui/material';
import SectionHeader from './ui/SectionHeader';
import { RESUME_CONTENT_WIDTH } from '../theme';

const AboutMe = () => (
  <Box id="about" sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, md: 6 } }}>
    <SectionHeader title="About Me" />

    <Box
      sx={{
        maxWidth: RESUME_CONTENT_WIDTH,
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '1.05fr 0.95fr' },
        gap: { xs: 3, md: 8 },
        py: { xs: 3.5, md: 5 },
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        component="p"
        sx={{
          m: 0,
          color: 'text.primary',
          fontSize: { xs: '0.975rem', md: '1rem' },
          fontWeight: 600,
          lineHeight: 1.8,
        }}
      >
        I'm a passionate full-stack developer with over 5 years of experience designing and
        building modern web applications across both the public and private sectors. I thrive at
        the intersection of clean architecture and intuitive user experience.
      </Typography>

      <Box sx={{ display: 'grid', gap: 2.25, alignContent: 'start' }}>
        <Typography
          component="p"
          sx={{
            m: 0,
            color: 'text.secondary',
            fontSize: { xs: '0.95rem', md: '0.975rem' },
            lineHeight: 1.8,
          }}
        >
          My toolkit spans the full stack — from Angular and React on the frontend to .NET and
          Node.js on the backend — and I'm always looking for the right tool for the job. I care
          deeply about code quality, mentoring teammates, and shipping things that actually work
          in production.
        </Typography>
        <Typography
          component="p"
          sx={{
            m: 0,
            color: 'text.secondary',
            fontSize: { xs: '0.95rem', md: '0.975rem' },
            lineHeight: 1.8,
          }}
        >
          Outside of work, I explore new technologies, contribute to personal projects, and — for
          the right price — occasionally fix printers.
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default AboutMe;
