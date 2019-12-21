import React, { Component } from 'react'
import styled from 'styled-components'

const Pink = styled.p`
    color: pink;
`

const answer = [];

export default class Question extends Component {

    handleAnswer = event => {
      const val = event.target.value;
      // this.setState({
      //   question_id: this.props.questionId,
      //   [nam]: val
      // });
      //console.log(this.state);
      let doneEdit = false;
      
      for(var i = 0;i<answer.length;i++){
        if(answer[i].question_id === this.props.questionId){
          answer[i].answer_content = val;
          doneEdit = true;
        }
      }
      if(!doneEdit){
        answer.push({
          "question_id":this.props.questionId,
          "answer_content":val
        })
      }
      console.log(answer);
    };
		
    render() {
        return (
            <div>
            <Pink>Question {this.props.questionId}</Pink>
            <textarea onChange={this.handleAnswer} row="100" cols="100"></textarea>
            </div>	
        )
    }
}