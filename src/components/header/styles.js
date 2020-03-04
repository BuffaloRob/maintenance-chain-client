import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorLeft {
    color: #F4511E;
    width: 25%;
    font-size: 30px;
    /* padding-top: 40px; */
    // padding: 40px 0 0 30px;
    @media (max-width: 768px) {
      width: 70%;
    }
  }

  .MuiListItem-root {
    padding-left: 30px;
    margin: 20px 0;
    @media(max-width: 768px) {
      padding-left: 40px;
      margin: 20px 0;
    }
  
  }
`

export const StyledNavButton = styled(Button)`
  margin-right: 20px;
  .MuiButton-label {
    color: #000000de;
    font-size: 20px;
    font-weight: 500;
  }
`

export const StyledMessage = styled(Typography)` 
  color: #000000de;
  font-size: 24px;
  font-weight: 500;
`
