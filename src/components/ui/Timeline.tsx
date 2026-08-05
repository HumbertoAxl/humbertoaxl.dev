import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import { alpha } from '@mui/material/styles';
import { Box, Chip, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import { RESUME_CONTENT_WIDTH } from '../../theme';

interface Job {
  company: string;
  bullets: string[];
  from: string;
  to: string;
  current: boolean;
  color: string;
  Icon: SvgIconComponent;
}

const jobs: Job[] = [
  {
    company: 'Western Australian Public Sector',
    bullets: [
      'Designed and implemented new features for Angular-based web applications.',
      'Enhanced .NET APIs by introducing new calls and improving existing ones.',
      'Collaborated closely with customers to understand their needs, translating them into technical requirements.',
      'Supported older applications in VB and C#.',
      'Provided support to less experienced developers through pair coding sessions and constructive code reviews.',
    ],
    from: 'Feb 2023',
    to: 'Present',
    current: true,
    color: '#3d6ad6',
    Icon: AccountBalanceIcon,
  },
  {
    company: 'Calytrix Technologies',
    bullets: [
      'Developed military-grade equipment overlays for customer documentation used around the world.',
      'Built single-page applications using Vue.js.',
      'Conducted code reviews, wrote bug reports, and performed general testing of coworkers\' pull requests.',
      'Created and updated software plugins, user interfaces and scripts.',
    ],
    from: 'Feb 2022',
    to: 'Feb 2023',
    current: false,
    color: '#7c4fc8',
    Icon: CodeIcon,
  },
  {
    company: 'Ferimport',
    bullets: [
      'Created web scraping scripts for efficient product data extraction.',
      'Optimized catalogue import process by utilizing the website\'s e-commerce platform API, resulting in significant time savings.',
      'Utilized web scraping for data gathering, improving sales strategies.',
      'Developed and maintained a web app integrated with e-commerce platform.',
      'Provided training and support to the registration team for utilizing solutions made by the development team.',
    ],
    from: 'Nov 2020',
    to: 'Dec 2021',
    current: false,
    color: '#00c9a7',
    Icon: LanguageIcon,
  },
];

export default function Timeline() {
  return (
    <MuiTimeline
      sx={{
        p: 0,
        m: 0,
        maxWidth: RESUME_CONTENT_WIDTH,
        mx: 'auto',
        gap: { xs: 3, md: 4 },
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: { xs: 0, md: 0.22 },
          display: { xs: 'none', md: 'flex' },
        },
      }}>
      {jobs.map((job, idx) => (
        <TimelineItem key={job.company} sx={{ minHeight: 0 }}>
          {/* Date column */}
          <TimelineOppositeContent
            sx={{
              pr: 3,
              py: 0,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
              {job.from}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {job.to}
            </Typography>
          </TimelineOppositeContent>

          {/* Dot + connector */}
          <TimelineSeparator
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'relative',
              width: 28,
              alignItems: 'center',
            }}>
            <TimelineDot
              sx={{
                m: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                bgcolor: job.color,
                boxShadow: `0 0 0 4px ${alpha(job.color, 0.2)}`,
                border: 'none',
              }}
            />
            <TimelineConnector
              sx={{
                position: 'absolute',
                width: 2,
                top: idx === 0 ? '50%' : -16,
                bottom: idx === jobs.length - 1 ? '50%' : -16,
                bgcolor: 'divider',
              }}
            />
          </TimelineSeparator>

          {/* Card */}
          <TimelineContent sx={{ p: 0, pl: { xs: 0, md: 3 } }}>
            <Box
              sx={(theme) => ({
                bgcolor: alpha(
                  theme.palette.background.paper,
                  theme.palette.mode === 'dark' ? 0.42 : 0.86,
                ),
                border: '1px solid',
                borderColor: alpha(
                  theme.palette.primary.main,
                  theme.palette.mode === 'dark' ? 0.22 : 0.14,
                ),
                borderRadius: 2,
                p: { xs: 2, md: 3 },
                position: 'relative',
                display: { xs: 'block', md: 'flex' },
                gap: { md: 2 },
                backdropFilter: 'blur(14px) saturate(120%)',
                WebkitBackdropFilter: 'blur(14px) saturate(120%)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 16px 44px rgba(3, 2, 16, 0.18)'
                  : '0 12px 32px rgba(54, 45, 63, 0.08)',
                '&::before': {
                  content: '""',
                  display: { xs: 'block', md: 'none' },
                  position: 'absolute',
                  left: 35.5,
                  width: '1px',
                  bgcolor: 'divider',
                  ...(idx === 0
                    ? { top: 36, bottom: -24 }
                    : idx === jobs.length - 1
                      ? { top: -24, height: 60 }
                      : { top: -24, bottom: -24 }),
                },
              })}>
              {/* Icon */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  borderRadius: 1.5,
                  bgcolor: alpha(job.color, 0.12),
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <job.Icon sx={{ color: job.color, fontSize: 24 }} />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'flex-start',
                    gap: 1.5,
                    mb: 1.75,
                  }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: 1.25,
                      bgcolor: alpha(job.color, 0.12),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                    <job.Icon sx={{ color: job.color, fontSize: 22 }} />
                  </Box>
                  <Box sx={{ minWidth: 0, pt: 0.15 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                      {job.company}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: 'block', mt: 0.65, color: job.color, fontWeight: 700 }}>
                      {job.from} {'\u2014'} {job.to}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {job.company}
                  </Typography>
                  {job.current && (
                    <Chip
                      label="Present"
                      size="small"
                      sx={{
                        display: { xs: 'none', md: 'inline-flex' },
                        bgcolor: alpha(job.color, 0.08),
                        color: job.color,
                        fontWeight: 700,
                        fontSize: '0.68rem',
                        height: 20,
                        border: `1px solid ${alpha(job.color, 0.3)}`,
                      }}
                    />
                  )}
                </Box>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {job.bullets.map((b, i) => (
                    <Typography
                      key={i}
                      component="li"
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.925rem', md: '0.95rem' },
                        lineHeight: 1.75,
                        mb: 0.35,
                      }}>
                      {b}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
}
