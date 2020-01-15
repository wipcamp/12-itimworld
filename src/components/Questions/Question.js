import React, { Component } from 'react'
import styled from 'styled-components'

const QuestionName = styled.p`
font-family: Sarabun Medium;
font-style: normal;
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
		
    render() {
        return (
            <div className="form-group">
                <QuestionName className="col-12 justify-content-center">คำถามที่ {this.props.questionCount} : {this.props.questionName}</QuestionName>
                    <TextArea
                    className="col-12"
                    name={this.props.questionId}
                    onChange={this.props.handleAnswer}
                    />
            </div>

        )
    }
}