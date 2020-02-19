import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import userService from '../../services/UserService'
import CustomModal from './../Core/CustomModal'
import Waiting from './../Core/Waiting'

const userId = 120001;

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
      promise = await userService.getUser(userId)
      let response = promise.data;
      

      if (response.success) {

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
  userService.getUser(userId)
}

  state = {
    menu: [
      { link: 'edit' , message: 'ข้อมูลส่วนตัว'  },
      { link: 'general', message: 'คำถามทั่วไป' },
      { link: 'major', message: 'คำถามสาขา' },
      { link: 'document', message: 'อัพโหลดเอกสาร' }
    ],
    status:true,
    alertModal:false,
    finishLoad:false,
    errorLoad:false
  }

  render() {
    if(!this.state.finishLoad || this.state.errorLoad){
      return <Waiting error={this.state.errorLoad} />
    }
    else{
      return (
        <Background>
          <Box className="container">
            {
              this.state.menu.map((data, i) => (
                <LinkStyle to={`/${data.link}`} className="text-center col-lg-3 col-md-3 col-sm-6 col-6 mb-5" key={i} style={{pointerEvents:`${ data.status ? "none" : "auto" }`}}>
                  <MenuImage src={`/img/Menu/Button${i+1}.png`} key={i} alt={data.link}/>
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
