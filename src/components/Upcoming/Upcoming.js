import React from 'react';
import moment from 'moment'
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Build from '@material-ui/icons/Build';
import history from '../../history';
import { useGetUpcomingItemsQuery } from '../../store/api/maintenanceApi';
import { StyledListItem, StyledListItemAvatar, StyledTypography } from './styles';

const Upcoming = () => {
  const { data: logs, error, isLoading } = useGetUpcomingItemsQuery();

  if (isLoading) {
    return (
      <Container>
        <StyledTypography variant="h2">Upcoming Work</StyledTypography>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StyledTypography variant="h2">Upcoming Work</StyledTypography>
        <Typography variant="h6" color="error" align="center" style={{ marginTop: 20 }}>
          Error loading upcoming items: {error.message || error.error || "Something went wrong"}
        </Typography>
      </Container>
    );
  }

  const renderList = () => {
    if (!logs || logs.length === 0) {
      return (
        <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
          No upcoming items found.
        </Typography>
      );
    }
    return logs.map(log => {
      const formattedDateDue = moment(log.date_due).format("MMM Do YYYY");
      return (
        <StyledListItem
          key={log.id}
          button
          onClick={() => history.push(`/log/${log.id}`)}
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

  return (
    <Container>
      <StyledTypography variant="h2">
        Upcoming Work
      </StyledTypography>
      <List component="nav">{renderList()}</List>
    </Container>
  )
}

export default Upcoming;
