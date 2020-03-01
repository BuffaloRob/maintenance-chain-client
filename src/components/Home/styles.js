import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const StyledHeader = styled(Typography)`
  color: #F4511E;
  font-size: 50px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 35px
  }
`

export const StyledCTA = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`
