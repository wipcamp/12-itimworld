import React, { Component } from 'react'
import styled from 'styled-components'
import MajorService from './../../services/MajorService'

import ImageRadio from './ImageRadio'
import ButtonRoute from '../Core/ButtonRoute'
import Waiting from '../Core/Waiting'
import CustomModal from './../Core/CustomModal'

const Header = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;
  text-align: center;
  color: white;
`

const Title = styled.p`
  visibility:${props => props.visible};
`

const MajorName = styled(Title)`
  height:15vh;
`

const trackPictures = {
  programmer: '/img/Track/programmer.png',
  website: '/img/Track/website.png',
  uxui: '/img/Track/uxui.png',
  network: '/img/Track/network.png'
}

export default class Index extends Component {

  state = {
    finishLoad:false,
    errorLoad:false,
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
        ],
        "pictures": {
          "default": '',
          "selected": ''
        }
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
        const majorsData = response.data.map(major => {
          if(major.name.toLowerCase() === "programmer"){
            return {...major,picture:trackPictures.programmer}
          }else if(major.name.toLowerCase() === "website"){
            return {...major,picture:trackPictures.website}
          }else if(major.name.toLowerCase() === "ux&ui"){
            return {...major,picture:trackPictures.uxui}
          }else{
            return {...major,picture:trackPictures.network}
          }
        })
        this.setState({
          majors: majorsData,
          finishLoad: true
        })
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
        <div className="container justify-content-center mt-5">
          <div className="row text-center">
            {
              this.state.majors.map((data, key) => (
                <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                  <ImageRadio
                    className="justify-content-center"
                    key={key}
                    imgPath={data.picture}
                    value={data.id}
                    alt={data.name}
                    isSelected={this.state.selectedMajor.name === null?true:(this.state.selectedMajor.name === data.name?true:false)}
                    onClick={() => this.changeDescription(key)}
                  />
                </div>
                ) 
              )
            }
            <Title className="d-flex col-12 justify-content-center mt-4">
                <Header>{this.state.selectedMajor.name == null ? 'โปรดเลือกสาขาที่ต้องการสมัคร' : this.state.selectedMajor.name}</Header>
            </Title>
            <MajorName className={`d-flex col-12 justify-content-center`} visible={this.state.selectedMajor.name ? "visible" : "hidden"}>
                <div className="text-white">{this.state.selectedMajor.description}</div>
            </MajorName>
          </div>
          <div className="row">
            <div className="col-2" />
            <ButtonRoute
              className="col-8 d-inline-flex justify-content-between mb-3"
              linkNext={`/questions?major=${this.state.selectedMajor.id}`} 
              linkBack="/menu"
              buttonRight="ยืนยัน"
              buttonRightDisabled={this.state.selectedMajor.name === null}
              />
            <div className="col-2" />
          </div>
          <CustomModal header="เกิดข้อผิดพลาดขึ้น" paragraph="โปรดติดต่อเจ้าหน้าที่" secondaryButtonText="ปิด" modal={this.state.alertModal} toggle={this.toggleAlertModal} />
        </div>
      )
    } 
  }
}
