import React, { Component } from 'react'
import styled from 'styled-components'

import LineService from '../../services/LineService'
import LineLoginButton from './LineLoginButton'

const Background = styled.div`
  width: 100%;  
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  /* background: #9053c7;
  background: linear-gradient(-135deg, #ffce00, #9053c7); */
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
// form line api
// const nonce & const state send href
// const state = state // vurify its real data 
// const nonce && const code send to lineService 
// const nonce = nonce // vurify its real user
// reqeust json send lineService 


export default class LoginBox extends Component {

  state = {
    itimUrl: 'http://localhost:3211/',
    nonce: 'ABCDEFG',
    state: 'HIJKLMN',
    // scope: '',
    // access_token: '',
    // token_type: '',
    // expires_in: '',
    // id_token: '',
    userId: ''
  }

  getGenerateCode = () => {
    let nonce = LineService.getGenerateCode();
    let state = LineService.getGenerateCode();
    this.setState({
      nonce: nonce,
      state: state
    })
  }

  handleClick = () => {
    // this.props.login()
    // window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653703435
    //                           &redirect_uri=${this.state.itimUrl}&state=${this.state.state}
    //                           &scope=openid%20email%20profile&nonce=${this.state.nonce}`
  }

  
  render() {
    return (
      <Background>
        <WhiteLoginBox>
          <HeadText>WIP CAMP #12</HeadText>
          <LineLoginButton onClick={() => this.handleClick()} callbackFromRouter={this.props.callbackFromRouter} />
        </WhiteLoginBox>
      </Background>
    )
  }
}