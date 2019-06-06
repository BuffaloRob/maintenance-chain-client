import React from "react";
import {Link as RouterLink} from 'react-router-dom'
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

class Home extends React.Component {

  render() {
    return (
      <Box textAlign="center" >
        <Typography>
          Welcome to Maintenance Chain. To get started create an
          <Link color="primary" to={'/item/new'} component={RouterLink} >
            Item
          </Link> 
          such as your car. Then make a category (oil change is a common example) to track. Once that's done just make a log entry for every oil change you perform.
        </Typography>
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

export default Home;
