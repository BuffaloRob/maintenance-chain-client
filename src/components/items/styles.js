import styled from 'styled-components'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

export const StyledTypography = styled(Typography)`
  text-align: start;
  padding: 60px 0 40px 20px;
  @media(max-width: 600px) {
    padding: 40px 0 20px 12px;
  }
  @media(max-width: 500px) {
    text-align: center;
  }
`

export const BottomButtons = styled(Grid)`
  padding-top: 20px;
  margin-left: 11px;
  @media(max-width: 768px) {
    margin-left: 11px;
  }
  @media(max-width: 500px) {
    /* margin-left: 15px; */
    text-align: center;
    margin-left: 0px;
  }
`

export const ListItemGrid = styled(Grid)`  
  @media(max-width: 500px) { 
    .MuiListItemButton-root {
      text-align: center;
    }
  }
`

export const ButtonGrid = styled(Grid)`
  @media(max-width: 768px) {
    min-width: 46px;
  }
  @media(max-width: 500px) {
    display: none;
  }
`

export const StyledListItem = styled(ListItemButton)`
  padding: 20px 16px;
  @media(max-width: 768px) {
    padding: 40px 16px;
  }
  @media(max-width: 500px) {
    padding: 20px 20px;
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
  color: #F55932;
  .MuiTypography-body1 {
    font-size: 20px;
    font-weight: 500;
  }
`

export const DeleteFab = styled(Fab)`
  background-color: #78909C;
  &:hover {
    background-color: rgb(84, 100, 109);
  }
  .MuiSvgIcon-root {
    fill: #d4000f;
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

// ********* Item cards (sm and up) *********

export const ItemGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
`

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: #2E2E2E;
`

export const CardTitle = styled(Typography)`
  margin: 0;
  color: #F55932;
  font-size: 20px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CardMeta = styled(Typography)`
  margin: 0;
  color: #bdbdbd;
  font-size: 14px;
`

// ********* Item Create / Item Edit *********

export const StyledGridContainer = styled(Grid)` 
  margin-top: 60px;
`

export const FabContainer = styled(Grid)` 
  margin-top: 40px;
`
