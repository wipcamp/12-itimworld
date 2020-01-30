import React, { Component } from 'react'
import styled from 'styled-components'

import { Authentication } from '../../context/Authentication-Context'

import UserService from '../../services/UserService'

const location = window.location.pathname

const userId = 120001

const Img = styled.img`
  width: 270px;
  height: 81.41px;
`
export default class Navbar extends Component {

  state = {
    wipId: 0,
    name: 'welcome'
  }

  async componentDidMount() {
    let promise;
    try {
      promise = await this.getUserService();
      let response = promise.data;
      if (response.success) {
        let nickName = response.data[0].nickName === null || response.data[0].nickName === '' ? 'Welcome' : response.data[0].nickName
        this.setState({
          wipId: response.data[0].wipId,
          name: nickName,
        });
      } else {
        console.log("Error get User request")
      }
    } catch (e) {
      console.log("Error get User promise")
    }
  }

  getUserService = async () => {
    return await UserService.getUser(userId);
  }

  render() {
    return (
        <Authentication.Consumer>
        {
          ({ isAuthenticated }) => (
          isAuthenticated ?
            <div className="pt-3 mb-5">
              <div className="d-flex justify-content-between ml-5 mr-5">
                <Img src="/img/Logo.png" alt="WIP Camp" />
                <div className="justify-content-end">
                  WIP ID :{this.state.wipId}
                  <br />
                  {this.state.name}
                </div>
              </div>
            </div>
            :
            ''
          )
        }
        </Authentication.Consumer>
    )
  }
}
