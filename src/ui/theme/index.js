import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// import enginePic from '../../assets/engine.JPG';

let theme = createTheme({
  // MUI v4 breakpoint values (v5+ changed md/lg/xl to 900/1200/1536); keeps Container maxWidth='md' at 960px.
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
  palette: {
    mode: 'dark',
    primary: { main: '#F55932' },
    secondary: { main: '#78909C' },
    error: { main: '#0CCF16' },
    text: { secondary: '#000000de' },
    // paper matches the MUI v4 dark default (v5+ defaults to #121212);
    // card is the surface for desktop cards and sidebar panels
    background: { default: '#262626', paper: '#424242', card: '#2E2E2E' },
    // Due status of a category (store/api/dueStatus.js)
    status: { overdue: '#FF5C7A', soon: '#FFC857', ok: '#5CC689', none: '#90A4AE' },
  },
  components: {
    // v4 CssBaseline set body to typography.body2; v5+ uses body1 (larger size/line-height).
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: '0.875rem',
          lineHeight: 1.43,
          letterSpacing: '0.01071em',
        },
      },
    },
    // v5+ adds an elevation-based gradient overlay to Paper in dark mode; v4 did not.
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    // v5+ renders colored AppBars with the paper color in dark mode unless this is set.
    MuiAppBar: {
      defaultProps: { enableColorOnDark: true },
    },
    // v4 Grid containers were width: 100%; the v7+ Grid (formerly Grid2) is not,
    // so nested containers shrink to their content without this.
    MuiGrid: {
      styleOverrides: {
        container: { width: '100%' },
      },
    },
    // v4 Link default was underline="hover" (v5+ defaults to "always").
    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
    // v4 default TextField variant was 'standard' (underlined).
    MuiTextField: {
      defaultProps: { variant: 'standard' },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          margin: "8px",
        },
        primary: {
          color: "#000000de",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: "4px",
        },
        h2: {
          padding: "40px 0 80px",
        },
        h3: {
          padding: "40px 0 40px",
        },
        h4: {
          padding: "0 0",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#F55932",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #F55932',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme)

// theme.typography.body1 = {
//   fontSize: '1rem',
//   '@media (max-width:350px)': {
//     fontSize: '.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '1rem',
//   },
// };

export default theme