import React, { Component } from 'react'
import styled from 'styled-components'
import LineLoginButton from './LineLoginButton'

const Background = styled.div`
  width: 100%;  
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #9053c7;
  background: linear-gradient(-135deg, #ffce00, #9053c7);
`
const WhiteLoginBox = styled.div`
  width: 960px;
  background: #fff;
  color: black;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  padding: 77px 100px 33px 95px;

  @media (max-width: 992px) {
    padding: 77px 90px 33px 85px;
  font-size: 20px;
  }

  @media (max-width: 768px) {
    padding: 50px 80px 33px 80px;
    font-size: 18px;
  }

  @media (max-width: 576px) {
    padding: 50px 15px 33px 15px;
  }
`

const HeadText = styled.div`
  width: 100%;
  justify-self: center;
`

export default class LoginBox extends Component {
  render() {
    return (
      <Background>
        <WhiteLoginBox>
          <HeadText>WIP CAMP #12</HeadText>
          <LineLoginButton />
        </WhiteLoginBox>
      </Background>
    )
  }
}
