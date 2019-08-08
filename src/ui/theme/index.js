import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// import enginePic from '../../assets/engine.JPG';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#F4511E' },
    secondary: { main: '#78909C' },
    error: { main: '#388e3c' },
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
        margin: "3px",
        // padding: "5px"
      }
    },
    MuiTypography: {
      root: {
        margin: "4px"
      },
    }
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