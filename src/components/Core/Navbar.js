import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'
import CustomModal from './CustomModal'

import UserService from '../../services/UserService'

const cookies = new Cookies()

const Img = styled.img`
  width: 100%;
`

const WIPId = styled.div`
  font-size: 24px;
  @media (max-width:768px) {
    font-weight: 300;
    font-size: 18px;
    line-height: 17px;
  }
`

const Logout = styled(Button)`
  font-weight: 500;
  font-size: 18px;
  background: #D11242;
  border-radius: 4px;
  border: none!important;
  border-color: #D11242!important;
  max-width: 140px;
  width: 100%;
  height: 100%;
`

export default class Navbar extends Component {

  state = {
    wipId: '',
    redirect: false,
    modal: false
  }

  async componentDidMount() {
    const cookieToken = cookies.get('token');
    if (cookieToken !== null && cookieToken !== undefined && cookieToken !== "") {
      let promise;
      try {
        promise = await this.getUserService();
        let response = promise.data;
        if (response.success) {
          this.setState({
            wipId: response.data[0].wipId
          });
        } else {
          this.toggleModal()
        }
      } catch (e) {
        this.toggleModal()
      }
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

  toggleModal = () => {
    this.setState({modal: !this.state.modal})
  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/login' />;
    }

    return (
      <div className="pt-3 pb-3">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="row">
              <div className="col-md-3 col-sm-4 col-6">
                <Img src="/img/Logo.png" alt="WIP Camp" />
              </div>
              <div className="col-md-9 col-sm-8 col-6">
                <div style={{ color: "white", textAlign: "right", fontSize: '24px' }}>
                  {
                    this.state.wipId !== null || this.state.wipId !== undefined || this.state.wipId !== '' ?
                      <WIPId className="mb-3">
                        WIP ID : {this.state.wipId}
                      </WIPId>
                      :
                      <div>Error</div>
                  }
                  <div className="row">
                    <div className="offset-2 col-10 offset-sm-8 col-sm-4 offset-md-9 col-md-3">
                      <Logout className="pt-2" onClick={() => this.handleClick()}>
                          Log Out
                      </Logout>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomModal header="เกิดข้อผิดพลาดขึ้น" paragraph="โปรดล็อคอินใหม่" secondaryButtonText="ตกลง" modal={this.state.modal} toggle={this.handleClick} />
      </div>
    )
  }
}
