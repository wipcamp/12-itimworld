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
// form line api
// const nonce & const state send href
// const state = state // vurify its real data 
// const nonce && const code send to lineService 
// const nonce = nonce // vurify its real user
// reqeust json send lineService 

const loginGameUrl = 'http://localhost:3211/'
const clientId = '1653724802'

export default class LoginBox extends Component {

  state = {
    itimUrl: 'https://12-itim.freezer.wip.camp/',
    nonce: 'ABCDEFG',
    state: 'HIJKLMN',
    // scope: '',
    // access_token: '',
    // token_type: '',
    // expires_in: '',
    // id_token: '',
    userId: ''
  }

  componentDidMount(){
    // this.getGenerateCode()
  }

  componentDidUpdate(){
    // console.log(this.state.nonce)
    // console.log(this.state.state)
  }
  myCallback = (isAuthenticated) => {
    this.props.callbackFromRouter(isAuthenticated)
  }

  getGenerateCode = () => {
    let nonce = LineService.getGenerateCode();
    let state = LineService.getGenerateCode();
    this.setState({
      nonce: nonce,
      state: state
    })
  }

  async lineLogin() {
    const stateGenerate = await LineService.getGenerateCode()
    const nonceGenerate = await LineService.getGenerateCode()
    console.log(2)
    // Cookies.set('state', stateGenerate.data, { domain: 'game.freezer.wip.camp', path: '/login' })
    // Cookies.set('nonce', nonceGenerate.data, { domain: 'game.freezer.wip.camp', path: '/login' })
    // Cookies.set('state',nonceGenerate.data,{domain:})
    // Cookies.set('nonce',nonceGenerate.data,{path: '/login'})
    // let stateInCookies = Cookies.get('state')
    // console.log('from cookies : ' + Cookies.get('state'))
    // console.log('init stateInCookies : ' + stateInCookies)
    // if (stateGenerate.data == Cookies.get('state')) {

    // } else {
    //     stateInCookies = "someThing"
    // }
    // const nonceInCookies = Cookies.get('nonce')
    // console.log(stateInCookies)
    // console.log(nonceInCookies)
    // window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}
    //                           &redirect_uri=${this.state.itimUrl}&state=${stateGenerate}&scope=openid%20email%
    //                           20profile&nonce=${nonceGenerate}`

  }

  handleClick = () => {
    // this.props.login()
    // console.log(2)
    // this.lineLogin()
    // window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653703435
    //                           &redirect_uri=${this.state.itimUrl}&state=${this.state.state}
    //                           &scope=openid%20email%20profile&nonce=${this.state.nonce}`
  }

  
  render() {
    return (
      <Background>
        <WhiteLoginBox>
          <HeadText>WIP CAMP #12</HeadText>
          <LineLoginButton onClick={() => this.handleClick()} callbackFromRouter={this.myCallback} />
        </WhiteLoginBox>
      </Background>
    )
  }
}