import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import UserServuce from './../../services/UserService'
import StyledComponent from 'styled-components'

const Header = StyledComponent.h2`
  font-size: 36px;
  line-height: 47px;
  text-align: center;
`

let answer = {
  firstAnswer: "",
  secondAnswer: ""
};

let userId = 120001;

export default class Index extends Component {
  
  handleAnswer=(event)=> {
    const val = event.target.value;
    const id = event.target.name;
    if(id == 1){
      answer.firstAnswer = val;
    }else{
      answer.secondAnswer = val;
    }
    console.log(answer);
    
  };
  

  questions = [];
  
    state = {
        questions: [{
                id: 1,
                name: 'This is general question 1',
                oldValue: ''
            },
            {
                id: 2,
                name: 'This is general question 2',
                oldValue: ''

            }
        ]
    }

    getGeneralAnswerService = async() =>{
      let promise;
      try{
        promise = await UserServuce.getUser(userId);
        let response = promise.data;
        if(response.success){
          let gettedUserGeneralAnswer = this.state.questions;
          gettedUserGeneralAnswer[0].oldValue = response.data[0].generalAnswer.firstAnswer
          gettedUserGeneralAnswer[1].oldValue = response.data[0].generalAnswer.secondAnswer

          this.setState({ questions : gettedUserGeneralAnswer});
          answer.firstAnswer = response.data[0].generalAnswer.firstAnswer===null?"":response.data[0].generalAnswer.firstAnswer;
          answer.secondAnswer = response.data[0].generalAnswer.secondAnswer===null?"":response.data[0].generalAnswer.secondAnswer;
          console.log("GET general answer success")
        }else{
          console.log("success fail GET general answer")
        }
      }catch(e){
        console.log("Error GET general answer")
      }
    }
    
    postGeneralAnswerService = async() =>{
      let promise;
      try{
        promise = await UserServuce.postGeneralAnswer(userId,answer);
        let response = promise.data;
        if(response.success){
          console.log("Post general answer success")
        }else{
          console.log("success fail Post general answer")
        }
      }catch(e){
        console.log("Error post general answer")
      }
    }
    
    async componentDidMount(){
      await this.getGeneralAnswerService(); 
    }

    render() {
      console.log(this.state.majorId);
      return (
            <div className="container">
                <Header className="col-12 mb-5 mt-5">This is General Question page</Header>
                <div>
                        {this.state.questions.map((data,i) => {
                            return <Question 
                            questionCount={i+1}  
                            questionName={data.name} 
                            questionId={data.id} 
                            handleAnswer={this.handleAnswer} 
                            blur={this.postGeneralAnswerService}
                            oldValue={this.state.questions[i].oldValue}
                            />
                        })}
                </div>
                <ButtonRoute 
                  buttonLeft="กลับ" 
                  buttonRight="ยืนยัน" 
                  linkBack ="/profile"
                  linkNext ="/major"
                  onClick={this.postAnswerService}
                />
            </div>
        )
    }
}
