import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import shop from '../../assets/shop-prog.jpg';
import { withStyles } from "@material-ui/styles";
import { StyledHeader, StyledCTA, CtaHeader, StyledDivider, StyledIntro } from "./styles";

// This adds the background pic to only the home page
const styles = {
  "@global": {
    body: {
      backgroundImage: `url(${shop})`,
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
        <StyledHeader variant='h1'>
          Maintenance Chain 
        </StyledHeader>
        <StyledIntro>
          Makes it easy to keep track of any kind of maintenance. There are a couple of handy features like the ability to view upcoming and overdue items but the app is ment to be simple so it doesn't feel like a chore to use after you just got done working
        </StyledIntro>
        <StyledDivider />
        <StyledCTA>
          <CtaHeader>
            How to use this app:
          </CtaHeader>
          <div>
            1) Create an 
            <Link color="primary" to={'/item/new'} component={RouterLink} >
              Item
            </Link>
            to track, a common example would be your car.
          </div>
          <div>
            2) Create a maintenance category for your item, in the case of your car a good example would be an oil change.
          </div>
          <div>
            3) Make a log for every time you perform a maintenance category.
          </div>
        </StyledCTA>
        <StyledDivider/>
        <Typography variant='h5'>
          Go to your 
          <Link to={'/items'} component={RouterLink}>
            Items
          </Link>
        </Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(Home);
