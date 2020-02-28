import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar'
import Build from '@material-ui/icons/Build';
import { StyledListItem, StyledListItemAvatar, StyledTypography } from './styles';

import { fetchUpcoming } from '../../actions/queryActions'

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
          <StyledListItemAvatar>
            <Avatar>
              <Build />
            </Avatar>
          </StyledListItemAvatar>
          {log.category.name} will be due on {formattedDateDue}
        </StyledListItem>
      )

    })
  }

  render() {
    return (
      <Container>
        <StyledTypography variant="h2">
          Upcoming Work
        </StyledTypography>
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