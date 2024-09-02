import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const ProfileImage = styled('img')({
  height: '25%',
});

const HomePage = () => {
  return (
    <Container maxWidth="xl" style={{ display: 'flex' }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography variant="h1" color="white">Humberto Axl</Typography>
          <Typography variant="h3" color="white" mt={6}>
            I am a front end developer who loves to code and learn new technologies.
          </Typography>
          <Box mt={6}>
            <Button variant="outlined" style={{ width: '130px' }}>
              My projects
            </Button>
            <Button variant="outlined" style={{ width: '130px', marginLeft: '10px' }}>
              Contact
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ProfileImage src="/assets/profile pic.png" alt="Profile" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
