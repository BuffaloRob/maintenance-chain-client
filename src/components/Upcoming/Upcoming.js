import React from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment'
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Build from '@mui/icons-material/Build';
import { useGetItemsQuery, useGetUpcomingItemsQuery } from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { allCategoryStatuses, mostUrgentFirst } from '../../store/api/dueStatus';
import PageLayout, { useWideLayout } from '../common/PageLayout';
import DueLogRow, { DueLogText } from '../common/DueLogRow';
import DuePanel from '../sidebar/DuePanel';
import { StyledListItem, StyledListItemAvatar, StyledTypography } from './styles';

const Upcoming = () => {
  const navigate = useNavigate();
  const { data: logs, error, isLoading } = useGetUpcomingItemsQuery();
  // Items name each log's item and fill the sidebar
  const { data: items = [] } = useGetItemsQuery();
  const wide = useWideLayout();
  const itemName = log => {
    const item = items.find(i => i.id === log.category.item_id);
    return item ? item.name : '';
  };

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
      const text = `${log.category.name} will be due on ${formattedDateDue}`;
      if (wide) {
        return <DueLogRow key={log.id} log={log} text={text} itemName={itemName(log)} />;
      }
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
          <DueLogText log={log} text={text} itemName={itemName(log)} />
        </StyledListItem>
      )
    })
  }

  const overdue = mostUrgentFirst(allCategoryStatuses(items).filter(s => s.status === 'overdue'));

  return (
    <Container>
      <PageLayout
        title={
          <StyledTypography variant="h2">
            Upcoming Work
          </StyledTypography>
        }
        aside={<DuePanel title="Already overdue" statuses={overdue} empty="Nothing is overdue." />}
      >
        <List component="nav">{renderList()}</List>
      </PageLayout>
    </Container>
  )
}

export default Upcoming;
