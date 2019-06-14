import React from "react";
import { Link as RouterLink } from 'react-router-dom'
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default class Home extends React.Component {

  state = {
    comment: "",
    comments: []
  }

  handleSubmit = e => {
    e.preventDefault()
    const comment = e.target[0].value
    this.setState({ comments: [...this.state.comments, comment] })
    this.setState({comment: ''})
  }

  handleChange = e => {
    this.setState({ comment: e.target.value })
  }

  render() {
    return (
      <Box textAlign="center" >

        <div>
          <br/>
          <label>Enter a comment:</label>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='comment'
              value={this.state.comment}
              onChange={this.handleChange}
            />
            <br/>
            <button type='submit'>Submit</button>
          </form>
        </div>

        <div>
          <h5>Comments:</h5>
          <ul>
            {this.state.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
        </div>
        <br/>

        <Typography>
          Welcome to Maintenance Chain. To get started create an
          <Link color="primary" to={'/item/new'} component={RouterLink} >
            Item
          </Link>
          such as your car. Then make a category (oil change is a common example) to track. Once that's done just make a log entry for every oil change you perform.
        </Typography>
        <Divider />
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