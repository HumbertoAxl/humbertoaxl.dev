import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './index.css';
import theme from "./theme.ts"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <NavigationBar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
            {/* <Route path="/projects" element={<ProjectsView />} /> */}
            {/* <Route path="/contact" element={<ContactMe />} /> */}
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
