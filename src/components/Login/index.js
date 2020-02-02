import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from "react-router";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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


class Login extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  state = {
    itimUrl: 'https://master.itim.wip.camp/login',
    nonce: '',
    state: '',
    newState: '',
    newNonce: '',
    isLoad: false,
  }

  componentDidMount() {
    const search = window.location.search.substring(1);
    const { match, location, history } = this.props;
    console.log("match1")
    console.log(match)
    console.log("location")
    console.log(location)
    console.log("history")
    console.log(history)
    console.log("End")
    // console.log(search)
    if (search) {
      this.setState({
        isLoad: true
      })
      const resFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
      // console.log('get state from response from line api : ' + resFromLineApi.state)
      const localState = localStorage.getItem('state');
      if (resFromLineApi.state === localState) {
        this.getTokenFromLineApi(resFromLineApi.code)
        this.changeLineStatus(resFromLineApi.state)
      }
    } else {
      this.setState({
        isLoad: false
      })
      // console.log('fail from line api')
    }
  }

  changeLineStatus = (newState) => {
    // console.log(newState)
    this.setState({
      newState: newState
    })
  }

  async getTokenFromLineApi(code) {
    console.log('success')
    const localNonce = localStorage.getItem('nonce');
    const objectResponse = await LineService.lineLogin(code, localNonce)
    const { cookies } = this.props;
    if (objectResponse == null) {
      window.location.href = this.state.itimUrl
    }
    console.log('token')
    const tokenObject = {
      scope: objectResponse.data.scope,
      access_token: objectResponse.data.access_token,
      token_type: objectResponse.data.token_type,
      expires_in: objectResponse.data.expires_in,
      id_token: objectResponse.data.id_token,
      userId: objectResponse.data.userId
    }
    cookies.set('loginObj', tokenObject, { path: '/' });
    console.log(cookies.get('loginObj') ? cookies.get('loginObj') : 'cookie not found')
  }


  
  
  handleClick = async() => {
    const stateGenerate =await  LineService.getGenerateCode()
    const nonceGenerate =await LineService.getGenerateCode()
    localStorage.setItem('state',stateGenerate.data);
    localStorage.setItem('nonce', nonceGenerate.data);
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653703435&redirect_uri=${this.state.itimUrl}&state=${stateGenerate.data}&scope=openid%20email%20profile&nonce=${nonceGenerate.data}`
  }

  
  render() {
    return (
      <LineCheck.Consumer>
          {
            ({ loginObj }) => (
              <React.Fragment>
                {
                  console.log("Customer"),
                  console.log(loginObj)
                }
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

export default withCookies(Login)