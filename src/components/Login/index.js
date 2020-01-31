import React, { Component } from 'react'
import styled from 'styled-components'

import { LineCheck } from '../../context/Authentication-Context'
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


export default class LoginBox extends Component {

  state = {
    itimUrl: 'https://12-itim.freezer.wip.camp/login',
    nonce: 'ABCDEFG',
    state: 'HIJKLMN',
    newState: '',
    newNonce: '',
    isLoad: false,
    // scope: '',
    // access_token: '',
    // token_type: '',
    // expires_in: '',
    // id_token: '',
    tokenObject: { }
  }

  componentDidMount() {
    const search = window.location.search.substring(1);
    console.log(search)
    if (search) {
      this.setState({
        isLoad: true
      })
      const resFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
      console.log('get state from response from line api : ' + resFromLineApi.state)
      if (resFromLineApi.state === this.state.state) {
        this.getTokenFromLineApi(resFromLineApi.code)
        this.changeLineStatus(resFromLineApi.state)
      //   this.getTokenFromLineApi(resFromLineApi.code, Cookies.get('nonce'))
      // Cookies.remove('state', { path: loginGameUrl });
      // Cookies.remove('nonce', { path: loginGameUrl });
      // } else {
      // Cookies.remove('state', { path: loginGameUrl });
      // Cookies.remove('nonce', { path: loginGameUrl });
      //   window.location.href = loginGameUrl
      //   console.log('check state fail')
      }
    } else {
      this.setState({
        isLoad: false
      })
      console.log('fail from line api')
    }
  }

  getGenerateCode = () => {
    let nonce = LineService.getGenerateCode();
    let state = LineService.getGenerateCode();
    this.setState({
      nonce: nonce,
      state: state
    })
  }

  changeLineStatus = (newState) => {
    this.setState({
      newState: newState
    })
  }

  async getTokenFromLineApi(code) {
    const objectResponse = await LineService.lineLogin(code, this.state.nonce)
    if (objectResponse == null) {
      window.location.href = this.state.itimUrl
    }
    const tokenObject = {
      scope: objectResponse.data.scope,
      access_token: objectResponse.data.access_token,
      token_type: objectResponse.data.token_type,
      expires_in: objectResponse.data.expires_in,
      id_token: objectResponse.data.id_token,
      userId: objectResponse.data.userId
    }

    this.setState({
      tokenObject: tokenObject
    })

    window.location.href = 'https://12-itim.freezer.wip.camp/menu'
  }


  
  
  handleClick = () => {
    // this.props.login()
    // console.log(2)
    // this.lineLogin()
    this.props.callbackFromRouter(this.state)
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653703435&redirect_uri=${this.state.itimUrl}&state=${this.state.state}&scope=openid%20email%20profile&nonce=${this.state.nonce}`
  }

  
  render() {
    return (
      <LineCheck.Consumer>
          {
            ({ state }) => (
              <React.Fragment>
                {console.log(state)}
                <Background>
                  <WhiteLoginBox>
                    <HeadText>WIP CAMP #12</HeadText>
                    <LineLoginButton onClick={() => this.handleClick()}
                    // callbackFromRouter={this.myCallBack} 
                    />
                  </WhiteLoginBox>
                </Background>
              </React.Fragment>
            )
          }
      </LineCheck.Consumer>
    )
  }
}