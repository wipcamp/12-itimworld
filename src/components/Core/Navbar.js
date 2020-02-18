import React, { Component } from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import {Subtitle} from './Text'
import {Redirect} from 'react-router-dom'

import UserService from '../../services/UserService'

const location = window.location.pathname

const userId = 120001

const cookies = new Cookies()

const Img = styled.img`
  width: 100%;
`
export default class Navbar extends Component {

  state = {
    wipId: 120001,
    name: 'น้องเฟิร์สอ้วน',
    redirect:false
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

  logOut = () => {
    cookies.remove('token')
    this.setState({redirect:true})
  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/login'/>;
    }

    return (
      <React.Fragment>
        {
          // (cookies.get('token') !== undefined && cookies.get('token') !== null)  && location !== '/login' ?
          true  && location !== '/login' ?
            <div className="pt-3 pb-3">
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="row">
                    <div className="col-md-3 col-sm-4 col-6">
                      <Img src="/img/Logo.png" alt="WIP Camp" />
                    </div>
                    <div className="col-md-9 col-sm-8 col-6">
                      <div className="" style={{ color: "white", textAlign: "right" }}>
                        <Subtitle className="text-weight-bold">
                          WIP ID : {this.state.wipId}
                        </Subtitle>
                        <button className="btn btn-danger mt-2" onClick={() => this.logOut()}>
                          <Subtitle>
                            Log Out
                          </Subtitle>
                        </button>
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
