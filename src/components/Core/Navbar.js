import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import Cookies from 'universal-cookie'

import UserService from '../../services/UserService'

const location = window.location.pathname

const userId = 120001

const cookies = new Cookies()

const Img = styled.img`
  width: 100%;
`

const Logout = styled(Button)`
  font-weight: 500;
  font-size: 18px;
  background: #D11242!important;
  width: 120px;
  height: 40px;
`

export default class Navbar extends Component {

  state = {
    wipId: ''
  }

  async componentDidMount() {
    let promise;
    try {
      promise = await this.getUserService();
      let response = promise.data;
      console.log(response)
      if (response.success) {
        let nickName = response.data[0].nickName === null || response.data[0].nickName === '' ? 'Welcome' : response.data[0].nickName
        this.setState({
          wipId: response.data[0].wipId
        });
      } else {
        console.log("Error get User request")
      }
    } catch (e) {
      console.log("Error get User promise")
    }
  }

  getUserService = async () => {
    return await UserService.getMe();
  }

  handleClick = () => {
    cookies.remove('token', { path: '/' })
    cookies.remove('state', { path: '/' })
    cookies.remove('nonce', { path: '/' })
    cookies.remove('loginObj', { path: '/' })
    window.location.href = '/login'
  }

  render() {
    return (
      <React.Fragment>
        {
          (cookies.get('token') !== undefined && cookies.get('token') !== null)  && location !== '/login' ?
          // true  && location !== '/login' ?
            <div className="pt-3 pb-3">
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="row">
                    <div className="col-md-3 col-sm-4 col-6">
                      <Img src="/img/Logo.png" alt="WIP Camp" />
                    </div>
                    <div className="col-md-9 col-sm-8 col-6">
                      <div className="" style={{ color: "white", textAlign: "right" ,fontSize: '24px' }}>
                        WIP ID : {this.state.wipId}
                        <br />
                        <Logout onClick={() => this.handleClick()}>
                          Log Out
                        </Logout>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          :
          ''
        }
      </React.Fragment>
    )
  }
}
