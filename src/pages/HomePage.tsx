import AboutMe from '../components/AboutMe';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import Contact from '../components/Contact';
import { Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ mt: '-64px' }}>
      <Hero />
      <WorkExperience />
      <Skills />
      <AboutMe />
      <Contact />
    </Box>
  );
};

export default HomePage;
