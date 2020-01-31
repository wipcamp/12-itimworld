import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import UserService from './../../services/UserService'
import Styled from 'styled-components'

const Header = Styled.h2`
  font-size: 36px;
  line-height: 47px;
  text-align: center;
`

let answer = {
  firstAnswer: "",
  secondAnswer: "",
  thirdAnswer: "",
  forthAnswer: ""
};

let userId = 120001;

export default class Index extends Component {
  
  handleAnswer=(event)=> {
    const val = event.target.value;
    const id = event.target.name;
    if(id == 1){
      answer.firstAnswer = val;
    }else if(id == 2){
      answer.secondAnswer = val;
    }else if(id == 3){
      answer.thirdAnswer = val;
    }else{
      answer.forthAnswer = val;
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

        },
        {
          id: 3,
          name: 'This is general question 3',
          oldValue: ''

        },
        {
          id: 4,
          name: 'This is general question 4',
          oldValue: ''

        }
      ]
    }

    getGeneralAnswerService = async() =>{
      let promise;
      try{
        promise = await UserService.getUser(userId);
        let response = promise.data;
        if(response.success){
          let gettedUserGeneralAnswer = this.state.questions;
          gettedUserGeneralAnswer[0].oldValue = response.data[0].generalAnswer.firstAnswer
          gettedUserGeneralAnswer[1].oldValue = response.data[0].generalAnswer.secondAnswer
          gettedUserGeneralAnswer[2].oldValue = response.data[0].generalAnswer.thirdAnswer
          gettedUserGeneralAnswer[3].oldValue = response.data[0].generalAnswer.forthAnswer

          this.setState({ questions : gettedUserGeneralAnswer});
          answer.firstAnswer = response.data[0].generalAnswer.firstAnswer===null?"":response.data[0].generalAnswer.firstAnswer;
          answer.secondAnswer = response.data[0].generalAnswer.secondAnswer===null?"":response.data[0].generalAnswer.secondAnswer;
          answer.thirdAnswer = response.data[0].generalAnswer.thirdAnswer===null?"":response.data[0].generalAnswer.thirdAnswer;
          answer.forthAnswer = response.data[0].generalAnswer.forthAnswer===null?"":response.data[0].generalAnswer.forthAnswer;
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
        promise = await UserService.postGeneralAnswer(userId,answer).then(() => {UserService.postStatus(userId,{"status":"general"})});

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
                            oldValue={this.state.questions[i].oldValue}
                            />
                        })}
                </div>
                <ButtonRoute 
                  buttonLeft="กลับ" 
                  buttonRight="ยืนยัน" 
                  linkBack ="/menu"
                  linkNext ="/menu"
                  onClick={this.postGeneralAnswerService}
                />
            </div>
        )
    }
}
