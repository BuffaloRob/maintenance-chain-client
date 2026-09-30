import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useGetItemsQuery } from "../../store/api/maintenanceApi";
import { BottomButtons, StyledTypography } from "./styles";
import Item from "./Item";

const ItemList = () => {
  const { data: items, error, isLoading } = useGetItemsQuery();

  const renderList = () => {
    if (!items || Object.keys(items).length === 0) {
      return (
        <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
          No items found. Create your first item!
        </Typography>
      );
    }

    return Object.keys(items).map((itemKey) => (
      <Item key={items[itemKey].id} item={items[itemKey]} />
    ));
  };

  if (isLoading) {
    return (
      <Container>
        <StyledTypography variant="h2">Items</StyledTypography>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        >
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StyledTypography variant="h2">Items</StyledTypography>
        <Typography
          variant="h6"
          color="error"
          align="center"
          style={{ marginTop: 20 }}
        >
          Error loading items: {error.message || "Something went wrong"}
        </Typography>
        <BottomButtons>
          <Fab
            color="primary"
            aria-label="Create New Item"
            size="small"
            to={`/item/new`}
            component={RouterLink}
          >
            <Tooltip title="Create New Item">
              <AddIcon />
            </Tooltip>
          </Fab>
        </BottomButtons>
      </Container>
    );
  }

  return (
    <Container>
      <StyledTypography variant="h2">Items</StyledTypography>
      <List component="nav">{renderList()}</List>
      <BottomButtons>
        <Fab
          color="primary"
          aria-label="Create New Item"
          size="small"
          to={`/item/new`}
          component={RouterLink}
        >
          <Tooltip title="Create New Item">
            <AddIcon />
          </Tooltip>
        </Fab>
      </BottomButtons>
    </Container>
  );
};

export default ItemList;

// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import AddIcon from '@mui/icons-material/Add';
// import List from "@mui/material/List";
// import Container from "@mui/material/Container";
// import Fab from "@mui/material/Fab";
// import Tooltip from "@mui/material/Tooltip";
// import { v4 as uuidv4 } from 'uuid';
// import { BottomButtons, StyledTypography } from './styles'

// import Item from './Item';

// const ItemList = ({ items, selectItem, deleteItemClick }) => {
//   const renderList = Object.keys(items).map(item => (
//     <Item
//       key={uuidv4()}
//       item={items[item]}
//      
//       deleteItemClick={deleteItemClick}
//     />
//   ));

//   if (!items) {
//     return <h3>...Loading</h3>
//   }
// return (
//   <Container>
//     <StyledTypography variant="h2">
//       Items
//     </StyledTypography>
//     <List component="nav">{renderList}</List>
//     <BottomButtons>
//       <Fab
//         color="primary"
//         aria-label="Create New Item"
//         size="small"
//         to={`/item/new`}
//         component={RouterLink}
//       >
//         <Tooltip title="Create New Item">
//           <AddIcon />
//         </Tooltip>
//       </Fab>
//     </BottomButtons>
//   </Container>
// )
// }

// export default ItemList;
