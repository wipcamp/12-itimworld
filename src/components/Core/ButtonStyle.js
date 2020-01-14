import styled from 'styled-components'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

export const ButtonStyle = styled(Button)`
  width: 218.65px!important;
  height: 59px!important;
  background: #304151!important;
  border-radius: 4px!important;
  font-style: normal!important;
  font-weight: 300!important;
  font-size: 16px!important;
  line-height: 21px!important;
  align-items: center!important;
  text-align: center!important;
  color: #FFFFFF;
`

export const ButtonStyleLink = styled(Link)`
  width: 218.65px!important;
  height: 59px!important;
  background: #304151!important;
  border-radius: 4px!important;
  font-style: normal!important;
  font-weight: 300!important;
  font-size: 16px!important;
  line-height: 21px!important;
  align-items: center!important;
  text-align: center!important;
  padding-top:18px;
  color: #FFFFFF;
  &:hover{
    color: #FFFFFF!important;
    text-decoration:none;
  }
`

