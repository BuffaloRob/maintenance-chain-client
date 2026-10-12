import React from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useGetItemsQuery } from "../../store/api/maintenanceApi";
import { errorMessage } from "../../store/api/errorMessage";
import { isArchived } from "../../store/api/dueStatus";
import PageLayout from "../common/PageLayout";
import Item from "../items/Item";
import { StyledTypography } from "../items/styles";

const byRecentlyArchived = (a, b) => Date.parse(b.archived_at) - Date.parse(a.archived_at) || b.id - a.id;

// Items that are out of use, most recently archived first. Their records open
// as usual, but nothing of theirs is due.
const ArchiveList = () => {
  const { data: items = [], error, isLoading } = useGetItemsQuery();
  const title = <StyledTypography variant="h2">Archive</StyledTypography>;

  if (isLoading) {
    return (
      <Container>
        {title}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        {title}
        <Typography variant="h6" color="error" align="center" style={{ marginTop: 20 }}>
          Error loading items: {errorMessage(error)}
        </Typography>
      </Container>
    );
  }

  const archived = items.filter(isArchived).sort(byRecentlyArchived);

  return (
    <Container>
      <PageLayout title={title}>
        {archived.length === 0 ? (
          <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
            Nothing is archived. Archive an item you no longer maintain to keep its records out of the way.
          </Typography>
        ) : (
          <List component="nav">
            {archived.map(item => <Item key={item.id} item={item} />)}
          </List>
        )}
      </PageLayout>
    </Container>
  );
};

export default ArchiveList;
