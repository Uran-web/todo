import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CommonColors {
    neonBlue?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#41A0D2',
    },
    secondary: {
      main: '#818181',
    },
    common: {
      neonBlue: '#644DED',
    },
    // contrastThreshold: 4,
  },
  typography: {
    fontFamily: ['Gilroy', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    button: {
      fontSize: '1.4rem',
      fontWeight: '500',
    },
    h1: {
      fontSize: '4.8rem',
    },
    h3: {
      fontSize: '2.4rem',
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.6rem',
    },
    h6: {
      fontSize: '1.4rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          fontWeight: 500,
          borderRadius: 8,
          textTransform: 'none',
          border: '1px solid #41A0D2',
          '&:hover': {
            background: '#41A0D2',
            color: '#FFFFFF',
          },
          ':disabled': {
            background: '#D2D4DA',
            color: '#FFFFFF',
          },
        },
        outlined: {
          color: '#41A0D2',
          '&:hover': {
            background: '#ffff',
          },
        },
      },
    },
  },
});

export default theme;
