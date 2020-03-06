import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// import enginePic from '../../assets/engine.JPG';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#F55932' },
    secondary: { main: '#78909C' },
    error: { main: '#0CCF16' },
    text: { secondary: '#000000de' },
    background: { default: '#262626', background: '#303030' },
  },
  overrides: {
    MuiFab: {
      root: {
        margin: "8px",
      },
      primary: {
        color: "#000000de",
      }
    },
    MuiTypography: {
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
    MuiFormLabel: {
      root: {
        color: "#F55932",
      }
    },
    MuiInput: {
      underline: {
        '&:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid #F55932',
        },
      }
    },
  }
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