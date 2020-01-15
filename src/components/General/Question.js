import React, { Component } from 'react'
import styled from 'styled-components'

const QuestionName = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
`

const TextArea = styled.textarea`

    width: 935px;
    height: 257px;

    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    box-sizing: border-box;
    border-radius: 4px;
`
export default class Question extends Component {
    state = {
        oldValue: ''
    }

    componentDidUpdate(prevProps){
        if(this.props.oldValue !== prevProps.oldValue){
            this.setState({
                oldValue: this.props.oldValue
            })
        }
    }

    handleChange = (e) => {
        this.props.handleAnswer(e);
        this.setState({
            oldValue: e.target.value
        })
    }


    render() {
        return (
            <div className="form-group">
            <QuestionName className="col-12 justify-content-center">คำถามที่ {this.props.questionCount} : {this.props.questionName}</QuestionName>
                <TextArea 
                className="col-12"
                name={this.props.questionId} 
                onChange={(e) => this.handleChange(e)}
                onBlur={this.props.blur}
                value={this.state.oldValue}
                >
                </TextArea>
            </div>
        )
    }
}