import { createTheme } from '@mui/material/styles';
import RobotoFontFamily from '../fonts';
import { common } from '@mui/material/colors';

// Inject RobotoFontFamily into the document head
const style = document.createElement('style');
style.innerHTML = RobotoFontFamily;
document.head.appendChild(style);

// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700, // Roboto Bold
    },
    h2: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500, // Roboto Medium
    },
    h3: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400, // Roboto Bold
    },
    h4: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400, // Roboto Medium
    },
    h5: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400, // Roboto Bold
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300, // Roboto Medium
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    inputLabel: {
      fontSize: '0.75rem',
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      letterSpacing: '0.15px',
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      letterSpacing: '0.15px',
    },
    roshoonBackground: {
      main: common.white,
    },
  },
  palette: {
    mode: 'light',
    logo: {
      primary: 'white',
    },
    primary: {
      main: '#ff5722', // Example primary color (orange)
    },
    secondary: {
      main: '#4caf50', // Example secondary color (green)
    },
    text: {
      primary: common.black,
    },
    // Add other custom palette settings here
  },
  // Add other theme options like spacing, shadows, etc.
});

export default theme;
