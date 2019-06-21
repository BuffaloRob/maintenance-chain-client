import React from 'react';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment'

import { fetchPastDue } from '../actions/queryActions'

class PastDue extends React.Component {

  componentDidMount() {
    this.props.fetchPastDue();
  }

  renderList() {
    return this.props.logs.map(log => {
      const formattedDateDue = moment(log.date_due).format("MMM Do YYYY");
      return (
        <ListItem
          key={log.id}
          button
          onClick={() => this.props.selectPastDue(log.id, log.category.item_id, log.category_id)}
          divider
        >
          {log.category.name} was due on {formattedDateDue}
        </ListItem>
      )
      
    })
  }
  
  render() {
    return (
      <Container>
        <Typography variant="h4">
          <Box textAlign="center">Past Due</Box>
        </Typography>
        <List component="nav">{this.renderList()}</List>
      </Container>
    )
  }

}

const mapStateToProps = state => {
  return {
    logs: Object.values(state.pastDue),
  }
}

export default connect(mapStateToProps, { fetchPastDue })(PastDue);