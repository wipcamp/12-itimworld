import React, { Component } from 'react'
import styled from 'styled-components'

const Pink = styled.p`
    color: pink;
`

export default class Question extends Component {
    state = {answer:''}

    handleAnswer = (event) => {
        const nam = event.target.name;
        const val = event.target.value;
        this.setState({[nam]:val});
        console.log(this.state);       
		}
		
    render() {
        return (
            <div>
            <Pink>Question {this.props.questionId}</Pink>
            <textarea name='answer' onChange={this.handleAnswer} row="100" cols="100"> </textarea>
            </div>	
        )
    }
}
