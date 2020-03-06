import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

export const GridContainer = styled(Grid)` 
  padding-bottom: 60px;
`

export const StyledHeader = styled(Typography)`
  padding: 60px 0 20px;
  color: #F55932;
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
  color: #fff;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

export const StyledCTA = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 2;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

export const CtaHeader = styled(Typography)`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #F55932;
`

export const HowToDiv = styled.div` 
  color: #fff;
`

export const BottomDiv = styled(Typography)` 
  color: #F55932;
  font-size: 40px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 30px
  }
`

export const StyledDivider = styled(Divider)` 
  background-color: #F55932;
  height: 3px;
  margin: 20px 0;
`
