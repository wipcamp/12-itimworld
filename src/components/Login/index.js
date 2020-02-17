import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie';

import UserService from '../../services/UserService'
import LineService from '../../services/LineService'
import LineLoginButton from './LineLoginButton'

const cookies = new Cookies()

const UpperBackground = styled.div`
  min-height: 40vh;
  width: 100%;  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  padding: 15px;
`

const LowerBackground = styled.div`
  min-height: 40vh;
  width: 100%;  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: unset;
  padding: 15px;
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

const Logo = styled.img`
  width: 40%;

  @media (max-width: 992px) {
    width:50%;
  }

  @media (max-width: 768px) {
    width:60%;
  }

  @media (max-width: 576px) {
    width:90%;
  }
`

class Login extends Component {

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
    // console.log(search)
    if (search) {
      this.setState({
        isLoad: true
      })
      const resFromLineApi = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
      // console.log('get state from response from line api : ' + resFromLineApi.state)
      const cookieState = cookies.get('state');
      if (resFromLineApi.state === cookieState) {
        this.getTokenFromLineApi(resFromLineApi.code)
      }
    } else {
      this.setState({
        isLoad: false
      })
      // console.log('fail from line api')
    }
  }

  postUserService = async (data) => {
    return await UserService.postUser(data)
  }

  async getTokenFromLineApi(code) {
    const cookieNonce = cookies.get('nonce')
    const objectResponse = await LineService.lineLogin(code, cookieNonce, this.state.itimUrl)
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
    const postUserId = { "lineId": tokenObject.userId }
   
    // this.postUserService(postUserId)
    
    try {
      let promise = await this.postUserService(postUserId)
      let response = promise.data;

      if (response.success) {
        const token = response.data[0].token
        cookies.set('token', token, { path: '/' })
        // this.setState({
        //   oldUser: response.data[0],
        //   oldData: response.data[0]
        // });
        // this.setState({ knowWhence: response.data[0].knowWhence });

      } else {
        console.log("Error get User request")
      }
    } catch (e) {
      console.log("Error get User promise")
    }
    cookies.set('loginObj', tokenObject, { path: '/' })
    window.location.href = 'https://master.itim.wip.camp/menu'
  }

  handleClick = async() => {
    // const stateGenerate =await  LineService.getGenerateCode()
    // const nonceGenerate =await LineService.getGenerateCode()
    // localStorage.setItem('state',stateGenerate.data);
    // localStorage.setItem('nonce', nonceGenerate.data);
    // cookies.set('state', stateGenerate.data, { path: '/' });
    // cookies.set('nonce', nonceGenerate.data, { path: '/' });
    window.location.href = 'https://master.itim.wip.camp/menu'
    // window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653703435&redirect_uri=${this.state.itimUrl}&state=${stateGenerate.data}&scope=openid%20email%20profile&nonce=${nonceGenerate.data}`
  }

  
  render() {
    return (
      <div>
        <UpperBackground>
          <Logo src="/img/Logo.png"/>
        </UpperBackground>
        <LowerBackground className="mt-3">
          <LineLoginButton onClick={() => this.handleClick()} />
        </LowerBackground>
      </div>
    )
  }
}

export default Login