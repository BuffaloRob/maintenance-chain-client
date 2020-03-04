import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';

export const StyledHeader = styled(Typography)`
  /* padding: 60px 0 40px; */
  color: #F4511E;
  /* font-size: 50px; */
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 35px
  }
`

export const StyledCTA = styled(Typography)`
  white-space: pre-wrap;
  font-size: 24px;
  font-weight: 500;
  line-height: 2;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

export const CtaHeader = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
  /* color: black; */
`

export const StyledDivider = styled(Divider)` 
  background-color: #F4511E;
  height: 3px;
  margin: 20px 0;
`
