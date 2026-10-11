import React from 'react';
import { Link as RouterLink, useParams } from 'react-router';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { BottomButtons, StyledTypography } from './styles'
import Category from './Category';
import ItemSummaryPanel from './ItemSummaryPanel';
import RecordStatus from '../common/RecordStatus';
import PageLayout from '../common/PageLayout';
import RecentLogsPanel from '../sidebar/RecentLogsPanel';
import { useItem } from '../../store/api/lookups';
import { latestLog } from '../../store/api/dueStatus';

const CategoryList = () => {
  const params = useParams();
  const { item, isLoading, error } = useItem(params.id);

  if (!item) {
    return <RecordStatus isLoading={isLoading} error={error} what="item" backTo="/items" backLabel="Back to items" />;
  }

  const renderList = item.categories.map(category => (
    <Category
      key={category.id}
      category={category}
      itemId={item.id}
      log={latestLog(item, category.id)}
    />
  ));

  return (
    <Container>
      <PageLayout
        title={
          <StyledTypography variant="h2">
            {item.name}
          </StyledTypography>
        }
        aside={
          <>
            <ItemSummaryPanel item={item} />
            <RecentLogsPanel items={[item]} showItem={false} />
          </>
        }
      >
        <List component="nav">{renderList}</List>
        <BottomButtons>
          <Fab
            color="secondary"
            aria-label="Back to Categories"
            size="small"
            to={`/items`}
            component={RouterLink}
          >
            <Tooltip title="Back to Items">
              <ArrowBack />
            </Tooltip>
          </Fab>
          <Fab
            color="primary"
            aria-label="Create New"
            size="small"
            to={`/item/${item.id}/category/new`}
            component={RouterLink}
          >
            <Tooltip title="Create New Category">
              <AddIcon />
            </Tooltip>
          </Fab>
        </BottomButtons>
      </PageLayout>
    </Container>
  )

}

export default CategoryList;