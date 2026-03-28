import AboutMe from '../components/AboutMe';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import WorkExperience from '../components/WorkExperience';
import { Box, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}>
      <Box>
        <Hero />
        <Divider />
        <WorkExperience />
        <Skills />
        <AboutMe />
      </Box>
    </motion.div>
  );
};

export default HomePage;
