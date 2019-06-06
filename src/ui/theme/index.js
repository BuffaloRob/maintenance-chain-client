import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  type: 'dark',
  primary: { main: '#F4511E' },
  secondary: { main: '#78909C' }
};

const overrides = {
  MuiFab: {
    root: {
      margin: "2px",
      // padding: "5px"
    }
  },
  // MuiButton: {
  //   root: {
  //     variant: 'text',
  //     margin: "5px",
  //     padding: "5px"
  //   }
  // },
  MuiTypography: {
    root: {
      margin: "5px"
    }
  }
}

const themeName = 'Orange and Gray';

const theme = createMuiTheme({ palette, overrides, themeName });

export default theme
