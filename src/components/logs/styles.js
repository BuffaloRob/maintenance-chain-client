import styled from 'styled-components'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from "@mui/material/TextField"
import Container from '@mui/material/Container'

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

export const StyledLogListItem = styled(ListItem)`
  align-items: flex-start;
  h5:nth-of-type(1) {
    min-width: 20%;
  }
  h5:nth-of-type(2) {
    padding-left: 4px;
    font-weight: 500;
    white-space: pre-line;
    overflow-x: auto;
  }
  @media(max-width: 768px) {
    h5:nth-of-type(1) {
      min-width: 25%;
    }
  }
  @media(max-width: 600px) {
    h5:nth-of-type(1) {
      min-width: 30%;
    }
  }
  @media(max-width: 500px) {
    h5:nth-of-type(1) {
      min-width: 35%;
    }
  }
  @media(max-width: 435px) {
    h5:nth-of-type(1) {
      min-width: 45%;
    }
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
  .MuiListItemText-secondary {
    color: #ffff;
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
// ********* Log Create / Log Edit *********

export const StyledTitle = styled(Typography)`
  text-align: start;
  padding: 60px 0 20px 0px;
  margin: 0 0 0 -2px;
  @media(max-width: 600px) {
    padding: 20px 0 10px 0px;
  }
`

export const StyledTextField = styled(TextField)` 
  .MuiFormLabel-root {
    font-size: 1.4rem;
  }
`

export const StyledContainer = styled(Container)`
  margin-left: 26px;
  @media( max-width: 600px) {
    margin-left: 18px;
  }
`

export const StyledForm = styled.form`
  margin: 40px 0 20px;
`

export const BottomNav = styled(Grid)`
  margin-left: -6px;
`

export const FormSubmit = styled(Grid)`
  /* margin-left: -8px; */
`
