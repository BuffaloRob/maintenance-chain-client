import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  type: 'dark',
  primary: { main: '#F4511E' },
  secondary: { main: '#78909C' }
};

// const background = {
//   backgroundColor: '#78909C'
// }

// const paper = {
//   paper: {
//     backgroundColor: '#78909C'
//   }
// }

// const container = {
//   MuiContainer: {
//     background: '#78909C'
//   }
// }

const themeName = 'Orange and Gray';

const theme = createMuiTheme({ palette, themeName });

export default theme
