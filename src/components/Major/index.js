import React, { Component } from 'react'
import styled from 'styled-components'
import MajorService from './../../services/MajorService'

import ImageRadio from './ImageRadio'
import ButtonRoute from '../Core/ButtonRoute'
import ConfirmModal from './ConfirmModal'

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

export default class Index extends Component {

  state = {
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
    buttonValue: true
  }

  GetMajors = async () => {
    let promise;
    try {
      promise = await MajorService.getAllMajors();
      let response = promise.data;
      if (response.success) {
        this.setState({
          majors: response.data
        });
        console.log(this.state.majors);
      } else {
        console.log("Error getting all majors data")
      }
    } catch (e) {
      console.log("Error getting all majors data")
    }
  }

  async componentDidMount() {
    await this.GetMajors();
  }

  changeDescription = (i) => {
    console.log(i)
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
    console.log(major);
    this.setState((prevState) => ({
      descriptionNum: major.description,
      selectedMajor: major,
      buttonValue: false
    })
    )
  }

  render() {
    return (
      <React.Fragment>
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
          <Title className="d-flex col-12 justify-content-center" visible={this.state.selectedMajor.description ? "visible" : "hidden"}>
              <Header>ชื่อสาขาที่เลือก</Header>
          </Title>
          <Title className={`d-flex col-12 justify-content-center ${this.state.selectedMajor.description ? "mb-4" : "mb-5"} `} visible={this.state.selectedMajor.description ? "visible" : "hidden"}>
              {this.state.selectedMajor.description}
          </Title>
        </div>
        <div className="d-inline justify-content-between">
          <ButtonRoute
            className="col-6 d-inline-flex"
            linkBack="/menu"
            displayButtonRight="none"
            />
          <ConfirmModal 
            majorId={this.state.selectedMajor.id} 
            selectedMajor={this.state.selectedMajor} 
            showMajor={this.state.showMajor}
            disabled={this.state.buttonValue}
          />
        </div>
      </React.Fragment>
    )
  }
}
