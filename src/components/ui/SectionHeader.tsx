import { Box, Typography } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
    <Typography
      component="h2"
      variant="overline"
      sx={{
        color: 'primary.main',
        fontWeight: 700,
        letterSpacing: 4,
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        lineHeight: 1.3,
      }}>
      {title}
    </Typography>
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        mx: 'auto',
        my: 1.5,
      }}
    />
    {description && (
      <Typography
        variant="body1"
        sx={{
          color: 'text.primary',
          opacity: 0.78,
          mt: 2,
          maxWidth: 520,
          mx: 'auto',
          fontSize: { xs: '0.95rem', md: '1rem' },
          lineHeight: 1.8,
        }}>
        {description}
      </Typography>
    )}
  </Box>
);

export default SectionHeader;
