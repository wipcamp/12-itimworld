import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import MajorService from './../../services/MajorService'
import AnswerService from './../../services/AnswerService'

let answer = [];
let majorId = 1;
let userId = 1;

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
              questions: response.data[0].questionList
            });
            console.log("question State = ");
            
            console.log(this.state.questions);
          } else {
            console.log("Error get Major")
          }
        } catch (e) {
          console.log("Error get Major")
        }
      }
    
    postAnswerService = async() =>{
      let response = await AnswerService.postAnswer(
        userId,
        majorId,
        {
          "answers":answer
        });
        console.log(response);
    }
    
    render() {
      console.log(this.state.majorId);
      return (
            <React.Fragment>
                <div>
                        {this.state.questions.map((data,i) => {
                            return <Question questionCount={i+1}  questionName={data.name}  questionId={data.id} handleAnswer={this.handleAnswer}/>
                        })}
                </div>
                <button onClick={this.postAnswerService}>Submit</button>
                <ButtonRoute 
                  buttonLeft="กลับ" 
                  buttonRight="ยืนยัน" 
                  linkBack ="/major"
                  linkNext ="/preview"
                  onClick={this.postAnswerService}
                />
            </React.Fragment>
        )
    }
}
