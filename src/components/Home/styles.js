import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

export const GridContainer = styled(Grid)` 
  padding-bottom: 80px;
`

export const StyledHeader = styled(Typography)`
  padding: 30px 0 10px;
  color: #F4511E;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 35px
  }
`

export const StyledIntro = styled.div`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
  padding-bottom: 20px;
  color: #F4511E;
  @media (max-width: 768px) {
    font-size: 15px;
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

export const CtaHeader = styled(Typography)`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #F4511E;
`

export const StyledDivider = styled(Divider)` 
  background-color: #F4511E;
  height: 3px;
  margin: 20px 0;
`
