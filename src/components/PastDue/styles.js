import styled from 'styled-components'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

export const StyledListItem = styled(ListItem)`
  font-size: 24px;
  font-weight: 500;
  color: #F4511E;
  justify-content: flex-start;
  text-align: center;
  align-content: center;
  padding: 40px 0 40px 26px;
`

export const StyledListItemAvatar = styled(ListItemAvatar)`
  @media(max-width: 500px) {
    display: none;
  }
`
