import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import MajorService from './../../services/MajorService'
import AnswerService from './../../services/AnswerService'
import UserService from './../../services/UserService'
import Styled from 'styled-components'

let answer = [];
let majorId = 1;
let userId = 120001;

const Header = Styled.h2`
font-family: Sarabun;
font-style: normal;
font-weight: bold;
font-size: 36px;
line-height: 47px;
text-align: center;
`


export default class Index extends Component {
  
  handleAnswer=(event)=> {
    const val = event.target.value;
    let doneEdit = false;
    
    for(var i = 0;i<answer.length;i++){
      if(answer[i].question_id === event.target.name){
        answer[i].answer_content = val;
        doneEdit = true;
      }
      
    }
    if(!doneEdit){
      answer.push({
        "question_id":event.target.name,
        "answer_content":val
      })
    }
  };
  

  questions = [];
  
    state = {
      finishLoad:false,
      errorLoad:false, 
        questions : 
          [
            { 
              id:1,
              name:'Mock1'
            },
            {
              id:2,
              name:'Mock2'
            },
            {
              id:3,
              name:'Mock3'
            },
          ]
        }

    async componentDidMount() {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      majorId = params.get('major');
      
      await this.getQuestionService(majorId);
    }

      getQuestionService = async (majorId) => {
        let promise;
        try {
          promise = await MajorService.getMajorFromMajorId(majorId);
          let response = promise.data;
          console.log(response.data[0].questionList);
          
          if (response.success) {
            this.setState({
              questions: response.data[0].questionList,
              finishLoad: true
            });
          } else {
            this.setState({errorLoad:true})
          }
        } catch (e) {
          this.setState({errorLoad:true})
        }
      }
    
    postAnswerService = async() =>{
      let response = await AnswerService.postAnswer(userId,majorId,{"answers":answer}).then(() => {UserService.postStatus(userId,{"status":"major"})});
        console.log(response);
    }
    
    render() {
      if(!this.state.finishLoad || this.state.errorLoad){
        if(this.state.errorLoad){
          return <p>Error Load</p>
        }
        return <p>Loading...</p>
      }else{
        return (
          <div className="container bg-white"><br/>
            <Header classname="col-12 mb-5 mt-5 ">คำถามสาขา</Header>
              <div>
                      {this.state.questions.map((data,i) => {
                        return <Question
                        questionCount={i+1}
                        questionName={data.name}
                        questionId={data.id}
                        handleAnswer={this.handleAnswer}
                        />
                      })}
              </div>
              <ButtonRoute 
                buttonLeft="กลับ" 
                buttonRight="ยืนยัน" 
                linkBack ="/major"
                linkNext ="/menu"
                onClick={this.postAnswerService}
              />
          </div>
        )
      }
    }
}
