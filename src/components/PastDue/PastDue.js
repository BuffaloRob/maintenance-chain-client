import React from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment'
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Build from '@mui/icons-material/Build';
import { useGetItemsQuery, useGetPastDueItemsQuery } from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { allCategoryStatuses, mostUrgentFirst } from '../../store/api/dueStatus';
import PageLayout, { useWideLayout } from '../common/PageLayout';
import DueLogRow from '../common/DueLogRow';
import DuePanel from '../sidebar/DuePanel';
import { StyledListItem, StyledListItemAvatar, StyledTypography } from './styles';

const PastDue = () => {
  const navigate = useNavigate();
  const { data: logs, error, isLoading } = useGetPastDueItemsQuery();
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
        <StyledTypography variant="h2">Past Due</StyledTypography>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StyledTypography variant="h2">Past Due</StyledTypography>
        <Typography variant="h6" color="error" align="center" style={{ marginTop: 20 }}>
          Error loading past due items: {errorMessage(error)}
        </Typography>
      </Container>
    );
  }

  const renderList = () => {
    if (!logs || logs.length === 0) {
      return (
        <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
          No past due items found.
        </Typography>
      );
    }
    return logs.map(log => {
      const formattedDateDue = moment(log.date_due).format("MMM Do YYYY");
      if (wide) {
        return (
          <DueLogRow
            key={log.id}
            log={log}
            text={`${log.category.name} was due on ${formattedDateDue}`}
            itemName={itemName(log)}
          />
        );
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
          {log.category.name} was due on {formattedDateDue}
        </StyledListItem>
      )
    })
  }

  const comingUp = mostUrgentFirst(allCategoryStatuses(items).filter(s => s.status === 'soon'));

  return (
    <Container>
      <PageLayout
        title={
          <StyledTypography variant="h2">
            Past Due
          </StyledTypography>
        }
        aside={<DuePanel title="Coming up next" statuses={comingUp} empty="Nothing is due in the next 30 days." />}
      >
        <List component="nav">{renderList()}</List>
      </PageLayout>
    </Container>
  )
}

export default PastDue;
