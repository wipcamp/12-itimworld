import React, { Component } from 'react'
import styled from 'styled-components'
import MajorService from './../../services/MajorService'

import ImageRadio from './ImageRadio'
import ButtonRoute from '../Core/ButtonRoute'
import ConfirmModal from './ConfirmModal'
import Waiting from '../Core/Waiting'
import CustomModal from './../Core/CustomModal'

const Header = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;
  text-align: center;
`

const Title = styled.p`
  visibility:${props => props.visible};
`

const MajorName = styled(Title)`
  height:15vh;
`

const ContainerDiv = styled.div`
  max-width:1800px;
`

export default class Index extends Component {

  state = {
    finishLoad:false,
    errorLoad:false,
    pictures: {
      default: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
      selected: 'https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg'
    },
    selectedMajor: {
      id: null,
      description: null,
      name: null
    },
    showMajor:{
      name: null,
      description: null
    },
    majors: [
      {
        "id": 1,
        "name": "Science",
        "description": "What to learn",
        "questionList": [
          {
            "id": 1,
            "name": "What is my name"
          },
          {
            "id": 2,
            "name": "What time is it"
          }
        ]
      },
      {
        "id": 2,
        "name": "Math",
        "description": "When to sleep",
        "questionList": []
      },
      {
        "id": 3,
        "name": "Math1",
        "description": "When to sleep",
        "questionList": []
      },
      {
        "id": 4,
        "name": "Math2",
        "description": "When to sleep",
        "questionList": []
      }
    ],
    buttonValue: true,
    alertModal:false
  }

  GetMajors = async () => {
    let promise;
    try {
      promise = await MajorService.getAllMajors();
      let response = promise.data;
      if (response.success) {
        this.setState({
          majors: response.data,
          finishLoad: true
        });
        console.log(this.state.majors);
      } else {
        this.setState({errorLoad:true})
      }
    } catch (e) {
      this.setState({errorLoad:true})
    }
  }

  toggleAlertModal = () => {
    this.setState({alertModal: !this.state.alertModal})
  }

  async componentDidMount() {
    await this.GetMajors();
  }

  componentDidCatch() {
    this.toggleAlertModal();
  }

  changeDescription = (i) => {
    let major = this.state.majors[i]
    const dataEntries = Object.entries(major)
    for (const [dataArray, dataFromEntity] of dataEntries) {
      if (dataArray === "name" ){
        this.setState((prevState) => ({
          showMajor: {
            ...prevState.showMajor,
            name: dataFromEntity
          }
        })
        )
      }
      else if (dataArray === "description") {
        this.setState((prevState) => ({
          showMajor: {
            ...prevState.showMajor,
            description: dataFromEntity
          }
        })
        )
      }
    }
    this.setState((prevState) => ({
      descriptionNum: major.description,
      selectedMajor: major,
      buttonValue: false
    })
    )
  }

  render() {
    if(!this.state.finishLoad || this.state.errorLoad){
      return <Waiting error={this.state.errorLoad} />
    }
    else{
      return (
        <ContainerDiv className="container-fluid">
          <div className="row justify-content-center">
            {
              this.state.majors.map((data, key) => (
                <ImageRadio
                  className="col-2 mr-5"
                  key={key}
                  imgPath={this.state.selectedMajor === data ? this.state.pictures.selected : this.state.pictures.default}
                  value={data.id}
                  onClick={() => this.changeDescription(key)}
                />
              )
              )
            }
            <Title className="d-flex col-12 justify-content-center mt-4" visible={this.state.selectedMajor.name ? "visible" : "hidden"}>
                <Header>ชื่อสาขาที่เลือก</Header>
            </Title>
            <MajorName className={`d-flex col-12 justify-content-center`} visible={this.state.selectedMajor.description ? "visible" : "hidden"}>
                {this.state.selectedMajor.name}
            </MajorName>
          </div>
          <div className="row">
            <div className="col-2" />
            <ButtonRoute
              className="col-8 d-inline-flex justify-content-between"
              linkNext={`/questions?major=${this.state.selectedMajor.id}`} 
              linkBack="/menu"
              buttonRight="ยืนยัน"
              buttonRightDisabled={this.state.selectedMajor.name === null}
              />
            <div className="col-2" />
          </div>
          <CustomModal header="เกิดข้อผิดพลาดขึ้น" paragraph="โปรดติดต่อเจ้าหน้าที่" secondaryButtonText="ปิด" modal={this.state.alertModal} toggle={this.toggleAlertModal} />
        </ContainerDiv>
      )
    } 
  }
}
