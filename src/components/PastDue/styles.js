import styled from 'styled-components'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography';

export const StyledListItem = styled(ListItemButton)`
  font-size: 24px;
  font-weight: 500;
  color: #F55932;
  justify-content: flex-start;
  align-content: center;
  padding: 40px 0 40px 26px;
  @media(max-width: 600px) {
    padding-left: 18px;
  }
`

export const StyledListItemAvatar = styled(ListItemAvatar)`
  @media(max-width: 500px) {
    display: none;
  }
`

export const StyledTypography = styled(Typography)`
  text-align: start;
  padding: 60px 0 40px 20px;
  @media(max-width: 600px) {
    padding: 40px 0 20px 12px;
  }
`
