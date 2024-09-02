import { useEffect, useRef } from 'react';
import NavigationBar from './components/NavigationBar'; // Adjust the path as needed
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import your route components
import ResumePage from './pages/ResumePage';
// import ProjectsView from './pages/ProjectsView';
// import ContactMe from './pages/ContactMe';
import './index.css';

const App = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: 0x141446,
      color: 0x7f7de3,
      points: 8.00,
      maxDistance: 17.00,
      THREE,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} style={{ height: '100vh', width: '100%' }}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          {/* <Route path="/projects" element={<ProjectsView />} /> */}
          {/* <Route path="/contact" element={<ContactMe />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
