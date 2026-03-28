import { Grid, Typography } from '@mui/material';
import Timeline from './ui/Timeline';

const WorkExperience = () => {
  return (
    <Grid container sx={{ backgroundColor: '#1c2949' }}>
      <Grid size={12}>
        <Typography variant="h4" align="center">
          Work Experience
        </Typography>
      </Grid>
      <Grid size={12}>
        <Timeline />
      </Grid>
    </Grid>
  );
};

export default WorkExperience;
