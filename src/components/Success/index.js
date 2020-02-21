import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import UserService from '../../services/UserService'

const userId = 120001 

const Box = styled.div`
  width: 1125px;
  height: 790px;  
  background: #C4C4C4;
  margin-top:140px;
  margin-bottom:100px;
`

const Header = styled.div`
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;
  text-align: center;
`

const Subtitle = styled.p`
  font-weight: ${props => props.fontWeight};
  font-size: 16px;
  line-height: 21px;
  text-align: center;
`

const Button = styled(Link)`
  background: #304151;
  border-radius: 4px;
  color:#FFFFFF!important;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  align-items: flex-end;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const WhiteBox = styled.div`
  width: 552px;
  height: 220px;
  background-color:#FFFFFF;
`

export default class Index extends Component {

  state = {
    name: 'wip camp',
  }

  async componentDidMount() {
    let promise;
    try {
      promise = await this.getUserService();
      let response = promise.data;

      if (response.success) {
        this.setState({
          name: response.data[0].firstName + " " + response.data[0].lastName,
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

  render() {
    return (
      <React.Fragment>
      <div className="d-flex justify-content-center">
      <Box className="text-center">
        <div className="d-flex justify-content-end">
          <Button className="btn col-3">ไปยัง Facebook Fanpage</Button>
        </div>
        <Header className="col-12">ส่งใบสมัครค่ายสำเร็จ</Header>
        <Subtitle className="col-12" fontWeight="300">
            น้อง{this.state.name} ได้ส่งใบสมัครค่ายสำเร็จเรียบร้อยแล้ว <br />
            โปรดรอฟังผลการประกาศค่ายในวันที่ xx มีนาคม 2562 ผ่านทาง Facebook Live นะครับ
        </Subtitle>
        <div className="d-flex justify-content-center ">
          <WhiteBox className="text-center">
            <Subtitle fontWeight="bold">เอกสารที่ต้องเตรียม</Subtitle>
          </WhiteBox>
        </div>
        <Button className="btn col-3" to="/edit">แก้ไขข้อมูล</Button>
      </Box>
      </div>
      </React.Fragment>
    )
  }
}
