import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'

const arr = [
	{questionId:1,question_content:''},
	{questionId:2,question_content:''},
	{questionId:3,question_content:''}
];

const answer = [];
export default class Index extends Component {

  handleAnswer=(event)=> {
    const val = event.target.value;
    let doneEdit = false;
    
    for(var i = 0;i<answer.length;i++){
      if(answer[i].question_id == event.target.name){
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

    console.log(answer);
  };

    render(){
        return (
            <React.Fragment>
                <div>
                        {arr.map((data,i) => {
                            return <Question questionCount={i+1}  questionId={data.questionId} handleAnswer={this.handleAnswer}/>
                        })}
                </div>
                <ButtonRoute 
                  buttonLeft="กลับ" 
                  buttonRight="ยืนยัน" 
                  linkBack ="/major"
                  linkNext ="/"
                />
            </React.Fragment>
        )
    }
}
