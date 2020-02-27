import React from 'react';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment'

import { fetchUpcoming } from '../../actions/queryActions'
import { StyledListItem } from './styles';

class Upcoming extends React.Component {

  componentDidMount() {
    this.props.fetchUpcoming();
  }

  renderList() {
    return this.props.logs.map(log => {
      const formattedDateDue = moment(log.date_due).format("MMM Do YYYY");
      return (
        <StyledListItem
          key={log.id}
          button
          onClick={() => this.props.selectUpcoming(log.id, log.category.item_id, log.category_id)}
          divider
        >
          {log.category.name} will be due on {formattedDateDue}
        </StyledListItem>
      )

    })
  }

  render() {
    return (
      <Container>
        <Typography variant="h2">
          <Box textAlign="center">Upcoming Work</Box>
        </Typography>
        <List component="nav">{this.renderList()}</List>
      </Container>
    )
  }

}

const mapStateToProps = state => {
  return {
    logs: Object.values(state.upcoming),
  }
}

export default connect(mapStateToProps, { fetchUpcoming })(Upcoming);