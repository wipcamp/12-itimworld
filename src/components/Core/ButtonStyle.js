import styled from 'styled-components'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

export const ButtonStyle = styled(Button)`
  width: 218.65px!important;
  height: 59px!important;
  background: #304151;
  border-radius: 4px!important;
  font-style: normal!important;
  font-weight: 300!important;
  font-size: 16px!important;
  line-height: 21px!important;
  align-items: center!important;
  text-align: center!important;
  color: #FFFFFF;

  @media (max-width: 768px) {
    width: 150.65px!important;
    height: 49px!important;
    border-radius: 4px!important;
    font-weight: 300!important;
    font-size: 16px!important;
    line-height: 21px!important;
  }

  @media (max-width: 576px) {
    width: 88.8px!important;
    height: 33.76px!important;
    border-radius: 4px!important;
    font-weight: 300!important;
    font-size: 16px!important;
    line-height: 10px!important;
  }
`

export const ButtonStyleLink = styled(Link)`
  width: 218.65px;
  height: 59px;
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

  @media (max-width: 768px) {
    width: 150.65px!important;
    height: 49px!important;
    border-radius: 4px!important;
    font-weight: 300!important;
    font-size: 16px!important;
    line-height: 21px!important;
  }

  @media (max-width: 576px) {
    width: 88.8px!important;
    height: 33.76px!important;
    border-radius: 4px!important;
    font-weight: 300!important;
    font-size: 16px!important;
    line-height: 10px!important;
  }
`

