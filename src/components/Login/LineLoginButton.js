import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 400px;
  height: 70px;
`
const Button = styled.div`
  height: 70px;
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: all 0.3s ease-in-out;
  @media(max-width: 500px) {
    max-width: 350px;
  }
  @media(max-width: 360px) {
    max-width: 300px;
  }
  &::after {
  content: '';
  position: absolute;
  z-index: -1;
  height: 70px;
  max-width: 400px;
  @media(max-width: 500px) {
    max-width: 350px;
  }
  @media(max-width: 360px) {
    max-width: 300px;
  }
  width: 100%;
  opacity: 0;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: opacity 0.3s ease-in-out;
  }
  &:hover {
  transform: scale(1.2, 1.2);
  }
  &:hover::after {
  opacity: 1;
  }
`

const LineImg = styled.img`
  height:100%;
`

const Text = styled.div`
  background: #00C300;
  color: #FFFFFF;
  border-radius: 20px;
  height:100%;
  font-size: 24px;
  width:100%;
  padding-right: 3rem;
  @media(max-width: 500px) {
    font-size: 20px;
  }
  @media(max-width: 360px) {
    font-size: 15px;
    padding-right: 1rem;
  }
`

export default class LineLoginButton extends Component {

  render() {
    return (
      <ButtonContainer className="mt-5">
        <Button onClick={this.props.onClick} className="row" >
          <Text className="d-flex align-items-center justify-content-between pl-2">
            <LineImg src="/img/btn_base.png" />
            <div className="col-8">เข้าสู่ระบบด้วย Line</div>
          </Text>
        </Button>
      </ButtonContainer>
    )
  }
}
