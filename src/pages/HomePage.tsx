import AboutMe from '../components/AboutMe';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import { Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      <Hero />
      <WorkExperience />
      <Skills />
      <AboutMe />
    </Box>
  );
};

export default HomePage;
