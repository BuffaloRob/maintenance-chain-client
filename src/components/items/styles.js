import styled from 'styled-components'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

export const StyledListItem = styled(ListItem)`
  padding: 20px 0;
  @media(max-width: 400px) {
    padding: 40px 0;
  }
`

export const StyledSecondaryAction = styled(ListItemSecondaryAction)`
  @media(max-width: 400px) {
    max-width: 46px;
  }
`
