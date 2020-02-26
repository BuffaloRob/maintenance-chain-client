import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import enginePic from '../../assets/cobraMotor.jpg';
import { withStyles } from "@material-ui/styles";
import { StyledHeader, StyledCTA } from "./styles";

// This adds the background pic to only the home page
const styles = {
  "@global": {
    body: {
      backgroundImage: `url(${enginePic})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      // height: "100%",
    }
  }
}

class Home extends React.Component {
  

  render() {
    const {classes} = this.props;
    return (
      <Box textAlign="center" className={classes.body}>
        <StyledHeader>
          Welcome to Maintenance Chain 
        </StyledHeader>
        <StyledCTA>
          To get started create an
          <Link color="primary" to={'/item/new'} component={RouterLink} >
            Item
          </Link>
          such as your car. Then make a category (oil change is a common example) to track. Once that's done just make a log entry for every oil change you perform.
        </StyledCTA>
        <Divider/>
        <Typography>
          And if you've been here before you can just go to your
          <Link to={'/items'} component={RouterLink}>
            Items
          </Link>
        </Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(Home);
