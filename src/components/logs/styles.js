import styled from 'styled-components'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField"
import Container from '@material-ui/core/Container'

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
    .MuiListItem-root {
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

export const StyledListItem = styled(ListItem)`
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
  color: #F4511E;
  .MuiTypography-body1 {
    font-size: 20px;
    font-weight: 500;
  }
  .MuiTypography-colorTextSecondary {
    color: #ffff;
  }
`

export const DeleteFab = styled(Fab)`
  background-color: #78909C;
  &:hover {
    background-color: rgb(84, 100, 109);
  }
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
// ********* Log Create / Log Edit *********

export const StyledTextField = styled(TextField)` 
  .MuiFormLabel-root {
    font-size: 1.4rem;
  }
`

export const StyledContainer = styled(Container)`

`

export const StyledForm = styled.form`
  margin: 40px 0 20px;
`