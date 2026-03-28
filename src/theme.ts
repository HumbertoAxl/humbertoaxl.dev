import { createTheme } from '@mui/material/styles';

const theme = createTheme({
palette: {
  primary: {
    main: "#101729",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#101729"
  },
  background: {
    default: "#101729"
  }
},
typography: {
    fontFamily: [
      'Inter',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
