import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import QuestionService from './../../services/QuestionService'

let answer = [];
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


    questions = [];

    state = { majorId : 1,
        questions : [
        {id:1,name:'Mock1',ans:''},
        {id:2,name:'Mock2',ans:''},
        {id:3,name:'Mock3',ans:''},
    ]};

    getQuestionService = async () => {
        let response = await QuestionService.getQuestion(this.state.majorId);
        console.log(response);
        this.setState({questions:response.data});
    }

    async componentDidMount() {
        await this.getQuestionService();
        console.log(this.questions);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                        {this.state.questions.map((data,i) => {
                            console.log(i)
                            return <Question questionCount={i+1}  questionName={data.name}  questionId={data.id} handleAnswer={this.handleAnswer}/>
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
