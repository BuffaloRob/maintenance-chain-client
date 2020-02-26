import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer'

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorLeft {
    width: 25%;
    font-size: 30px;
    padding: 30px;
    @media (max-width: 768px) {
      width: 70%;
      align-items: center;
    }
  }

  .MuiListItem-root {
    padding: 10px 0;
  
  }
`
