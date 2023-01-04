import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#237b72',
      },
      secondary: {
        main: '#2e779d',
      },
      background: {
        paper: '#f5f5f5',
        default: '#ededed',
      },
      text: {
        primary: 'rgba(0,0,0,0.9)',
        secondary: 'rgba(0,0,0,0.75)',
      },
      info: {
        main: '#2f3d91',
      },
      error: {
        main: '#ce482e',
      },
      success: {
        main: '#237b46',
      },
    },
    typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      body1: {
        fontFamily: 'Quicksand',
        fontWeight: 300,
        lineHeight: 1,
        fontSize: '1em',
      },
      h2: {
        fontSize: '2.2em',
        fontFamily: 'Montserrat',
        fontWeight: 600,
      },
      h1: {
        fontSize: '2.5em',
        fontFamily: 'Montserrat',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.8em',
        fontFamily: 'Montserrat',
      },
      h5: {
        fontFamily: 'Montserrat',
        fontSize: '1.4em',
      },
      h6: {
        fontFamily: 'Montserrat',
        fontSize: '1.25em',
      },
      body2: {
        fontWeight: 400,
      },
      button: {
        fontFamily: 'Montserrat',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h4: {
        fontFamily: 'Montserrat',
        fontSize: '1.6rem',
        fontWeight: 500,
      },
    },
  });