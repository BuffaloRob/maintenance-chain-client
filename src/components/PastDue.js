import React from 'react';
import { connect } from 'react-redux'
import { Container, Typography, Box, List, ListItem } from '@material-ui/core';
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
          onClick={() => this.props.selectPastDue(log.id, log.category.item_id)}
          divider
          // disableTypography={true}
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
    logs: Object.values(state.query),
  }
}

export default connect(mapStateToProps, { fetchPastDue })(PastDue);