import React from "react";
import {Link as RouterLink} from 'react-router-dom'
import { Box, Typography, Divider } from "@material-ui/core";
import Button from '@material-ui/core/Button'
import { spacing } from '@material-ui/system';


class Home extends React.Component {

  render() {
    return (
      <Box textAlign="center" >
        <Typography>
          Welcome to Maintenance Chain. To get started create an
          <Button variant='text' color="primary" size="small" to={'/item/new'} component={RouterLink} >
            Item
          </Button> 
          such as your car. Then make a category (oil change is a common example) to track. Once that's done just make a log entry for every oil change you perform.
        </Typography>
        <Divider/>
        <Typography>
          And if you've been here before you can just go to your  
          <Button variant="text" color="primary" size="small" to={'/items'} component={RouterLink}>
            Items
          </Button>
        </Typography>
      </Box>
    );
  }
}

export default Home;
