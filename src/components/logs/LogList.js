import React from "react";
import { Link as RouterLink, useParams } from 'react-router';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { BottomButtons, StyledTypography } from './styles'
import Log from '../logs/Log';
import CategorySummaryPanels from './CategorySummaryPanels';
import RecordStatus from '../common/RecordStatus';
import PageLayout from '../common/PageLayout';
import { useCategory } from '../../store/api/lookups';

const LogList = () => {
  const params = useParams();
  const { item, category, isLoading, error } = useCategory(params.itemId, params.id);

  if (!category) {
    return item
      ? <RecordStatus isLoading={isLoading} error={error} what="category" backTo={`/item/${item.id}`} backLabel={`Back to ${item.name}`} />
      : <RecordStatus isLoading={isLoading} error={error} what="item" backTo="/items" backLabel="Back to items" />;
  }

  const logs = item.logs.filter(log => (log.category_id === category.id))
  const renderList = logs.map(log => (
    <Log
      key={log.id}
      log={log}
      itemId={item.id}
      categoryId={category.id}
    />
  ));

  return (
    <Container>
      <PageLayout
        title={
          <StyledTypography variant="h2">
            {category.name} for {item.name}
          </StyledTypography>
        }
        aside={<CategorySummaryPanels item={item} category={category} logs={logs} />}
      >
        <List component="nav">{renderList}</List>
        <BottomButtons>
          <Fab
            color="secondary"
            aria-label="Back to Categories"
            size="small"
            to={`/item/${item.id}`}
            component={RouterLink}
          >
            <Tooltip title="Back to Categories">
              <ArrowBack />
            </Tooltip>
          </Fab>
          <Fab
            color="primary"
            aria-label="Create New"
            size="small"
            to={`/item/${item.id}/category/${category.id}/log/new`}
            component={RouterLink}
          >
            <Tooltip title="Create New Log">
              <AddIcon />
            </Tooltip>
          </Fab>
        </BottomButtons>
      </PageLayout>
    </Container>
  )

}

export default LogList;
