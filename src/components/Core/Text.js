import styled from 'styled-components'
import fonts from '../../config/fonts'

export const HeaderText = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: ${fonts.Headline};
  line-height: 47px;
  text-align: center!important;
`

export const Paragrph = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: ${fonts.Paragraph};
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 3em;
`

export const Subtitle = styled.div`
  font-style: normal!important;
  font-weight: bold!important;
  font-size: ${fonts.Subtitle};
  line-height: 23px;
`

export const Small = styled.div`
  font-weight: 300;
  font-size: ${fonts.Small};
  line-height: 17px;
`