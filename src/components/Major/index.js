import React, { Component } from 'react'
import MajorService from './../../services/MajorService'

import ImageRadio from './ImageRadio'
import ButtonRoute from '../Core/ButtonRoute'

export default class Index extends Component {

  state = {
    pictures: {
      default:'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
      selected:'https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg'
    },
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
    let promise;
    try{
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
    }catch(e){
      console.log("Error getting all majors data")
    }
  }

  async componentDidMount(){
    await this.GetMajors();
  }

  changeDescription = (i) => {
    console.log(i)
    let major = this.state.majors[i]
    console.log(major);
    this.setState((prevState) => ({
      descriptionNum: major.description,
      selectedMajor: major
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
                  className="col-3" 
                  key={key} 
                  imgPath={this.state.selectedMajor===data?this.state.pictures.selected:this.state.pictures.default} 
                  value={data.id}
                  onClick={() => this.changeDescription(key)} 
                  />
              )
              )
            }
          <p className="d-flex col-12 justify-content-center">
            {this.state.selectedMajor.description}
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
