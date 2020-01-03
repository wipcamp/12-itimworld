import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import QuestionService from './../../services/QuestionService'
import AnswerService from './../../services/AnswerService'

let answer = [];

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
        majorId : 1,
        questions : 
          [
            { 
              id:1,
              name:'Mock1',
              ans:''
            },
            {
              id:2,
              name:'Mock2',
              ans:''
            },
            {
              id:3,
              name:'Mock3',
              ans:''
            },
          ]
        }

      getQuestionService = async () => {
        let response = await QuestionService.getQuestion(this.state.majorId);
        console.log(response.data);
        

        if(response.data.code !== 200){
          console.log("Error get Question")
        }else{
          this.setState({questions:response.data.data});
        }
      }
      
    async componentDidMount() {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let majorId = params.get('major');

      this.setState({
        majorId: majorId
      })
      await this.getQuestionService();
    }
    
    postAnswerService = async() =>{
      let response = await AnswerService.postAnswer(1,1,
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
                          // console.log(i)
                            return <Question questionCount={i+1}  questionName={data.name}  questionId={data.id} handleAnswer={this.handleAnswer}/>
                        })}
                </div>
                {/* <button onClick={this.postAnswerService}>Submit</button> */}
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
