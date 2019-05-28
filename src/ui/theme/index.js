import { createMuiTheme } from '@material-ui/core/styles';


const palette = {
  primary: { main: '#F4511E' },
  secondary: { main: '#78909C' }
};

const background = {
  background: '#78909C'
}

const themeName = 'Orange and Gray';

const theme = createMuiTheme({ palette, background, themeName });

export default theme
