import React from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment'
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Build from '@mui/icons-material/Build';
import { useGetUpcomingItemsQuery } from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { StyledListItem, StyledListItemAvatar, StyledTypography } from './styles';

const Upcoming = () => {
  const navigate = useNavigate();
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
          Error loading upcoming items: {errorMessage(error)}
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
          onClick={() => navigate(`/log/${log.id}`)}
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
