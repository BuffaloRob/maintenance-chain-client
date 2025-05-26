import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { v4 as uuidv4 } from "uuid";
import { useGetItemsQuery } from "../../store/api/itemsApi";
import { BottomButtons, StyledTypography } from "./styles";
import Item from "./Item";

const ItemList = ({ selectItem }) => {
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
      <Item key={uuidv4()} item={items[itemKey]} selectItem={selectItem} />
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
// import AddIcon from '@material-ui/icons/Add';
// import List from "@material-ui/core/List";
// import Container from "@material-ui/core/Container";
// import Fab from "@material-ui/core/Fab";
// import Tooltip from "@material-ui/core/Tooltip";
// import { v4 as uuidv4 } from 'uuid';
// import { BottomButtons, StyledTypography } from './styles'

// import Item from './Item';

// const ItemList = ({ items, selectItem, deleteItemClick }) => {
//   const renderList = Object.keys(items).map(item => (
//     <Item
//       key={uuidv4()}
//       item={items[item]}
//       selectItem={selectItem}
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
