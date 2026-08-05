import { Box } from '@mui/material';
import Timeline from './ui/Timeline';
import SectionHeader from './ui/SectionHeader';
import { FIRST_SECTION_TOP_PADDING, SECTION_VERTICAL_PADDING } from '../theme';

const WorkExperience = () => {
  return (
    <Box
      id="experience"
      sx={{ pt: FIRST_SECTION_TOP_PADDING, pb: SECTION_VERTICAL_PADDING, px: { xs: 3, md: 6 } }}
    >
        <SectionHeader
          title="Experience"
          description="Government, defence simulation, and e-commerce experience across modern and legacy software."
        />

        <Timeline />
    </Box>
  );
};

export default WorkExperience;
