import React from 'react';
import { Link as RouterLink } from 'react-router';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from 'styled-components';

// Phones have no room for a row's Edit and Delete buttons, which are hidden
// up to 500px wide; this menu takes their place there.
const PhoneOnly = styled.span`
  display: none;
  @media (max-width: 500px) {
    display: inline-flex;
  }
`;

const RowActionsMenu = ({ editTo, onDelete }) => {
  const [anchor, setAnchor] = React.useState(null);
  const close = () => setAnchor(null);

  return (
    <PhoneOnly>
      <IconButton
        aria-label="More actions"
        edge="end"
        onClick={e => setAnchor(e.currentTarget)}
        sx={{ color: 'grey.500' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchor} open={!!anchor} onClose={close}>
        <MenuItem component={RouterLink} to={editTo} onClick={close}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            close();
            onDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </PhoneOnly>
  );
};

export default RowActionsMenu;
