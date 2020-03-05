import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import car from '../../assets/racecar-on-stands-prog.jpg';
import { withStyles } from "@material-ui/styles";
import { StyledHeader, StyledCTA, CtaHeader, StyledDivider, StyledIntro, GridContainer, HowToDiv } from "./styles";

// This adds the background pic to only the home page
const styles = {
  "@global": {
    body: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${car})`,
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
      <GridContainer className={classes.body}>
        <StyledHeader variant='h1' align='center'>
          Maintenance Chain 
        </StyledHeader>
        <StyledIntro>
          Makes it easy to keep track of any kind of maintenance. There are a couple of handy features like the ability to view upcoming and overdue items but the app is ment to be simple so it doesn't feel like a chore to use after you just got done working
        </StyledIntro>
        <StyledDivider />
        <StyledCTA>
          <CtaHeader align='center'>
            How to use this app:
          </CtaHeader>
          <HowToDiv>
            1) Create an 
            <Link color="textPrimary" to={'/item/new'} component={RouterLink} >
              Item
            </Link>
            to track, a common example would be your car.
          </HowToDiv>
          <HowToDiv>
            2) Create a maintenance category for your item, in the case of your car a good example would be an oil change.
          </HowToDiv>
          <HowToDiv>
            3) Make a log for every time you perform a maintenance category.
          </HowToDiv>
        </StyledCTA>
        <StyledDivider/>
        <Typography variant='h3' align='center'>
          Go to your 
          <Link to={'/items'} component={RouterLink}>
            Items
          </Link>
        </Typography>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Home);
