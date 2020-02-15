import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
const Question = (props) => {
  return (
    <div className="form-group">
      <QuestionName className="col-12 justify-content-center">คำถามที่ {props.questionCount} : {props.questionName}</QuestionName>
      <TextArea 
        className="col-12"
        name={props.questionId} 
        onChange={(e) => props.handleAnswer(e)}
        required={props.required}
        >
      </TextArea>
    </div>
  )
}

Question.propType = {
    questionId: PropTypes.any,
    questionName: PropTypes.string,
    questionCount: PropTypes.number,
    handleAnswer: PropTypes.func,
    required: PropTypes.bool
}

export default Question;