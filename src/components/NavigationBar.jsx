import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    { text: 'Home', path: '/' },
    { text: 'Resume', path: '/resume' },
    { text: 'Projects', path: '/projects' },
    { text: 'Contact', path: '/contact' },
  ];

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#0f0f33' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Humberto Axl
          </Button>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          {options.map((option) => (
            <Button
              key={option.path}
              onClick={() => navigateTo(option.path)}
              sx={{
                color: option.path === location.pathname ? 'black' : 'white',
                backgroundColor: option.path === location.pathname ? 'white' : 'transparent',
                transition: '300ms linear',
                ml: 1,
              }}>
              {option.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
