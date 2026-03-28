import { useLocation, useNavigate } from 'react-router';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    { text: 'Home', path: '/' },
    { text: 'Skills', path: '/skills' },
    { text: 'Resume', path: '/resume' },
    { text: 'Projects', path: '/projects' },
    { text: 'Contact', path: '/contact' },
  ];

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar style={{ backgroundColor: '#0f0f33' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            <Typography variant='h6'>Humberto Axl</Typography>
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

