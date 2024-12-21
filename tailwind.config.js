/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        julius: ['"Julius Sans One"', 'sans-serif'],
      },
      colors: {
        primary: '#ff5722', // Orange
        secondary: '#4caf50', // Green

        // Shades
        light: '#E6E4C6', // Light Shade
        white: '#ffffff', // Background (Roshoon)
        grayLight: '#D9D9D9',
        grayDark: '#3C4242',
        grayNeutral: '#807D7E',

        // Greens
        greenPrimary: '#50704C',
        greenSecondary: '#ADCFA9',
        greenDark: '#195908',
        greenOlive: '#54722D',

        // Footer
        footerText: '#bbd6b8',

        // Text Colors
        text: {
          darkGray: '#252C32',
          midGray: '#B0BABF',
          primary: '#000000', // Black
          neutral: '#00000099', // Black with transparency
          footerMention: '#195908', // Dark Green
          greenPrimary: '#50704C',
          greenOlive: '#54722D',
        },

        // Icon Colors
        icon: {
          primary: '#B2D99A',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '700', // Bold
            },
            h2: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '500', // Medium
            },
            h3: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400', // Regular
            },
            h4: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400', // Regular
            },
            h5: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400', // Regular
            },
            h6: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '300', // Light
            },
            body1: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400',
              fontSize: '1rem',
              letterSpacing: '0.15px',
            },
            body2: {
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400',
              fontSize: '0.875rem',
              letterSpacing: '0.15px',
            },
            subtitle1: {
              fontWeight: '500',
              fontSize: '0.875rem',
            },
            subtitle2: {
              fontWeight: '500',
              fontSize: '1rem',
            },
            inputLabel: {
              fontSize: '0.75rem',
              letterSpacing: '0.15px',
            },
          },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0',
        },
      },
      zIndex: {
        min: '100',
        mid: '500',
        max: '999',
      },
    },
  },
  plugins: [typography],
};
