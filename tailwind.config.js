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
        lightShade: '#E6E4C6',
        roshoonBackground: '#ffffff',
        'green-olive': '#54722D',
        'gray-light': '#D9D9D9',
        primaryGreen: '#50704C',
        secondaryGreen: '#ADCFA9',
        darkGreen: '#195908',
        darkGray: '#3C4242',
        lightGray: '#807D7E',
        footerText: '#bbd6b8',
        text: {
          primary: '#000000',
          neutral: '#00000099',
          footerMention: '#195908',
          primaryGreen: '#50704C',
          lightGreen: '#54722D',
        },
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
    },
  },
  plugins: [typography],
};
