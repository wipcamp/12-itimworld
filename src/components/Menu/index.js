import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import userService from '../../services/UserService'

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

const Centering = styled.div`
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

  async componentDidMount() {
    let promise;
    try {
      promise = await userService.getUser(userId)
      let response = promise.data;
      

      if (response.success) {

        const menus = await this.state.menu.map( menu => {
          let {userStatus} = response.data[0]
          let status = false
          if(menu.message == "ข้อมูลส่วนตัว"){
            status = userStatus.registered
            
          }else if(menu.message == "คำถามทั่วไป"){
            status = userStatus.generalAnswered

          }else if(menu.message == "คำถามสาขา"){
            status = userStatus.majorAnswered
            
          }else if(menu.message == "อัพโหลดเอกสาร"){
            status = userStatus.submitted           
          }
          return {...menu,status}
        })

        this.setState({menu:menus})
        console.log(this.state.menu);
              
      } else {
        console.log("Error get User request")
      }
    } catch (e) {
      console.log("Error get User promise")
    }
  }

getUserStatus = async() => {
  userService.getUser(userId)
}

  state = {
    menu: [
      { link: 'edit' , message: 'ข้อมูลส่วนตัว' , imgBefore : '/img/Menu/person1.webp' , imgAfter : '/img/Menu/person1_done.webp' },
      { link: 'general', message: 'คำถามทั่วไป', imgBefore: '/img/Menu/question2.webp', imgAfter: '/img/Menu/question2_done.webp' },
      { link: 'major', message: 'คำถามสาขา', imgBefore : '/img/Menu/track3.webp', imgAfter : '/img/Menu/track3_done.webp' },
      { link: 'document', message: 'อัพโหลดเอกสาร', imgBefore: '/img/Menu/document4.webp', imgAfter: '/img/Menu/document4_done.webp' }
    ],
    status:true
  }

  render() {
    return (
      <Background>
        <Box className="container">
          {
            this.state.menu.map((data, i) => (
              <LinkStyle to={`/${data.link}`} className="text-center col-lg-3 col-md-3 col-sm-6 col-6 mb-5" key={i} style={{pointerEvents:`${ data.status ? "none" : "auto" }`}}>
                <MenuImage src={ !data.status ? data.imgBefore : data.imgAfter } key={i} alt={data.link}/>
                  <Small className="btn">
                    {data.message}
                  </Small>
              </LinkStyle>
            ))
          }
        </Box>
      </Background>
    )
  }
}
