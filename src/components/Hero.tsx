import { Grid, Typography } from '@mui/material';

const Hero = () => {
  return (
      <Grid container sx={{ p: 2 }}>
        <Grid size={{ xs: 6 }}>
          <Typography variant="h2" color="white">
            Hey!
          </Typography>
          <Typography variant="h3">
            I am Humberto Axl, <br />a full stack developer.
          </Typography>
          <Typography variant="h6" color="white" mt={6}>
            No, I cannot fix your printer. maybe for the right price
          </Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>Imagem aleatória</Grid>
      </Grid>
  );
};

export default Hero;
