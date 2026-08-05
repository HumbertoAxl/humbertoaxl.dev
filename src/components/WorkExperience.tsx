import { Box } from '@mui/material';
import Timeline from './ui/Timeline';
import SectionHeader from './ui/SectionHeader';

const WorkExperience = () => {
  return (
    <Box id="experience" sx={{ py: { xs: 6, md: 8 }, px: { xs: 3, md: 6 } }}>
        <SectionHeader
          title="Experience"
          description="A timeline of my professional journey, the challenges I've tackled, and the impact I've delivered."
        />

        <Timeline />
    </Box>
  );
};

export default WorkExperience;
