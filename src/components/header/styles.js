import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorLeft {
    color: #F4511E;
    width: 25%;
    font-size: 30px;
    padding-top: 40px;
    // padding: 40px 0 0 30px;
    @media (max-width: 768px) {
      width: 70%;
    }
  }

  .MuiListItem-root {
    padding-left: 30px;
    margin: 30px 0;
    @media(max-width: 768px) {
      padding-left: 40px;
      margin: 40px 0;
    }
  
  }
`
