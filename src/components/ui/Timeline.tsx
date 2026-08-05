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
  employer?: string;
  role: string;
  bullets: string[];
  stack: string;
  from: string;
  to: string;
  current: boolean;
  color: string;
  Icon: SvgIconComponent;
}

const jobs: Job[] = [
  {
    company: 'WAIRC & DPIRD',
    employer: 'Western Australian Government',
    role: 'Software Developer',
    bullets: [
      'Started at the Department of Primary Industries and Regional Development (DPIRD), maintaining and enhancing a legacy C# application while learning Western Australian Government IT processes.',
      'Develop and maintain public-facing and internal applications supporting application lodgement, assessment, and case-management workflows across Angular frontends and C#/.NET backends.',
      'Maintain and enhance a legacy VB.NET case-management application across desktop, backend, and database layers, including substantial changes to core case and party-management workflows.',
      'Work directly with non-technical stakeholders to refine requirements and translate business processes into user stories, technical tasks, and production functionality.',
      'Contribute to code reviews, technical guidance, application modernisation, framework upgrades, Azure DevOps CI/CD pipelines, and releases.',
    ],
    stack: 'Angular; TypeScript; C#; .NET; Entity Framework; VB.NET; SQL Server; Azure DevOps',
    from: 'Feb 2023',
    to: 'Present',
    current: true,
    color: '#3d6ad6',
    Icon: AccountBalanceIcon,
  },
  {
    company: 'Calytrix Technologies',
    role: 'Software Engineer',
    bullets: [
      'Developed interactive functionality for a 3D defence simulation and synthetic training environment, using JavaScript to connect user interfaces and simulated behaviours with platform APIs.',
      'Translated technical documentation and project requirements into simulation functionality, including interactive controls, optics, reticles, and visual overlays, while resolving software defects.',
      'Contributed to supporting web applications using Vue.js, consuming existing APIs to develop interactive training and simulation interfaces.',
    ],
    stack: 'Vue.js; JavaScript; HTML; CSS; REST APIs',
    from: 'Feb 2022',
    to: 'Feb 2023',
    current: false,
    color: '#7c4fc8',
    Icon: CodeIcon,
  },
  {
    company: 'Ferimport Comércio',
    role: 'Junior Developer',
    bullets: [
      'Progressed from manual catalogue work to software development after building automation workflows that enabled supplier catalogues containing thousands of products to be processed in bulk, replacing a workflow of approximately 20 products per day.',
      'Built Puppeteer-based browser automation and internal tools to extract, transform, and upload product data and images in bulk through e-commerce platform APIs.',
      'Automated competitor pricing and location-dependent delivery analysis and supported the catalogue team with training and troubleshooting.',
    ],
    stack: 'JavaScript; Node.js; Puppeteer; REST APIs; VTEX; Web Scraping',
    from: 'Nov 2020',
    to: 'Dec 2021',
    current: false,
    color: '#00a88e',
    Icon: LanguageIcon,
  },
];

const BulletList = ({ bullets }: { bullets: string[] }) => (
  <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
    {bullets.map((bullet) => (
      <Typography
        key={bullet}
        component="li"
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '0.925rem', md: '0.95rem' },
          lineHeight: 1.72,
          mb: 0.55,
          pl: 0.35,
        }}
      >
        {bullet}
      </Typography>
    ))}
  </Box>
);

const Stack = ({ children }: { children: string }) => (
  <Typography
    variant="body2"
    sx={{ mt: 1.25, color: 'text.secondary', lineHeight: 1.6 }}
  >
    <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
      Stack:{' '}
    </Box>
    {children}
  </Typography>
);

const MOBILE_GAP = 24;

export default function Timeline() {
  return (
    <MuiTimeline
      sx={{
        p: 0,
        m: 0,
        maxWidth: RESUME_CONTENT_WIDTH,
        mx: 'auto',
        gap: { xs: `${MOBILE_GAP}px`, md: 4 },
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: { xs: 0, md: 0.22 },
          display: { xs: 'none', md: 'flex' },
        },
      }}
    >
      {jobs.map((job, index) => (
        <TimelineItem
          key={job.company}
          sx={{ minHeight: 0, flexDirection: { xs: 'column', md: 'row' } }}
        >
          <TimelineOppositeContent
            sx={{ pr: 3, py: 0, flexDirection: 'column', justifyContent: 'center' }}
          >
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
              {job.from}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {job.to}
            </Typography>
          </TimelineOppositeContent>

          <TimelineSeparator
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              width: { xs: '100%', md: 28 },
            }}
          >
            <TimelineDot
              sx={{
                m: 0,
                display: { xs: 'none', md: 'block' },
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
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                width: 2,
                top: index === 0 ? '50%' : -16,
                bottom: index === jobs.length - 1 ? '50%' : -16,
                bgcolor: 'divider',
              }}
            />

            {index > 0 && (
              <Box
                sx={{
                  display: { xs: 'block', md: 'none' },
                  width: 2,
                  height: MOBILE_GAP,
                  mt: `-${MOBILE_GAP}px`,
                  bgcolor: 'divider',
                }}
              />
            )}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: job.color,
                boxShadow: `0 0 0 4px ${alpha(job.color, 0.2)}`,
              }}
            />
          </TimelineSeparator>

          <TimelineContent sx={{ p: 0, pl: { xs: 0, md: 3 } }}>
            <Typography
              variant="body2"
              sx={{
                display: { xs: 'block', md: 'none' },
                textAlign: 'center',
                color: job.color,
                fontWeight: 700,
                mt: 1,
                mb: 1.5,
              }}
            >
              {job.from} - {job.to}
            </Typography>
            <Box
              sx={(theme) => ({
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: { xs: 2.25, md: 3 },
                position: 'relative',
                display: { xs: 'block', md: 'flex' },
                gap: { md: 2 },
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 16px 44px rgba(3, 2, 16, 0.18)'
                  : '0 12px 32px rgba(54, 45, 63, 0.08)',
              })}
            >
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
                }}
              >
                <job.Icon sx={{ color: job.color, fontSize: 24 }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: { xs: 1.5, md: 0 },
                    mb: { xs: 2.25, md: 2.5 },
                  }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: 1.25,
                      bgcolor: alpha(job.color, 0.12),
                      display: { xs: 'flex', md: 'none' },
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <job.Icon sx={{ color: job.color, fontSize: 22 }} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
                      <Typography component="h3" variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
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
                            fontSize: '0.75rem',
                            height: 22,
                            border: `1px solid ${alpha(job.color, 0.3)}`,
                          }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ mt: 0.6, color: 'text.secondary', fontWeight: 600 }}>
                      {job.employer ? `${job.employer} · ${job.role}` : job.role}
                    </Typography>
                  </Box>
                </Box>

                <BulletList bullets={job.bullets} />
                <Stack>{job.stack}</Stack>
              </Box>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
}
