import React, { Component } from 'react'
import MajorService from './../../services/MajorService'

import ImageRadio from './ImageRadio'
import ButtonRoute from '../Core/ButtonRoute'

export default class Index extends Component {

  state = {
    majorData: [
      {
        imgPath: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
        id: 1
      },
      {
        imgPath: 'https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg',
        id: 2
      },
      {
        imgPath: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
        id: 3
      },
      {
        imgPath: 'https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg',
        id: 4
      }
    ],
    description: [
      'Commodo voluptate in adipisicing commodo irure ex incididunt.',
      'Commodo cupidatat quis enim minim excepteur eiusmod ipsum est.',
      'Anim reprehenderit occaecat cupidatat pariatur fugiat eiusmod cupidatat fugiat in ut.',
      'Esse adipisicing amet irure dolor ullamco nisi eu magna cupidatat.'
    ],
    descriptionNum: 0,
    selectedMajor:{
      id: null,
      description: null,
      name: null
    },
    majors:[
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
      }
    ]
  }

  GetMajors = async () => {
    let promise = await MajorService.getAllMajors();
    let response = promise.data;
    if(response.code === 200){
      this.setState({majors:response.data});
      console.log(this.state.majors);
    }else{
      console.log("Error getting all majors data")
    }
  }

  async componentDidMount(){
    await this.GetMajors();
  }

  changeDescription = (i) => {
    console.log(i)
    this.setState((prevState) => ({
      descriptionNum: i,
      selectedMajor: {
        ...prevState.selectedMajor,
        id: i+1
      }
    })
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-center">
            {
              this.state.majorData.map((data, key) => (
                <ImageRadio 
                  className="col-3" 
                  key={key} 
                  imgPath={data.imgPath} 
                  value={data.id}
                  onClick={() => this.changeDescription(key)} 
                  />
              )
              )
            }
          <p className="d-flex col-12 justify-content-center">
            {this.state.description[this.state.descriptionNum]}
          </p>
        </div>
        <ButtonRoute 
          linkBack ="/profile"
          linkNext ={`/questions?majors=${this.state.selectedMajor.id}`}
          />
      </React.Fragment>
    )
  }
}
