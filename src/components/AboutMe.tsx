import { Box, Typography } from '@mui/material';
import SectionHeader from './ui/SectionHeader';
import { SECTION_VERTICAL_PADDING } from '../theme';

const paragraphStyles = {
  m: 0,
  color: 'text.secondary',
  fontSize: { xs: '0.95rem', md: '0.975rem' },
  lineHeight: 1.8,
} as const;

const AboutMe = () => (
  <Box id="about" sx={{ py: SECTION_VERTICAL_PADDING, px: { xs: 3, md: 6 } }}>
    <SectionHeader title="About Me" />

    <Box
      sx={{
        maxWidth: 760,
        mx: 'auto',
        display: 'grid',
        gap: { xs: 2.25, md: 2.5 },
        pt: 0,
      }}
    >
      <Typography component="p" sx={paragraphStyles}>
        I'm a full-stack software developer with nearly six years of experience across government,
        defence simulation, and e-commerce. My work spans frontend and backend development across
        both modern and legacy codebases.
      </Typography>

      <Typography component="p" sx={paragraphStyles}>
        I enjoy understanding existing systems, refining requirements with stakeholders, and
        turning business processes into maintainable software. Technology never stands still, and
        I'm excited about the practical ways AI can improve how we build and use it.
      </Typography>

      <Typography component="p" sx={paragraphStyles}>
        Originally from Brazil, I've lived in Australia for five years, and I'm proud to call it
        home and be part of its community. Outside of work, I enjoy playing football with friends,
        sim racing, and gaming in general.
      </Typography>

      <Typography component="p" sx={paragraphStyles}>
        I also enjoy watching football and Formula 1, and The Sopranos is my all-time favourite
        series. Beyond entertainment, I'm fascinated by the universe and geography.
      </Typography>
    </Box>
  </Box>
);

export default AboutMe;
