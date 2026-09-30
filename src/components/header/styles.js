import styled from 'styled-components'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export const LeftNavContainer =styled(Container)` 
  @media(max-width: 500px) {
    max-width: 40px;
  }
`

export const StyledDrawer = styled(Drawer)`
  &.MuiDrawer-anchorLeft .MuiDrawer-paper {
    color: #F55932;
    width: 25%;
    font-size: 30px;
    /* padding-top: 40px; */
    // padding: 40px 0 0 30px;
    @media (max-width: 768px) {
      width: 70%;
    }
  }

  .MuiListItemButton-root {
    padding-left: 30px;
    margin: 20px 0;
    @media(max-width: 768px) {
      padding-left: 40px;
      margin: 20px 0;
    }
  
  }
`

// MUI v5+ removed the inner .MuiButton-label span, so label styles go on the root.
export const StyledNavButton = styled(Button)`
  margin-right: 20px;
  color: #000000de;
  font-size: 20px;
  font-weight: 500;
`
export const LogInButton = styled(Button)`
  color: #000000de;
  font-size: 20px;
  font-weight: 500;
`

export const StyledMessage = styled(Typography)` 
  color: #000000de;
  font-size: 24px;
  font-weight: 500;
`
