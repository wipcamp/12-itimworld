import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import userService from '../../services/UserService'

import CustomModal from './../Core/CustomModal'
import Waiting from './../Core/Waiting'
import update from 'react-addons-update';

const Background = styled.div`
  width: 100%;  
  min-height: 70vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
`
const Box = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`

const LinkStyle = styled(Link)`
  &::hover {
    text-decoration: none !important;
  }
`

const Small = styled.div`
  color: #FFFFFF !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 24px !important;
  line-height: 31px !important;

  @media (max-width: 576px) {
    font-size: 14px !important;
  }
`

const MenuImage = styled.img`
  width:95%;
  margin-bottom:10px;
  @media (max-width: 992px) {
    width: 85%;
    }

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 576px) {
    margin-bottom:0px;
    width: 90%;
  }
`
const ErrorBox = styled.div`
  width: 100%;
  height: 100%;
  background: #FFF1F0;
  border: 1px solid #F5222D;
  box-sizing: border-box;
  border-radius: 20px;
`

const SuccessBox = styled.div`
  width: 100%;
  height: 100%;
  background: #F8FFF0;
  border: 1px solid #76B445;
  box-sizing: border-box;
  border-radius: 20px;
`

const AlertError = (props) => {
  return(
    <div className="container mb-5" style={props.style}>
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">
          <ErrorBox className="pt-2 pb-2 p-4">
            <div className="row">
              <div className="col-2">
                <img src='/img/error.png' alt="Error" />
              </div>
              <div className="col-10">
                <h4>{props.title}</h4>
                <div>{props.content}</div>
              </div>
            </div>
          </ErrorBox>
        </div>
      </div>
    </div>
  )
}

const SuccessAlert = (props) => {
  return(
    <div className="container mb-5" style={props.style}>
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">
          <SuccessBox className="pt-2 pb-2 p-4">
            <div className="row">
              <div className="col-2">
                <img src='/img/correct.png' alt="Success" />
              </div>
              <div className="col-10">
                <h4>{props.title}</h4>
                <div>{props.content}</div>
              </div>
            </div>
          </SuccessBox>
        </div>
      </div>
    </div>
  )
}
export default class Index extends Component {
  toggleAlertModal = () => {
    this.setState({alertModal:!this.state.alertModal})
  }

  componentDidCatch() {
    this.toggleAlertModal();
  }

  async componentDidMount() {
    let promise;
    try {
      promise = await userService.getMe()
      let response = promise.data;
      

      if (response.success) {
        if(response.data[0].userStatus.documentFailed === true){
          this.setState({
            documentFail: '',
          })
        } else{
          this.setState({
            documentFail: 'none'
          })
        }
        const userStatusSuccess = response.data[0].userStatus.generalAnswered === true && response.data[0].userStatus.majorAnswered === true && response.data[0].userStatus.submitted === true && response.data[0].userStatus.documentFail === false
        
        if(userStatusSuccess){
          this.setState({
            successAlert: true
          })
        } else{
          this.setState({
            successAlert: false
          })
        }
        if(response.data[0].userStatus.registered === true){
          this.setState({
            menu: update(this.state.menu, {0: {done: {$set: true}}})
          })
        }
        if(response.data[0].userStatus.generalAnswered === true){
          this.setState({
            menu: update(this.state.menu, {1: {done: {$set: true}}})
          })
        }
        if(response.data[0].userStatus.majorAnswered === true){
          this.setState({
            menu: update(this.state.menu, {2: {done: {$set: true}}})
          })
        }
        if(response.data[0].userStatus.submitted === true){
          this.setState({
            menu: update(this.state.menu, {3: {done: {$set: true}}})
          })
        }
        const menus = await this.state.menu.map( menu => {
          let {userStatus} = response.data[0]
          let status = false
          if(menu.message === "ข้อมูลส่วนตัว"){
            status = userStatus.registered
            
          }else if(menu.message === "คำถามทั่วไป"){
            status = userStatus.generalAnswered

          }else if(menu.message === "คำถามสาขา"){
            status = userStatus.majorAnswered
            
          }else if(menu.message === "อัพโหลดเอกสาร"){
            status = userStatus.submitted           
          }
          return {...menu,status}
        })


        this.setState({
          menu:menus,
          finishLoad:true
        })
              
      } else {
        this.setState({errorLoad:true})
      }
    } catch (e) {
      this.setState({errorLoad:true})
    }
  }

getUserStatus = async() => {
  userService.getMe()
}

  state = {
    menu: [
      { link: 'edit' , message: 'ข้อมูลส่วนตัว' ,done: false },
      { link: 'general', message: 'คำถามทั่วไป' ,done: false },
      { link: 'major', message: 'คำถามสาขา' ,done: false },
      { link: 'document', message: 'อัพโหลดเอกสาร' ,done: false}
    ],
    status:true,
    alertModal:false,
    finishLoad:false,
    errorLoad:false,
    documentFail: 'none',
    successAlert: false,
  }

  render() {
    if(!this.state.finishLoad || this.state.errorLoad){
      return <Waiting error={this.state.errorLoad} />
    }
    else{
      return (
        <Background>
          <SuccessAlert style={{display: this.state.successAlert === true ? '' : 'none'}} title='ดำเนินการสมัครเสร็จสิ้น' content='รอประกาศผลวันที่ 28 มีนาคม 2563'/>
          <AlertError style={{display: this.state.documentFail }} title='คำเตือน' content='เอกสารที่อัปโหลดมีข้อผิดพลาด' />
          <Box className="container">
            {
              this.state.menu.map((data, i) => (
                <LinkStyle to={`/${data.link}`} className="text-center col-lg-3 col-md-3 col-sm-6 col-6 mb-5" key={i} style={{pointerEvents:`${ data.status &&  data.message === 'คำถามสาขา'  ? "none" : "auto" }`}}>
                  <MenuImage src={`/img/Menu/Button${i+1}${data.done === true ? "_done" : ""}.png`} key={i} alt={data.link}/>
                    <Small className="btn">
                      {data.message}
                    </Small>
                </LinkStyle>
              ))
            }
          </Box>
          <CustomModal header="เกิดข้อผิดพลาดขึ้น" paragraph="โปรดติดต่อเจ้าหน้าที่" secondaryButtonText="ปิด" modal={this.state.alertModal} toggle={this.toggleAlertModal} />
        </Background>
      )
    }
  }
}
