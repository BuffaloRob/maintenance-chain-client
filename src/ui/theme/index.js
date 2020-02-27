import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// import enginePic from '../../assets/engine.JPG';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#F4511E' },
    secondary: { main: '#78909C' },
    error: { main: '#388e3c' },
    info: {main: '#ba000d'},
  },
  overrides: {
    // MuiCssBaseline: {
    //   "@global": {
    //     body: {
    //       backgroundImage: `url(${enginePic})`,
    //       backgroundRepeat: "no-repeat",
    //       backgroundPosition: "center center",
    //       backgroundSize: "cover",
    //       backgroundAttachment: "fixed",
    //       height: "100%",
    //     }
    //   }
    // },
    MuiFab: {
      root: {
        margin: "5px",
        // padding: "5px"
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
        padding: "40px 0",
      },
      h4: {
        padding: "40px 0",
      },
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