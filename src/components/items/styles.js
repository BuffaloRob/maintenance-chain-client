import styled from 'styled-components'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

export const BottomButtons = styled(Grid)`
  margin-left: 11px;
`

export const ListItemGrid = styled(Grid)`  
  @media(max-width: 374px) { 
    .MuiListItem-root {
      text-align: center;
    }
  }
`

export const ButtonGrid = styled(Grid)`
  @media(max-width: 768px) {
    min-width: 46px;
  }
  @media(max-width: 374px) {
    display: none;
  }
`

export const StyledListItem = styled(ListItem)`
  padding: 20px 16px;
  @media(max-width: 768px) {
    padding: 40px 9px;
  }
  @media(max-width: 374px) {
    padding: 10px 10px;
  }
`

export const StyledSecondaryAction = styled(ListItemSecondaryAction)`
  @media(max-width: 768px) {
    max-width: 50px;
  }
`

export const StyledListText = styled(ListItemText)`
  color: #F4511E;
  .MuiTypography-body1 {
    font-size: 20px;
    font-weight: 500;
  }
`

export const DeleteFab = styled(Fab)`
  background-color: #78909C;
  .MuiSvgIcon-root {
    fill: #ba000d;
  }
`

export const StyledAvatar = styled(ListItemAvatar)`
  @media(max-width: 500px) {
    display: none;
  }
`

export const StyledDivider = styled(Divider)`
  margin: 20px 0;
`
